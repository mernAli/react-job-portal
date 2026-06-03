import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import {
  fetchCandidateScoreCards,
  fetchHiringInsights,
} from "../../services/aiService";
import LockedFeature from "../../components/LockedFeature";

// ─── Mini score ring ──────────────────────────────────────
const MiniRing = ({ score, size = 56, strokeWidth = 5 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75 ? "#22C55E" :
    score >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      <circle
        cx={size/2} cy={size/2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
};

// ─── Dimension mini bar ───────────────────────────────────
const MiniBar = ({ label, score, theme }) => {
  const color =
    score >= 75 ? "bg-green-500" :
    score >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className={`text-xs ${theme.textMuted} w-24 flex-shrink-0`}>{label}</span>
      <div className={`flex-1 h-1.5 ${theme.bg} rounded-full overflow-hidden`}>
        <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-medium ${theme.textPrimary} w-6 text-right`}>{score}</span>
    </div>
  );
};

// ─── Insight card ─────────────────────────────────────────
const InsightCard = ({ insight, theme }) => {
  const borderColor = {
    recommendation: "border-green-500",
    warning:        "border-red-500",
    insight:        "border-blue-500",
  }[insight.type] || "border-blue-500";

  const priorityStyle =
    insight.priority === "High"
      ? `${theme.dangerBg} ${theme.dangerText}`
      : `${theme.warningBg} ${theme.warningText}`;

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border border-l-4 ${borderColor} p-4`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{insight.icon}</span>
          <h4 className={`font-semibold text-sm ${theme.textPrimary}`}>{insight.title}</h4>
        </div>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${priorityStyle}`}>
          {insight.priority}
        </span>
      </div>
      <p className={`text-sm ${theme.textSecondary} mb-3`}>{insight.detail}</p>
      <div className={`${theme.bg} rounded-lg p-3`}>
        <p className={`text-xs font-medium ${theme.textMuted} mb-1`}>💡 Suggested Action</p>
        <p className={`text-sm ${theme.textPrimary}`}>{insight.action}</p>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────
const EmployerAIInsights = () => {
  const { theme } = useTheme();

  const [candidates, setCandidates] = useState([]);
  const [insights, setInsights]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [sortBy, setSortBy]         = useState("score");

  const loadAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [cards, ins] = await Promise.all([
        fetchCandidateScoreCards(),
        fetchHiringInsights(),
      ]);
      setCandidates(cards);
      setInsights(ins);
    } catch (err) {
      setError(err.message || "Failed to load AI insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader size="lg" /></div>;
  if (error)   return <ApiError message={error} onRetry={loadAll} />;

  // Sort candidates
  const sorted = [...candidates].sort((a, b) =>
    sortBy === "score" ? b.overallScore - a.overallScore
    : a.candidateName.localeCompare(b.candidateName)
  );

  // Verdict styles
  const verdictStyle = {
    success: { bg: theme.successBg, text: theme.successText },
    info:    { bg: theme.infoBg,    text: theme.infoText },
    warning: { bg: theme.warningBg, text: theme.warningText },
    danger:  { bg: theme.dangerBg,  text: theme.dangerText },
  };

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <Sidebar />

      <LockedFeature
        featureKey="AI_INSIGHTS"
        mode="hidden"
        pricingPath="/app/employer-pricing"
      >

      {/* Page Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>
          🤖 AI Hiring Insights
        </h1>
        <p className={`${theme.textSecondary} mt-1 text-sm`}>
          AI-generated candidate scores and hiring recommendations for your open roles
        </p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Candidates", value: candidates.length, color: theme.infoText },
          { label: "Strongly Recommended", value: candidates.filter(c => c.aiVerdict === "Strongly Recommended").length, color: theme.successText },
          { label: "Avg AI Score", value: Math.round(candidates.reduce((s, c) => s + c.overallScore, 0) / candidates.length), color: theme.primaryText },
          { label: "Needs Review", value: candidates.filter(c => c.aiVerdict === "Needs Review").length, color: theme.warningText },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${theme.cardBg} ${theme.border} border rounded-xl p-4 text-center`}>
            <p className={`text-xs ${theme.textMuted}`}>{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Hiring Insights ─────────────────────────────── */}
      <div>
        <h2 className={`text-base font-semibold ${theme.textPrimary} mb-3`}>AI Hiring Recommendations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insights.map((i) => (
            <InsightCard key={i.id} insight={i} theme={theme} />
          ))}
        </div>
      </div>

      {/* ── Candidate Score Cards ────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-base font-semibold ${theme.textPrimary}`}>
            Candidate Score Cards
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-1.5 text-xs ${theme.bg} ${theme.border} border rounded-lg ${theme.textPrimary} outline-none`}
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <div className="space-y-4">
          {sorted.map((candidate, index) => {
            const vs = verdictStyle[candidate.verdictColor] || verdictStyle.info;
            const scoreColor =
              candidate.overallScore >= 75 ? theme.successText :
              candidate.overallScore >= 50 ? theme.warningText : theme.dangerText;

            return (
              <div
                key={candidate.id}
                className={`${theme.cardBg} rounded-xl ${theme.border} border p-4 sm:p-5`}
              >
                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Left — rank + ring + meta */}
                  <div className="flex items-start gap-4 flex-shrink-0">
                    {/* Rank badge */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1 ${
                      index === 0 ? "bg-yellow-400 text-yellow-900" :
                      index === 1 ? "bg-gray-300 text-gray-700" :
                      index === 2 ? "bg-amber-600 text-white" :
                      `${theme.bg} ${theme.textMuted}`
                    }`}>
                      {index + 1}
                    </div>

                    {/* Score ring */}
                    <div className="relative">
                      <MiniRing score={candidate.overallScore} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-bold ${scoreColor}`}>
                          {candidate.overallScore}
                        </span>
                      </div>
                    </div>

                    {/* Name + position */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-semibold text-sm ${theme.textPrimary}`}>
                          {candidate.candidateName}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${vs.bg} ${vs.text}`}>
                          {candidate.aiVerdict}
                        </span>
                      </div>
                      <p className={`text-xs ${theme.textMuted} mt-0.5`}>{candidate.position}</p>
                      <p className={`text-xs ${theme.textMuted} mt-0.5`}>
                        {candidate.interviewsCompleted} interview{candidate.interviewsCompleted !== 1 ? "s" : ""} completed
                        · Status: {candidate.status}
                      </p>
                      {/* Confidence */}
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                        candidate.confidence === "High"
                          ? `${theme.successBg} ${theme.successText}`
                          : `${theme.warningBg} ${theme.warningText}`
                      }`}>
                        {candidate.confidence} Confidence
                      </span>
                    </div>
                  </div>

                  {/* Right — dimension bars + remark */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      {candidate.dimensions.map((d) => (
                        <MiniBar key={d.label} label={d.label} score={d.score} theme={theme} />
                      ))}
                    </div>
                    <div className={`${theme.bg} rounded-lg p-3`}>
                      <p className={`text-xs font-medium ${theme.textMuted} mb-1`}>🤖 AI Remark</p>
                      <p className={`text-sm ${theme.textSecondary}`}>{candidate.aiRemark}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </LockedFeature>
    </div>
  );
};

export default EmployerAIInsights;
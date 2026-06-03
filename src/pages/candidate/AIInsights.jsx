import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import {
  fetchCandidateAIScore,
  fetchInterviewProgress,
  fetchCandidateAIRemarks,
} from "../../services/aiService";
import LockedFeature from "../../components/LockedFeature";

// ─── Score Ring (SVG circle progress) ────────────────────
const ScoreRing = ({ score, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 75 ? "#22C55E" :
    score >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <svg width={size} height={size} className="-rotate-90">
      {/* Background track */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
};

// ─── Score bar for dimensions ─────────────────────────────
const ScoreBar = ({ label, score, theme }) => {
  const color =
    score >= 75 ? "bg-green-500" :
    score >= 50 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className={`text-sm ${theme.textSecondary}`}>{label}</span>
        <span className={`text-sm font-bold ${theme.textPrimary}`}>{score}</span>
      </div>
      <div className={`w-full h-2 ${theme.bg} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

// ─── Confidence badge ─────────────────────────────────────
const ConfidenceBadge = ({ level, theme }) => {
  const styles = {
    High:   `${theme.successBg} ${theme.successText}`,
    Medium: `${theme.warningBg} ${theme.warningText}`,
    Low:    `${theme.dangerBg} ${theme.dangerText}`,
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${styles[level] || styles.Medium}`}>
      {level} Confidence
    </span>
  );
};

// ─── Remark card ──────────────────────────────────────────
const RemarkCard = ({ remark, theme }) => {
  const borderColor =
    remark.type === "strength" ? "border-green-500" : "border-amber-500";
  const priorityStyle =
    remark.priority === "High"
      ? `${theme.dangerBg} ${theme.dangerText}`
      : `${theme.warningBg} ${theme.warningText}`;

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border border-l-4 ${borderColor} p-4`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{remark.icon}</span>
          <h4 className={`font-semibold text-sm ${theme.textPrimary}`}>{remark.title}</h4>
        </div>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${priorityStyle}`}>
          {remark.priority}
        </span>
      </div>
      <p className={`text-sm ${theme.textSecondary} mb-3`}>{remark.detail}</p>
      <div className={`${theme.bg} rounded-lg p-3`}>
        <p className={`text-xs font-medium ${theme.textMuted} mb-1`}>💡 Suggested Action</p>
        <p className={`text-sm ${theme.textPrimary}`}>{remark.action}</p>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────
const CandidateAIInsights = () => {
  const { theme } = useTheme();

  const [scoreData, setScoreData]   = useState(null);
  const [progress, setProgress]     = useState([]);
  const [remarks, setRemarks]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  const loadAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [score, prog, rem] = await Promise.all([
        fetchCandidateAIScore(),
        fetchInterviewProgress(),
        fetchCandidateAIRemarks(),
      ]);
      setScoreData(score);
      setProgress(prog);
      setRemarks(rem);
    } catch (err) {
      setError(err.message || "Failed to load AI insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader size="lg" /></div>;
  if (error)   return <ApiError message={error} onRetry={loadAll} />;

  const scoreColor =
    scoreData.overallScore >= 75 ? theme.successText :
    scoreData.overallScore >= 50 ? theme.warningText : theme.dangerText;

  return (
    
    <div className="space-y-6 px-2 sm:px-0">
      <Sidebar />

      <LockedFeature
          featureKey="RECRUITER_REVIEW"
          mode="hidden"
          pricingPath="/app/employer-pricing"
      >
      {/* Page Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>
              🤖 AI Insights
            </h1>
            <p className={`${theme.textSecondary} mt-1 text-sm`}>
              Personalized analysis of your profile, interviews, and job fit
            </p>
          </div>
          <div className={`px-3 py-1 ${theme.infoBg} ${theme.infoText} rounded-full text-xs font-bold`}>
            Updated {scoreData.lastUpdated}
          </div>
        </div>
      </div>

      {/* ── Overall Score Card ─────────────────────────── */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-6`}>
        <h2 className={`text-base font-semibold ${theme.textPrimary} mb-4`}>Overall AI Score</h2>
        <div className="flex flex-col sm:flex-row items-center gap-8">

          {/* Ring */}
          <div className="relative flex-shrink-0">
            <ScoreRing score={scoreData.overallScore} size={140} strokeWidth={12} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${scoreColor}`}>{scoreData.overallScore}</span>
              <span className={`text-xs ${theme.textMuted}`}>/ 100</span>
            </div>
          </div>

          {/* Score meta */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-sm font-medium ${scoreData.trendDirection === "up" ? theme.successText : theme.dangerText}`}>
                {scoreData.trendDirection === "up" ? "↑" : "↓"} {scoreData.trend} this week
              </span>
              <ConfidenceBadge level={scoreData.confidence} theme={theme} />
            </div>
            {/* Dimension bars */}
            <div>
              {scoreData.dimensions.map((d) => (
                <ScoreBar key={d.label} label={d.label} score={d.score} theme={theme} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Interview Progress ──────────────────────────── */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
        <div className={`p-4 sm:p-5 ${theme.border} border-b`}>
          <h2 className={`text-base font-semibold ${theme.textPrimary}`}>Interview Progress</h2>
          <p className={`text-xs ${theme.textMuted} mt-1`}>AI analysis per interview round</p>
        </div>
        <div className="divide-y" style={{ borderColor: "inherit" }}>
          {progress.map((item) => (
            <div key={item.id} className={`p-4 sm:p-5 ${theme.hover}`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Score circle — small */}
                <div className="relative flex-shrink-0 w-14 h-14">
                  {item.aiScore !== null ? (
                    <>
                      <ScoreRing score={item.aiScore} size={56} strokeWidth={5} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-bold ${
                          item.aiScore >= 75 ? theme.successText :
                          item.aiScore >= 50 ? theme.warningText : theme.dangerText
                        }`}>{item.aiScore}</span>
                      </div>
                    </>
                  ) : (
                    <div className={`w-14 h-14 ${theme.bg} rounded-full flex items-center justify-center`}>
                      <span className={`text-xs ${theme.textMuted}`}>—</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className={`font-semibold text-sm ${theme.textPrimary}`}>{item.round}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      item.status === "Completed"
                        ? `${theme.successBg} ${theme.successText}`
                        : `${theme.infoBg} ${theme.infoText}`
                    }`}>{item.status}</span>
                    {item.confidence && <ConfidenceBadge level={item.confidence} theme={theme} />}
                  </div>
                  <p className={`text-xs ${theme.textMuted} mb-2`}>
                    {item.company} · {item.position} · {item.date}
                  </p>
                  <div className={`${theme.bg} rounded-lg p-3`}>
                    <p className={`text-xs font-medium ${theme.textMuted} mb-1`}>🤖 AI Remark</p>
                    <p className={`text-sm ${theme.textSecondary}`}>{item.aiRemark}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Remarks & Suggestions ────────────────────── */}
      <div>
        <h2 className={`text-base font-semibold ${theme.textPrimary} mb-3`}>
          AI Recommendations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {remarks.map((r) => (
            <RemarkCard key={r.id} remark={r} theme={theme} />
          ))}
        </div>
      </div>
      </LockedFeature>
    </div>
  );
};

export default CandidateAIInsights;
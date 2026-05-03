import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import StatCard from "../../components/Dashboard/StatCard";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import {
  fetchCandidateStats,
  fetchCandidateApplications,
  fetchRecommendedJobs,
} from "../../services/dashboardService.js";
import { fetchCandidateAIScore } from "../../services/aiService.js";
import Sidebar from "../../components/Dashboard/Sidebar.jsx";
import { SectionErrorBoundary } from "../../components/ErrorBoundary.jsx";
import { useNavigate } from "react-router-dom";
import LiveActivityFeed from "../../components/Dashboard/LiveActivityFeed";

// Mini score ring for dashboard preview
const MiniScoreRing = ({ score, size = 80, strokeWidth = 7 }) => {
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

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [stats, setStats]                           = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs]       = useState([]);
  const [aiScore, setAiScore]                       = useState(null);

  const [statsLoading, setStatsLoading]               = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [jobsLoading, setJobsLoading]                 = useState(true);
  const [aiLoading, setAiLoading]                     = useState(true);

  const [statsError, setStatsError]               = useState(null);
  const [applicationsError, setApplicationsError] = useState(null);

  useEffect(() => {
    loadStats();
    loadApplications();
    loadRecommendedJobs();
    loadAIScore();
  }, []);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const data = await fetchCandidateStats();
      setStats(data);
    } catch (error) {
      setStatsError(error.message || "Failed to load statistics");
    } finally {
      setStatsLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      setApplicationsLoading(true);
      setApplicationsError(null);
      const data = await fetchCandidateApplications();
      setRecentApplications(data);
    } catch (error) {
      setApplicationsError(error.message || "Failed to load applications");
    } finally {
      setApplicationsLoading(false);
    }
  };

  const loadRecommendedJobs = async () => {
    try {
      setJobsLoading(true);
      const data = await fetchRecommendedJobs();
      setRecommendedJobs(data);
    } catch (error) {
      console.error("Failed to load recommended jobs:", error);
    } finally {
      setJobsLoading(false);
    }
  };

  const loadAIScore = async () => {
    try {
      setAiLoading(true);
      const data = await fetchCandidateAIScore();
      setAiScore(data);
    } catch (error) {
      console.error("Failed to load AI score:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Sidebar />

      {/* Welcome Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Track your applications and discover new opportunities.
        </p>
      </div>

      {/* Stats */}
      <SectionErrorBoundary>
        {statsLoading ? (
          <div className="flex items-center justify-center h-32"><Loader size="md" /></div>
        ) : statsError ? (
          <ApiError message={statsError} onRetry={loadStats} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        )}
      </SectionErrorBoundary>

      {/* ── Mini AI Score Preview ─────────────────────── */}
      <SectionErrorBoundary>
        <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-5`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-base font-semibold ${theme.textPrimary}`}>🤖 Your AI Score</h2>
              <p className={`text-xs ${theme.textMuted} mt-1`}>AI-generated profile strength analysis</p>
            </div>
            <button
              onClick={() => navigate("/app/candidate-ai-insights")}
              className={`px-3 py-1.5 text-xs font-medium ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover}`}
            >
              Full Insights →
            </button>
          </div>

          {aiLoading ? (
            <div className="flex items-center justify-center h-24"><Loader size="md" /></div>
          ) : aiScore ? (
            <div className="flex items-center gap-6">
              {/* Ring */}
              <div className="relative flex-shrink-0">
                <MiniScoreRing score={aiScore.overallScore} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-lg font-bold ${
                    aiScore.overallScore >= 75 ? theme.successText :
                    aiScore.overallScore >= 50 ? theme.warningText : theme.dangerText
                  }`}>{aiScore.overallScore}</span>
                </div>
              </div>

              {/* Mini dimension bars */}
              <div className="flex-1">
                {aiScore.dimensions.slice(0, 3).map((d) => {
                  const color =
                    d.score >= 75 ? "bg-green-500" :
                    d.score >= 50 ? "bg-amber-500" : "bg-red-500";
                  return (
                    <div key={d.label} className="flex items-center gap-2 mb-2">
                      <span className={`text-xs ${theme.textMuted} w-32 flex-shrink-0`}>{d.label}</span>
                      <div className={`flex-1 h-1.5 ${theme.bg} rounded-full overflow-hidden`}>
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${d.score}%` }} />
                      </div>
                      <span className={`text-xs font-medium ${theme.textPrimary} w-6 text-right`}>{d.score}</span>
                    </div>
                  );
                })}
                <p className={`text-xs ${theme.textMuted} mt-2`}>
                  {aiScore.trendDirection === "up" ? "↑" : "↓"} {aiScore.trend} this week ·{" "}
                  <span className={theme.successText}>{aiScore.confidence} Confidence</span>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </SectionErrorBoundary>

      {/* Two Column Layout — Recent Applications + Recommended Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Applications */}
        <SectionErrorBoundary>
          <div className={`lg:col-span-2 ${theme.cardBg} rounded-xl ${theme.border} border`}>
            <div className={`p-6 ${theme.border} border-b`}>
              <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>Recent Applications</h2>
              <p className={`text-sm ${theme.textMuted} mt-1`}>Your latest job applications</p>
            </div>
            {applicationsLoading ? (
              <div className="flex items-center justify-center h-32"><Loader size="md" /></div>
            ) : applicationsError ? (
              <div className="p-6"><ApiError message={applicationsError} onRetry={loadApplications} /></div>
            ) : (
              <div className={`divide-y ${theme.border}`}>
                {recentApplications.map((application) => (
                  <div key={application.id} className={`p-6 ${theme.hover} transition-colors`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold ${theme.textPrimary}`}>{application.jobTitle}</h3>
                        <p className={`text-sm ${theme.textSecondary} mt-1`}>{application.company}</p>
                        <p className={`text-xs ${theme.textMuted} mt-2`}>Applied: {application.appliedDate}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        application.status === "Interview Scheduled"
                          ? `${theme.infoBg} ${theme.infoText}`
                          : application.status === "Rejected"
                          ? `${theme.dangerBg} ${theme.dangerText}`
                          : `${theme.warningBg} ${theme.warningText}`
                      }`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className={`p-4 ${theme.border} border-t`}>
              <button
                onClick={() => navigate("/app/my-applications")}
                className={`w-full py-2 text-sm ${theme.primaryText} font-medium ${theme.hover} rounded-lg transition-colors`}
              >
                View All Applications →
              </button>
            </div>
          </div>
        </SectionErrorBoundary>

        {/* Recommended Jobs */}
        <SectionErrorBoundary>
          <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
            <div className={`p-6 ${theme.border} border-b`}>
              <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>Recommended for You</h2>
              <p className={`text-sm ${theme.textMuted} mt-1`}>Based on your profile</p>
            </div>
            {jobsLoading ? (
              <div className="flex items-center justify-center h-32"><Loader size="md" /></div>
            ) : (
              <div className={`divide-y ${theme.border}`}>
                {recommendedJobs.map((job) => (
                  <div key={job.id} className={`p-4 ${theme.hover} transition-colors`}>
                    <h3 className={`font-semibold ${theme.textPrimary} text-sm`}>{job.title}</h3>
                    <p className={`text-xs ${theme.textSecondary} mt-1`}>{job.company}</p>
                    <div className={`flex items-center gap-2 mt-2 text-xs ${theme.textMuted}`}>
                      <span>📍 {job.location}</span>
                    </div>
                    <p className={`text-xs ${theme.successText} font-semibold mt-2`}>{job.salary}</p>
                    <button className={`w-full mt-3 py-2 text-xs ${theme.primary} text-white rounded-lg ${theme.primaryHover} transition-colors font-medium`}>
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionErrorBoundary>
      </div>

      {/* ── Live Feed + Profile Completion Row ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Live Activity Feed — 2/3 width */}
        <SectionErrorBoundary>
          <div className="lg:col-span-2">
            <LiveActivityFeed maxItems={6} />
          </div>
        </SectionErrorBoundary>

        {/* Profile Completion — 1/3 width */}
        <div className={`${theme.primary} rounded-xl p-6 text-white flex flex-col justify-between min-h-[200px]`}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
            <p className="text-white/80 text-sm">
              A complete profile increases your chances of getting hired by 40%
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3 mt-4">
              <div>
                <div className="text-3xl font-bold">75%</div>
                <div className="text-xs text-white/70">Complete</div>
              </div>
              <button
                onClick={() => navigate("/app/profile")}
                className={`bg-white ${theme.primaryText} px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap text-sm`}
              >
                Update Profile
              </button>
            </div>
            <div className="bg-white/30 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: "75%" }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CandidateDashboard;
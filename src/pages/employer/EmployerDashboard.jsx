import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";
import StatCard from "../../components/Dashboard/StatCard";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import {
  fetchEmployerStats,
  fetchRecentApplications,
  fetchEmployerActivity,
  fetchApplicationTrend,
} from "../../services/dashboardService.js";
import Sidebar from "../../components/Dashboard/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { SectionErrorBoundary } from "../../components/ErrorBoundary.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EmployerDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [activity, setActivity] = useState([]);
  const [trend, setTrend] = useState([]);

  const [statsLoading, setStatsLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [trendLoading, setTrendLoading] = useState(true);

  const [statsError, setStatsError] = useState(null);
  const [applicationsError, setApplicationsError] = useState(null);

  useEffect(() => {
    loadStats();
    loadApplications();
    loadActivity();
    loadTrend();
  }, []);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const data = await fetchEmployerStats();
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
      const data = await fetchRecentApplications();
      setRecentApplications(data);
    } catch (error) {
      setApplicationsError(error.message || "Failed to load applications");
    } finally {
      setApplicationsLoading(false);
    }
  };

  const loadActivity = async () => {
    try {
      setActivityLoading(true);
      const data = await fetchEmployerActivity();
      setActivity(data);
    } catch (error) {
      console.error("Failed to load activity:", error);
    } finally {
      setActivityLoading(false);
    }
  };

  const loadTrend = async () => {
    try {
      setTrendLoading(true);
      const data = await fetchApplicationTrend();
      setTrend(data);
    } catch (error) {
      console.error("Failed to load trend:", error);
    } finally {
      setTrendLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <Sidebar />

      {/* Welcome Header */}
      <div
        className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}
      >
        <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p
          className={`${theme.textSecondary} mt-1 sm:mt-2 text-sm sm:text-base`}
        >
          Here's what's happening with your job postings today.
        </p>
      </div>

      {/* Stats Grid */}
      <SectionErrorBoundary>
        {statsLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader size="md" />
          </div>
        ) : statsError ? (
          <ApiError message={statsError} onRetry={loadStats} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        )}
      </SectionErrorBoundary>

      {/* ── Mini Trend Chart ─────────────────────────────── */}
      <SectionErrorBoundary>
        <div
          className={`${theme.cardBg} rounded-xl ${theme.border} border p-4 sm:p-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className={`text-base sm:text-lg font-semibold ${theme.textPrimary}`}
              >
                Application Trend
              </h2>
              <p className={`text-xs ${theme.textMuted} mt-1`}>
                Last 8 weeks overview
              </p>
            </div>
            <button
              onClick={() => navigate("/app/employer-analytics")}
              className={`px-3 py-1.5 text-xs font-medium ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover}`}
            >
              Full Analytics →
            </button>
          </div>

          {trendLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader size="md" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={trend}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", fontSize: "11px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="shortlisted"
                  name="Shortlisted"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="hired"
                  name="Hired"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </SectionErrorBoundary>

      {/* Recent Applications */}
      <SectionErrorBoundary>
        <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
          <div className={`p-4 sm:p-6 ${theme.border} border-b`}>
            <h2
              className={`text-base sm:text-lg font-semibold ${theme.textPrimary}`}
            >
              Recent Applications
            </h2>
            <p className={`text-xs sm:text-sm ${theme.textMuted} mt-1`}>
              Latest candidates who applied for your jobs
            </p>
          </div>

          {applicationsLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader size="md" />
            </div>
          ) : applicationsError ? (
            <div className="p-4 sm:p-6">
              <ApiError
                message={applicationsError}
                onRetry={loadApplications}
              />
            </div>
          ) : (
            <>
              {/* Mobile Card List */}
              <div className="block md:hidden divide-y divide-gray-100">
                {recentApplications.map((application) => (
                  <div key={application.id} className={`p-4 ${theme.hover}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold text-sm flex-shrink-0`}
                        >
                          {application.candidateName.charAt(0)}
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium ${theme.textPrimary}`}
                          >
                            {application.candidateName}
                          </p>
                          <p className={`text-xs ${theme.textMuted}`}>
                            {application.position}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          application.status === "Shortlisted"
                            ? `${theme.successBg} ${theme.successText}`
                            : application.status === "Interview Scheduled"
                              ? `${theme.infoBg} ${theme.infoText}`
                              : `${theme.warningBg} ${theme.warningText}`
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${theme.textMuted}`}>
                        {application.appliedDate}
                      </p>
                      <button
                        className={`${theme.primaryText} hover:opacity-80 font-medium text-xs`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className={theme.bg}>
                    <tr>
                      {[
                        "Candidate",
                        "Position",
                        "Applied Date",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme.border}`}>
                    {recentApplications.map((application) => (
                      <tr key={application.id} className={theme.hover}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold`}
                            >
                              {application.candidateName.charAt(0)}
                            </div>
                            <span
                              className={`text-sm font-medium ${theme.textPrimary}`}
                            >
                              {application.candidateName}
                            </span>
                          </div>
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textPrimary}`}
                        >
                          {application.position}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted}`}
                        >
                          {application.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              application.status === "Shortlisted"
                                ? `${theme.successBg} ${theme.successText}`
                                : application.status === "Interview Scheduled"
                                  ? `${theme.infoBg} ${theme.infoText}`
                                  : `${theme.warningBg} ${theme.warningText}`
                            }`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className={`${theme.primaryText} hover:opacity-80 font-medium`}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </SectionErrorBoundary>

      {/* Activity Feed */}
      <SectionErrorBoundary>
        <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
          <div className={`p-4 sm:p-6 ${theme.border} border-b`}>
            <h2
              className={`text-base sm:text-lg font-semibold ${theme.textPrimary}`}
            >
              Recent Activity
            </h2>
            <p className={`text-xs sm:text-sm ${theme.textMuted} mt-1`}>
              Latest updates from your job postings
            </p>
          </div>
          {activityLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader size="md" />
            </div>
          ) : (
            <div className={`divide-y ${theme.border}`}>
              {activity.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 sm:p-4 flex items-start gap-3 sm:gap-4 ${theme.hover}`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 ${theme.infoBg} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-base sm:text-lg">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${theme.textPrimary} break-words`}>
                      {item.message}
                    </p>
                    <p className={`text-xs ${theme.textMuted} mt-1`}>
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionErrorBoundary>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className={`${theme.primary} rounded-xl p-4 sm:p-6 text-white`}>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            Post a New Job
          </h3>
          <p className="text-white/80 mb-3 sm:mb-4 text-xs sm:text-sm">
            Start hiring by creating a new job posting
          </p>
          <button
            className={`bg-white ${theme.primaryText} px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm`}
            onClick={() => navigate("/app/post-job")}
          >
            Create Job Post
          </button>
        </div>
        <div className={`${theme.info} rounded-xl p-4 sm:p-6 text-white`}>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            View All Applications
          </h3>
          <p className="text-white/80 mb-3 sm:mb-4 text-xs sm:text-sm">
            Review and manage candidate applications
          </p>
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
            onClick={() => navigate("/app/applications")}
          >
            View Applications
          </button>
        </div>
        <div className={`${theme.success} rounded-xl p-4 sm:p-6 text-white`}>
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            AI Candidate Insights
          </h3>
          <p className="text-white/80 mb-3 sm:mb-4 text-xs sm:text-sm">
            View AI-powered candidate scores, interview progress, and smart
            remarks
          </p>
          <button
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
            onClick={() => navigate("/app/employer-ai-insights")}
          >
            View Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

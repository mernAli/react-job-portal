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
} from "../../services/dashboardService.js";
import Sidebar from "../../components/Dashboard/Sidebar.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const navigate = useNavigate()

  // Data states
  const [stats, setStats] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [activity, setActivity] = useState([]);

  // Loading states
  const [statsLoading, setStatsLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);

  // Error states
  const [statsError, setStatsError] = useState(null);
  const [applicationsError, setApplicationsError] = useState(null);

  // Fetch all dashboard data in parallel
  useEffect(() => {
    loadStats();
    loadApplications();
    loadActivity();
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

  return (
    <div className="space-y-6">
      <Sidebar />
      {/* Welcome Header — UNCHANGED */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Here's what's happening with your job postings today.
        </p>
      </div>

      {/* Statistics Cards Grid */}
      {statsLoading ? (
        <div className="flex items-center justify-center h-32">
          <Loader size="md" />
        </div>
      ) : statsError ? (
        <ApiError message={statsError} onRetry={loadStats} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Recent Applications Table */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
        <div className={`p-6 ${theme.border} border-b`}>
          <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
            Recent Applications
          </h2>
          <p className={`text-sm ${theme.textMuted} mt-1`}>
            Latest candidates who applied for your jobs
          </p>
        </div>

        {applicationsLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader size="md" />
          </div>
        ) : applicationsError ? (
          <div className="p-6">
            <ApiError message={applicationsError} onRetry={loadApplications} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme.bg}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                    Candidate
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                    Position
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                    Applied Date
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme.border}`}>
                {recentApplications.map((application) => (
                  <tr key={application.id} className={theme.hover}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold`}>
                          {application.candidateName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${theme.textPrimary}`}>
                            {application.candidateName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${theme.textPrimary}`}>
                        {application.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${theme.textMuted}`}>
                        {application.appliedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === "Shortlisted"
                          ? `${theme.successBg} ${theme.successText}`
                          : application.status === "Interview Scheduled"
                          ? `${theme.infoBg} ${theme.infoText}`
                          : `${theme.warningBg} ${theme.warningText}`
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className={`${theme.primaryText} hover:opacity-80 font-medium`}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Activity Feed — NEW SECTION */}
      <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
        <div className={`p-6 ${theme.border} border-b`}>
          <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
            Recent Activity
          </h2>
          <p className={`text-sm ${theme.textMuted} mt-1`}>
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
              <div key={item.id} className={`p-4 flex items-start gap-4 ${theme.hover}`}>
                <div className={`w-10 h-10 ${theme.infoBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${theme.textPrimary}`}>{item.message}</p>
                  <p className={`text-xs ${theme.textMuted} mt-1`}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions — UNCHANGED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${theme.primary} rounded-xl p-6 text-white`}>
          <h3 className="text-lg font-semibold mb-2">Post a New Job</h3>
          <p className="text-white/80 mb-4 text-sm">
            Start hiring by creating a new job posting
          </p>
          <button 
            className={`bg-white ${theme.primaryText} ${theme.hover} px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors`}
            onClick={() => navigate("/app/post-job") }
          >
            Create Job Post
          </button>
        </div>
        <div className={`${theme.info} rounded-xl p-6 text-white`}>
          <h3 className="text-lg font-semibold mb-2">View All Applications</h3>
          <p className="text-white/80 mb-4 text-sm">
            Review and manage candidate applications
          </p>
          <button 
            className={`bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors ${theme.hover}`}
            onClick={() => navigate("/app/applications")}
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
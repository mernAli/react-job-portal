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
import Sidebar from "../../components/Dashboard/Sidebar.jsx";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  // Data states
  const [stats, setStats] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  // Loading states
  const [statsLoading, setStatsLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  // Error states
  const [statsError, setStatsError] = useState(null);
  const [applicationsError, setApplicationsError] = useState(null);

  // Fetch all data in parallel on mount
  useEffect(() => {
    loadStats();
    loadApplications();
    loadRecommendedJobs();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true)
      setStatsLoading(true);
      setStatsError(null);
      const data = await fetchCandidateStats();
      setStats(data);
    } catch (error) {
      setStatsError(error.message || "Failed to load statistics");
    } finally {
      setStatsLoading(false);
      setLoading(false)
    }
  };

  const loadApplications = async () => {
    try {
      setLoading(true)
      setApplicationsLoading(true);
      setApplicationsError(null);
      const data = await fetchCandidateApplications();
      setRecentApplications(data);
    } catch (error) {
      setApplicationsError(error.message || "Failed to load applications");
    } finally {
      setApplicationsLoading(false);
      setLoading(false)
    }
  };

  const loadRecommendedJobs = async () => {
    try {
      setLoading(true)
      setJobsLoading(true);
      const data = await fetchRecommendedJobs();
      setRecommendedJobs(data);
    } catch (error) {
      console.error("Failed to load recommended jobs:", error);
    } finally {
      setJobsLoading(false);
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div className="flex items-end mt-75 justify-end h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Sidebar />
      {/* Welcome Header — UNCHANGED */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Track your applications and discover new opportunities.
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

      {/* Two Column Layout — UNCHANGED STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className={`lg:col-span-2 ${theme.cardBg} rounded-xl ${theme.border} border`}>
          <div className={`p-6 ${theme.border} border-b`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
              Recent Applications
            </h2>
            <p className={`text-sm ${theme.textMuted} mt-1`}>
              Your latest job applications
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
            <div className={`divide-y ${theme.border}`}>
              {recentApplications.map((application) => (
                <div key={application.id} className={`p-6 ${theme.hover} transition-colors`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-semibold ${theme.textPrimary}`}>
                        {application.jobTitle}
                      </h3>
                      <p className={`text-sm ${theme.textSecondary} mt-1`}>
                        {application.company}
                      </p>
                      <p className={`text-xs ${theme.textMuted} mt-2`}>
                        Applied: {application.appliedDate}
                      </p>
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
            <button className={`w-full py-2 text-sm ${theme.primaryText} font-medium ${theme.hover} rounded-lg transition-colors`}>
              View All Applications →
            </button>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className={`${theme.cardBg} rounded-xl ${theme.border} border`}>
          <div className={`p-6 ${theme.border} border-b`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
              Recommended for You
            </h2>
            <p className={`text-sm ${theme.textMuted} mt-1`}>Based on your profile</p>
          </div>

          {jobsLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader size="md" />
            </div>
          ) : (
            <div className={`divide-y ${theme.border}`}>
              {recommendedJobs.map((job) => (
                <div key={job.id} className={`p-4 ${theme.hover} transition-colors`}>
                  <h3 className={`font-semibold ${theme.textPrimary} text-sm`}>
                    {job.title}
                  </h3>
                  <p className={`text-xs ${theme.textSecondary} mt-1`}>{job.company}</p>
                  <div className={`flex items-center gap-2 mt-2 text-xs ${theme.textMuted}`}>
                    <span>📍 {job.location}</span>
                  </div>
                  <p className={`text-xs ${theme.successText} font-semibold mt-2`}>
                    {job.salary}
                  </p>
                  <button className={`w-full mt-3 py-2 text-xs ${theme.primary} text-white rounded-lg ${theme.primaryHover} transition-colors font-medium`}>
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Completion — UNCHANGED */}
      <div className={`${theme.primary} rounded-xl p-6 text-white`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
            <p className="text-white/80 text-sm">
              A complete profile increases your chances of getting hired by 40%
            </p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="text-right">
              <div className="text-3xl font-bold">75%</div>
              <div className="text-xs text-white/70">Complete</div>
            </div>
            <button className={`bg-white ${theme.primaryText} px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap`}>
              Update Profile
            </button>
          </div>
        </div>
        <div className="mt-4 bg-white/30 rounded-full h-2">
          <div className="bg-white h-2 rounded-full" style={{ width: "75%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
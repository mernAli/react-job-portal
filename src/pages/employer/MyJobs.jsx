import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import { fetchEmployerJobs } from "../../services/dashboardService.js";
import { useToast } from "../../ui/toast/useToast";

const MyJobs = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [closingId, setClosingId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEmployerJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseJob = async (jobId) => {
    try {
      setClosingId(jobId);

      // Optimistic UI
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: "Closed" } : job,
        ),
      );

      showToast("Job closed successfully!", "success");
    } catch (err) {
      // Revert on failure
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: "Active" } : job,
        ),
      );
      showToast("Failed to close job.", err.message || "error");
    } finally {
      setClosingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <ApiError message={error} onRetry={loadJobs} />;
  }

  return (
    <div className="space-y-6">
      <Sidebar />
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          My Job Postings
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Manage and track all your job postings
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div
          className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}
        >
          <p className={`text-sm ${theme.textMuted} font-medium`}>Total Jobs</p>
          <h3 className={`text-3xl font-bold ${theme.textPrimary} mt-2`}>
            {jobs.length}
          </h3>
        </div>
        <div
          className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}
        >
          <p className={`text-sm ${theme.textMuted} font-medium`}>
            Active Jobs
          </p>
          <h3 className={`text-3xl font-bold ${theme.successText} mt-2`}>
            {jobs.filter((j) => j.status === "Active").length}
          </h3>
        </div>
        <div
          className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}
        >
          <p className={`text-sm ${theme.textMuted} font-medium`}>
            Total Applicants
          </p>
          <h3 className={`text-3xl font-bold ${theme.infoText} mt-2`}>
            {jobs.reduce((sum, job) => sum + job.applicants, 0)}
          </h3>
        </div>
      </div>

      {/* Jobs List - Mobile Optimized */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                    {job.title}
                  </h3>
                  {/* Status Badge - Mobile Position */}
                  <span
                    className={`lg:hidden px-3 py-1 text-xs font-semibold rounded-full ${
                      job.status === "Active"
                        ? `${theme.successBg} ${theme.successText}`
                        : `${theme.bg} ${theme.textMuted}`
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div
                  className={`flex flex-wrap items-center gap-3 lg:gap-4 text-sm ${theme.textSecondary}`}
                >
                  <span className="flex items-center gap-1">
                    <span>🏢</span>
                    <span className="hidden sm:inline">{job.company}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>⏰</span>
                    <span>{job.type}</span>
                  </span>
                </div>

                <div
                  className={`flex flex-wrap items-center gap-3 lg:gap-4 mt-3 text-sm`}
                >
                  <span className={theme.textMuted}>
                    Posted: {job.postedDate}
                  </span>
                  <span className={`${theme.infoText} font-semibold`}>
                    {job.applicants} Applicants
                  </span>
                </div>
              </div>

              {/* Actions - Desktop and Mobile */}
              <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                {/* Status Badge - Desktop Position */}
                <span
                  className={`hidden lg:inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    job.status === "Active"
                      ? `${theme.successBg} ${theme.successText}`
                      : `${theme.bg} ${theme.textMuted}`
                  }`}
                >
                  {job.status}
                </span>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-1 lg:flex-none">
                  <button
                    className={`flex-1 lg:flex-none px-4 py-2 text-sm ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCloseJob(job.id)}
                    disabled={closingId === job.id || job.status === "Closed"}
                    className={`flex-1 lg:flex-none px-4 py-2 text-sm ${theme.dangerText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {closingId === job.id ? "..." : "Close"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../ui/toast/useToast";
import SidebarJobs from "../components/Dashboard/SideBarJobs";
import { fetchJobs } from "../services/JobService";
import { applyJob } from "../services/JobService";
import useNotifications from "../context/useNotifications";
import { NOTIF_TYPES } from "../context/NotificationContext";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const { addNotification } = useNotifications()

  useEffect(() => {
    loadJobDetails();
  }, [jobId]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);

      // First, try to get job from navigation state
      if (location.state?.job) {
        setJob(location.state.job);
        setLoading(false);
        return;
      }

      // If not in state, fetch all jobs and find the one we need
      const jobs = await fetchJobs();
      const foundJob = jobs.find((j) => j.slug === jobId);

      if (foundJob) {
        // Transform the job data to match our needs
        const transformedJob = {
          id: foundJob.slug,
          title: foundJob.title,
          company: foundJob.company_name,
          location: foundJob.location,
          workMode: foundJob.remote ? "Remote" : "Onsite",
          jobType: foundJob.job_types?.[0] || "Full-Time",
          description: foundJob.description,
          tags: foundJob.tags || [],
          url: foundJob.url,
          postedDate: new Date(foundJob.created_at * 1000).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          ),
          // Add any other fields you need
          views: Math.floor(Math.random() * 100) + 1,
          questions: Math.floor(Math.random() * 10) + 1,
          openings: Math.floor(Math.random() * 5) + 1,
          deadline: new Date(
            Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        };

        setJob(transformedJob);
      } else {
        showToast("Job not found", "error");
        navigate("/app/jobs");
      }
    } catch (error) {
      console.error("Error loading job details:", error);
      showToast("Failed to load job details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (applied) {
      showToast("You have already applied to this job!", "info");
      return;
    }

    try {
      setApplying(true);

      // Optimistic UI update — show applied state immediately
      setApplied(true);

      const result = await applyJob(job.id, {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedAt: new Date().toISOString(),
      });

      showToast(result.message, "success");

      addNotification(
        NOTIF_TYPES.JOB_APPLIED,
        "Application Submitted",
        `You have successfully applied to ${job.title} at ${job.company}.`,
      )
    } catch (error) {
      // Revert optimistic update on failure
      setApplied(false);
      showToast(error.message || "Failed to apply. Please try again.", "error");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className={`${theme.cardBg} p-8 rounded-xl text-center`}>
          <p className={`${theme.textPrimary} text-xl mb-4`}>Job not found</p>
          <button
            onClick={() => navigate("/app/jobs")}
            className={`px-6 py-2 ${theme.primary} ${theme.secondaryText} rounded-lg`}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Desktop Sidebar */}
      <SidebarJobs />

      {/* Mobile: Back Button Header */}
      <div className={`lg:hidden ${theme.primary} p-4 flex items-center`}>
        <button onClick={() => navigate(-1)} className="text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="lg:flex lg:gap-6 lg:px-6">
        <div className="flex-1 px-4 lg:px-0 max-w-4xl mx-auto">
          {/* Desktop: Back Button */}
          <button
            onClick={() => navigate(-1)}
            className={`hidden lg:flex items-center gap-2 ${theme.textSecondary} ${theme.hover} mb-6 transition-colors`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Job Header Card */}
          <div
            className={`${theme.cardBg} rounded-xl ${theme.shadow} p-4 lg:p-6 mb-4`}
          >
            <div className="flex items-start gap-4 mb-4">
              {/* Company Logo */}
              <div
                className={`w-16 h-16 lg:w-20 lg:h-20 ${theme.primary} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <svg
                  className="w-8 h-8 lg:w-10 lg:h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <h1
                  className={`text-xl lg:text-2xl font-bold ${theme.textPrimary} mb-2`}
                >
                  {job.title}
                </h1>
                <p
                  className={`text-base lg:text-lg ${theme.textSecondary} mb-2`}
                >
                  {job.company}
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <svg
                    className={`w-4 h-4 ${theme.textMuted}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className={theme.textMuted}>{job.location}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 lg:gap-4 mb-4">
              <div className={`flex-1 ${theme.bg} rounded-lg p-3 text-center`}>
                <p className={`text-xs ${theme.textMuted} mb-1`}>Views</p>
                <p className={`text-lg font-bold ${theme.textPrimary}`}>
                  {job.views || 1}
                </p>
              </div>
              <div className={`flex-1 ${theme.bg} rounded-lg p-3 text-center`}>
                <p className={`text-xs ${theme.textMuted} mb-1`}>Questions</p>
                <p className={`text-lg font-bold ${theme.textPrimary}`}>
                  {job.questions || 1}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-4 py-2 ${theme.primary} ${theme.secondaryText} rounded-full text-sm font-medium`}
              >
                {job.jobType}
              </span>
              <span
                className={`px-4 py-2 ${theme.primary} ${theme.secondaryText} rounded-full text-sm font-medium`}
              >
                {job.workMode}
              </span>
              <span
                className={`px-4 py-2 ${theme.primary} ${theme.secondaryText} rounded-full text-sm font-medium`}
              >
                Fresher
              </span>
            </div>

            {/* Info Grid */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 ${theme.primaryText}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className={`text-xs ${theme.textMuted}`}>Posted</p>
                  <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                    {job.postedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 ${theme.primaryText}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className={`text-xs ${theme.textMuted}`}>Openings</p>
                  <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                    {job.openings || 5} position
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 ${theme.primaryText}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className={`text-xs ${theme.textMuted}`}>Deadline</p>
                  <p className={`text-sm font-semibold text-red-500`}>
                    {job.deadline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About the Role */}
          <div
            className={`${theme.cardBg} rounded-xl ${theme.shadow} p-4 lg:p-6 mb-4`}
          >
            <h2 className={`text-lg font-bold ${theme.textPrimary} mb-4`}>
              About the role
            </h2>
            <div
              className={`${theme.textSecondary} text-sm leading-relaxed whitespace-pre-line`}
            >
              {job.description}
            </div>
          </div>

          {/* Responsibilities */}
          <div
            className={`${theme.cardBg} rounded-xl ${theme.shadow} p-4 lg:p-6 mb-4`}
          >
            <h2 className={`text-lg font-bold ${theme.textPrimary} mb-4`}>
              Responsibilities
            </h2>
            <ul className={`space-y-2 ${theme.textSecondary} text-sm`}>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  Assist in developing web applications using the MERN stack
                </span>
              </li>
              {job.tags?.slice(0, 4).map((tag, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Work with {tag} technology</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply Button - Mobile Sticky */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
            <button
              onClick={handleApply}
              disabled={applying || applied}
              className={`w-full py-3 ${theme.primary} ${theme.secondaryText} rounded-lg font-semibold text-base`}
            >
              {applying ? "Applying..." : applied ? "✓ Applied" : "Apply Now"}
            </button>
          </div>

          {/* Apply Button - Desktop */}
          <button
            onClick={handleApply}
            disabled={applying || applied}
            className={`fixed lg:bottom-4 lg:right-110 sm:bottom-25 sm:right-65 bottom-25 right-25 w-50 py-3 ${theme.primary} ${theme.secondaryText} rounded-lg font-semibold text-base mb-6 items-center hover:bg-[#0077B5]`}
          >
            {applying ? "Applying..." : applied ? "✓ Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

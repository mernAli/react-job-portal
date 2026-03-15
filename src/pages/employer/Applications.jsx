import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import { useToast } from "../../ui/toast/useToast";
import {
  fetchAllApplications,
  updateApplicationStatus,
} from "../../services/dashboardService.js";
import Sidebar from "../../components/Dashboard/Sidebar.jsx";
import useNotifications from "../../context/useNotifications.js";
import { NOTIF_TYPES } from "../../context/NotificationContext.jsx";

const Applications = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null); // tracks which card is updating

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // ── Status Update (Shortlist / Reject / Interview) ──
  const handleStatusUpdate = async (applicationId, newStatus) => {

    // ✅ Look up the full application object from state first
    const application = applications.find((app) => app.id === applicationId);


    try {
      setUpdatingId(applicationId);

      // Optimistic UI — update immediately
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app,
        ),
      );

      await updateApplicationStatus(applicationId, newStatus);
      showToast(
        `Application ${newStatus.toLowerCase()} successfully!`,
        "success",
      );
      addNotification(
        NOTIF_TYPES.STATUS_UPDATE,
        "Application Status Updated",
        `${application?.candidateName}'s application was ${newStatus.toLowerCase()}.`,
      );
    } catch (err) {
      // Revert on failure
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: "Under Review" } : app,
        ),
      );
      showToast(
        "Failed to update status. Please try again.",
        err.message || "error",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Filter + Search Logic ──
  const filteredApplications = applications.filter((app) => {
    const matchesFilter =
      filter === "all" ||
      app.status.toLowerCase().includes(filter.toLowerCase());

    const matchesSearch =
      !searchTerm ||
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ── Status counts for filter buttons ──
  const counts = {
    all: applications.length,
    "under review": applications.filter((a) => a.status === "Under Review")
      .length,
    shortlisted: applications.filter((a) => a.status === "Shortlisted").length,
    interview: applications.filter((a) => a.status === "Interview Scheduled")
      .length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <ApiError message={error} onRetry={loadApplications} />;
  }

  return (
    <div className="space-y-6">
      <Sidebar />
      {/* Header — UNCHANGED */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          Applications
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Review and manage candidate applications
        </p>
      </div>

      {/* Search Bar — NEW */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, position or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-3 pl-10 ${theme.border} border rounded-lg ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
          />
          <svg
            className={`w-5 h-5 ${theme.textMuted} absolute left-3 top-3.5`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Buttons — SAME UI, dynamic counts */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex gap-2 lg:gap-3 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "all"
                ? `${theme.primary} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter("under review")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "under review"
                ? `${theme.warning} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            <span className="hidden sm:inline">
              Under Review ({counts["under review"]})
            </span>
            <span className="sm:hidden">Review ({counts["under review"]})</span>
          </button>
          <button
            onClick={() => setFilter("shortlisted")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "shortlisted"
                ? `${theme.success} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Shortlisted ({counts.shortlisted})
          </button>
          <button
            onClick={() => setFilter("interview")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "interview"
                ? `${theme.info} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            <span className="hidden sm:inline">
              Interview ({counts.interview})
            </span>
            <span className="sm:hidden">Int. ({counts.interview})</span>
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
              filter === "rejected"
                ? `${theme.danger} text-white`
                : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
            }`}
          >
            Rejected ({counts.rejected})
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className={`text-sm ${theme.textMuted}`}>
        Showing{" "}
        <span className="font-semibold">{filteredApplications.length}</span> of{" "}
        <span className="font-semibold">{applications.length}</span>{" "}
        applications
      </p>

      {/* Applications List — SAME UI, wired to state */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className={`${theme.cardBg} p-4 lg:p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all ${
              updatingId === application.id ? "opacity-70" : ""
            }`}
          >
            <div className="flex flex-col gap-4">
              {/* Header Section — UNCHANGED */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold text-lg flex-shrink-0`}
                >
                  {application.candidateName.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className={`text-base lg:text-lg font-semibold ${theme.textPrimary} truncate`}
                    >
                      {application.candidateName}
                    </h3>
                    {/* Status Badge - Mobile */}
                    <span
                      className={`lg:hidden px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                        application.status === "Shortlisted"
                          ? `${theme.successBg} ${theme.successText}`
                          : application.status === "Interview Scheduled"
                            ? `${theme.infoBg} ${theme.infoText}`
                            : application.status === "Rejected"
                              ? `${theme.dangerBg} ${theme.dangerText}`
                              : `${theme.warningBg} ${theme.warningText}`
                      }`}
                    >
                      {application.status === "Interview Scheduled"
                        ? "Interview"
                        : application.status}
                    </span>
                  </div>

                  <p className={`text-sm ${theme.textSecondary} mb-2`}>
                    Applied for:{" "}
                    <span className="font-medium">{application.position}</span>
                  </p>

                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs lg:text-sm ${theme.textMuted}`}
                  >
                    <span className="flex items-center gap-1 truncate">
                      <span>📧</span>
                      <span className="truncate">{application.email}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📞</span>
                      <span>{application.phone}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>💼</span>
                      <span>{application.experience}</span>
                    </span>
                  </div>

                  <p className={`text-xs ${theme.textMuted} mt-2`}>
                    Applied on: {application.appliedDate}
                  </p>
                </div>
              </div>

              {/* Actions Section — SAME UI, wired to handleStatusUpdate */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Status Badge - Desktop */}
                <span
                  className={`hidden lg:inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    application.status === "Shortlisted"
                      ? `${theme.successBg} ${theme.successText}`
                      : application.status === "Interview Scheduled"
                        ? `${theme.infoBg} ${theme.infoText}`
                        : application.status === "Rejected"
                          ? `${theme.dangerBg} ${theme.dangerText}`
                          : `${theme.warningBg} ${theme.warningText}`
                  }`}
                >
                  {application.status}
                </span>

                {/* Action Buttons — wired */}
                <div className="flex gap-2 flex-1 lg:flex-none lg:ml-auto">
                  <button
                    className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap`}
                  >
                    View Resume
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(application.id, "Shortlisted")
                    }
                    disabled={
                      updatingId === application.id ||
                      application.status === "Shortlisted"
                    }
                    className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.successText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingId === application.id ? "..." : "Shortlist"}
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(application.id, "Rejected")
                    }
                    disabled={
                      updatingId === application.id ||
                      application.status === "Rejected"
                    }
                    className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.dangerText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingId === application.id ? "..." : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State — UNCHANGED */}
      {filteredApplications.length === 0 && (
        <div
          className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}
        >
          <p className={theme.textMuted}>
            No applications found for this filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default Applications;

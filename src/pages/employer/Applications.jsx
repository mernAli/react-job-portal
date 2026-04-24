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
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

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

  const handleStatusUpdate = async (applicationId, newStatus) => {
    const application = applications.find((app) => app.id === applicationId);
    try {
      setUpdatingId(applicationId);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      await updateApplicationStatus(applicationId, newStatus);
      showToast(`Application ${newStatus.toLowerCase()} successfully!`, "success");
      addNotification(
        NOTIF_TYPES.STATUS_UPDATE,
        "Application Status Updated",
        `${application?.candidateName}'s application was ${newStatus.toLowerCase()}.`
      );
    } catch (err) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: "Under Review" } : app
        )
      );
      showToast("Failed to update status. Please try again.", err.message || "error");
    } finally {
      setUpdatingId(null);
    }
  };

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

  const counts = {
    all: applications.length,
    "under review": applications.filter((a) => a.status === "Under Review").length,
    shortlisted: applications.filter((a) => a.status === "Shortlisted").length,
    interview: applications.filter((a) => a.status === "Interview Scheduled").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader size="lg" /></div>;
  if (error) return <ApiError message={error} onRetry={loadApplications} />;

  return (
    <div className="space-y-6">
      <Sidebar />

      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border flex items-center justify-between`}>
        <div>
          <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Applications</h1>
          <p className={`${theme.textSecondary} mt-2`}>Review and manage candidate applications</p>
        </div>
        <button
          onClick={() => navigate("/app/interview-scheduler")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors hidden sm:flex items-center gap-2"
        >
          📅 Interview Scheduler
        </button>
      </div>

      {/* Search Bar */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, position or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-3 pl-10 ${theme.border} border rounded-lg ${theme.textPrimary} ${theme.cardBg} text-sm outline-none`}
          />
          <svg className={`w-5 h-5 ${theme.textMuted} absolute left-3 top-3.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex gap-2 lg:gap-3 flex-wrap">
          {[
            { key: "all",          label: `All (${counts.all})`,                        active: theme.primary },
            { key: "under review", label: `Under Review (${counts["under review"]})`,   active: theme.warning },
            { key: "shortlisted",  label: `Shortlisted (${counts.shortlisted})`,        active: theme.success },
            { key: "interview",    label: `Interview (${counts.interview})`,             active: theme.info },
            { key: "rejected",     label: `Rejected (${counts.rejected})`,              active: theme.danger },
          ].map(({ key, label, active }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors ${
                filter === key
                  ? `${active} text-white`
                  : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className={`text-sm ${theme.textMuted}`}>
        Showing <span className="font-semibold">{filteredApplications.length}</span> of{" "}
        <span className="font-semibold">{applications.length}</span> applications
      </p>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className={`${theme.cardBg} p-4 lg:p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all ${
              updatingId === application.id ? "opacity-70" : ""
            }`}
          >
            <div className="flex flex-col gap-4">
              {/* Candidate info */}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-semibold text-lg flex-shrink-0`}>
                  {application.candidateName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`text-base lg:text-lg font-semibold ${theme.textPrimary} truncate`}>
                      {application.candidateName}
                    </h3>
                    <span className={`lg:hidden px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                      application.status === "Shortlisted"
                        ? `${theme.successBg} ${theme.successText}`
                        : application.status === "Interview Scheduled"
                        ? `${theme.infoBg} ${theme.infoText}`
                        : application.status === "Rejected"
                        ? `${theme.dangerBg} ${theme.dangerText}`
                        : `${theme.warningBg} ${theme.warningText}`
                    }`}>
                      {application.status === "Interview Scheduled" ? "Interview" : application.status}
                    </span>
                  </div>
                  <p className={`text-sm ${theme.textSecondary} mb-2`}>
                    Applied for: <span className="font-medium">{application.position}</span>
                  </p>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs lg:text-sm ${theme.textMuted}`}>
                    <span className="flex items-center gap-1 truncate"><span>📧</span><span className="truncate">{application.email}</span></span>
                    <span className="flex items-center gap-1"><span>📞</span><span>{application.phone}</span></span>
                    <span className="flex items-center gap-1"><span>💼</span><span>{application.experience}</span></span>
                  </div>
                  <p className={`text-xs ${theme.textMuted} mt-2`}>Applied on: {application.appliedDate}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <span className={`hidden lg:inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  application.status === "Shortlisted"
                    ? `${theme.successBg} ${theme.successText}`
                    : application.status === "Interview Scheduled"
                    ? `${theme.infoBg} ${theme.infoText}`
                    : application.status === "Rejected"
                    ? `${theme.dangerBg} ${theme.dangerText}`
                    : `${theme.warningBg} ${theme.warningText}`
                }`}>
                  {application.status}
                </span>

                <div className="flex gap-2 flex-1 lg:flex-none lg:ml-auto flex-wrap">
                  <button className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap`}>
                    View Resume
                  </button>

                  {/* Schedule Interview — shown for Shortlisted candidates */}
                  {(application.status === "Shortlisted" || application.status === "Interview Scheduled") && (
                    <button
                      onClick={() => navigate("/app/interview-scheduler")}
                      className="flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap hover:bg-blue-700 transition-colors"
                    >
                      📅 {application.status === "Interview Scheduled" ? "View Schedule" : "Schedule"}
                    </button>
                  )}

                  <button
                    onClick={() => handleStatusUpdate(application.id, "Shortlisted")}
                    disabled={updatingId === application.id || application.status === "Shortlisted"}
                    className={`flex-1 sm:flex-none px-3 py-2 text-xs lg:text-sm ${theme.successText} ${theme.border} border rounded-lg ${theme.hover} font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingId === application.id ? "..." : "Shortlist"}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(application.id, "Rejected")}
                    disabled={updatingId === application.id || application.status === "Rejected"}
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

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
          <p className={theme.textMuted}>No applications found for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default Applications;
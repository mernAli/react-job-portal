import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import { useToast } from "../../ui/toast/useToast";
import { fetchMyApplications, withdrawApplication } from "../../services/JobService";
import useCache from "../../hooks/useCache";
import useAutoRefresh from "../../hooks/useAutoRefresh";

const CACHE_KEY = "my-applications";

const MyApplications = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [withdrawingId, setWithdrawingId] = useState(null);

  const { getCache, setCache, isFresh, invalidate } = useCache(60000);

  // ── Load applications with cache ───────────────────────
  const loadApplications = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && isFresh(CACHE_KEY)) {
      const cached = getCache(CACHE_KEY);
      if (cached) {
        setApplications(cached);
        setLoading(false);
        return;
      }
    }

    try {
      if (applications.length === 0) setLoading(true);
      setError(null);
      const data = await fetchMyApplications();
      setCache(CACHE_KEY, data);
      setApplications(data);
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [applications.length, isFresh, getCache, setCache]);

  useEffect(() => {
    loadApplications();
  }, []);

  // Auto-refresh every 60 seconds
  useAutoRefresh(() => loadApplications(true), 60000);

  // ── Optimistic Withdraw ────────────────────────────────
  const handleWithdraw = useCallback(async (applicationId) => {
    // Save original list in case we need to revert
    const originalApplications = applications;

    try {
      setWithdrawingId(applicationId);

      // Optimistic update — remove from list immediately
      setApplications((prev) => prev.filter((app) => app.id !== applicationId));

      await withdrawApplication(applicationId);

      // Invalidate cache so next load fetches fresh data
      invalidate(CACHE_KEY);
      showToast("Application withdrawn successfully", "success");
    } catch (err) {
      // Revert on failure
      setApplications(originalApplications);
      showToast(err.message || "Failed to withdraw application", "error");
    } finally {
      setWithdrawingId(null);
    }
  }, [applications, invalidate, showToast]);

  // ── Filter logic ───────────────────────────────────────
  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status.toLowerCase().includes(filter));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <ApiError message={error} onRetry={() => loadApplications(true)} />;
  }

  return (
    <div className="space-y-6">
      <Sidebar />

      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>My Applications</h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Track the status of your job applications
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Total</p>
          <h3 className={`text-2xl font-bold ${theme.textPrimary} mt-1`}>{applications.length}</h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Under Review</p>
          <h3 className={`text-2xl font-bold ${theme.warningText} mt-1`}>
            {applications.filter((a) => a.status === "Under Review").length}
          </h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Interviews</p>
          <h3 className={`text-2xl font-bold ${theme.infoText} mt-1`}>
            {applications.filter((a) => a.status === "Interview Scheduled").length}
          </h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Offers</p>
          <h3 className={`text-2xl font-bold ${theme.successText} mt-1`}>
            {applications.filter((a) => a.status === "Offer Received").length}
          </h3>
        </div>
        <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
          <p className={`text-xs ${theme.textMuted} font-medium`}>Rejected</p>
          <h3 className={`text-2xl font-bold ${theme.dangerText} mt-1`}>
            {applications.filter((a) => a.status === "Rejected").length}
          </h3>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex gap-3 flex-wrap">
          {[
            { key: "all", label: `All (${applications.length})` },
            { key: "under review", label: "Under Review" },
            { key: "interview", label: "Interview Scheduled" },
            { key: "offer", label: "Offer Received" },
            { key: "rejected", label: "Rejected" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === key
                  ? `${theme.primary} text-white`
                  : `${theme.bg} ${theme.textPrimary} ${theme.hover}`
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border ${theme.hover} transition-all ${
              withdrawingId === application.id ? "opacity-50" : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                  {application.jobTitle}
                </h3>
                <p className={`${theme.textSecondary} mt-1`}>{application.company}</p>
                <div className={`flex flex-wrap items-center gap-4 mt-3 text-sm ${theme.textMuted}`}>
                  <span>📍 {application.location}</span>
                  <span>💰 {application.salary}</span>
                  <span>📅 Applied: {application.appliedDate}</span>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    application.status === "Offer Received"
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

                <div className="flex gap-2 w-full lg:w-auto">
                  <button className={`flex-1 lg:flex-none px-3 py-1.5 text-sm ${theme.primaryText} ${theme.border} border rounded-lg ${theme.hover} font-medium`}>
                    View Details
                  </button>
                  {application.status !== "Rejected" && (
                    <button
                      onClick={() => handleWithdraw(application.id)}
                      disabled={withdrawingId === application.id}
                      className={`flex-1 lg:flex-none px-3 py-1.5 text-sm ${theme.dangerText} ${theme.border} border rounded-lg ${theme.hover} font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {withdrawingId === application.id ? "..." : "Withdraw"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
          <div className="text-4xl mb-3">📋</div>
          <p className={`${theme.textPrimary} font-medium mb-1`}>No applications found</p>
          <p className={`${theme.textMuted} text-sm`}>
            {filter === "all" ? "You haven't applied to any jobs yet." : "No applications match this filter."}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import { useToast } from "../../ui/toast/useToast";
import {
  fetchMyApplications,
  withdrawApplication,
  fetchCandidateInterviewDetails,
} from "../../services/JobService";
import useCache from "../../hooks/useCache";
import useAutoRefresh from "../../hooks/useAutoRefresh";
import LockedFeature from "../../components/LockedFeature";

const CACHE_KEY = "my-applications";

// ─────────────────────────────────────────────────────────
// Interview Details Modal
// Shows full job + schedule info and dual options for AI & Coding
// ─────────────────────────────────────────────────────────
const InterviewDetailsModal = ({ application, onClose, theme }) => {
  const navigate = useNavigate();
  const [details, setDetails]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  // Fetch interview details when modal opens
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCandidateInterviewDetails(application.id);
        setDetails(data);
      } catch (err) {
        setError(err.message || "Failed to load interview details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [application.id]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Option 1: AI Video Interview Navigation
  const handleJoinAIInterview = () => {
    onClose();
    navigate("/app/video-interview");
  };

  // Option 2: Machine Coding Test Navigation
  const handleStartMachineTest = () => {
    onClose();
    navigate("/app/machine-test");
  };

  // Platform icon helper
  const platformIcon = (platform = "") => {
    if (platform.toLowerCase().includes("zoom"))   return "🟦";
    if (platform.toLowerCase().includes("teams"))  return "🟪";
    if (platform.toLowerCase().includes("phone"))  return "📞";
    return "🟢"; // Google Meet default
  };

  // Status colour helper
  const statusStyle = (status) => {
    switch (status) {
      case "Confirmed":  return `${theme.successBg} ${theme.successText}`;
      case "Cancelled":  return `${theme.dangerBg}  ${theme.dangerText}`;
      case "Completed":  return `${theme.bg}        ${theme.textMuted}`;
      default:           return `${theme.infoBg}    ${theme.infoText}`; // Scheduled
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="interview-modal-title"
    >
      <LockedFeature
          featureKey="VIDEO_INTERVIEW"
          mode="banner"
          pricingPath="/app/candidate-pricing"
      >
      <div
        className={`${theme.cardBg} ${theme.border} border rounded-2xl
                    w-full max-w-lg max-h-[90vh] overflow-y-auto`}
      >
        {/* ── Modal header ── */}
        <div
          className={`flex items-center justify-between p-5
                      border-b ${theme.border} sticky top-0 ${theme.cardBg} z-10`}
        >
          <h2
            id="interview-modal-title"
            className={`text-lg font-bold ${theme.textPrimary}`}
          >
            Interview Details
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`${theme.textMuted} ${theme.hover} p-1.5 rounded-lg
                        transition-colors text-xl leading-none`}
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-5 space-y-5">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader size="md" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className={`${theme.dangerBg} ${theme.dangerText} ${theme.border}
                          border rounded-xl p-4 text-sm flex gap-2`}
              role="alert"
            >
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Content */}
          {!loading && details && (
            <>
              {/* Job info block */}
              <div
                className={`${theme.bg} ${theme.border} border rounded-xl p-4
                            space-y-1`}
              >
                <h3 className={`text-base font-bold ${theme.textPrimary}`}>
                  {details.jobTitle}
                </h3>
                <p className={`text-sm ${theme.textSecondary}`}>
                  {details.company}
                </p>
                <div
                  className={`flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs
                              ${theme.textMuted}`}
                >
                  <span>📍 {details.location}</span>
                  <span>💰 {details.salary}</span>
                  <span>🧳 {details.jobType}</span>
                  <span>🛠 {details.experience} experience</span>
                </div>

                {/* Skills chips */}
                {details.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {details.skills.map((s) => (
                      <span
                        key={s}
                        className={`text-xs px-2.5 py-0.5 rounded-full
                                    ${theme.infoBg} ${theme.infoText}
                                    font-medium`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* About */}
                {details.about && (
                  <p className={`text-xs ${theme.textMuted} mt-3 leading-relaxed`}>
                    {details.about}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className={`border-t ${theme.border}`} />

              {/* Interview schedule block */}
              <div>
                <h4
                  className={`text-xs font-semibold uppercase tracking-wide
                              ${theme.textMuted} mb-3`}
                >
                  📅 Scheduled Interview
                </h4>

                <div className="space-y-2.5">
                  {[
                    { icon: "📆", label: "Date",        value: details.date },
                    { icon: "🕐", label: "Time",        value: details.time },
                    { icon: "⏱",  label: "Duration",    value: `${details.duration} minutes` },
                    {
                      icon: platformIcon(details.platform),
                      label: "Platform",
                      value: details.platform,
                    },
                    {
                      icon: "👤",
                      label: "Interviewer",
                      value: details.interviewerName || "—",
                    },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0 w-5">{icon}</span>
                      <span
                        className={`text-xs ${theme.textMuted} w-20 flex-shrink-0 pt-0.5`}
                      >
                        {label}
                      </span>
                      <span
                        className={`text-sm font-medium ${theme.textPrimary} flex-1`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}

                  {/* Status badge inline */}
                  <div className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 w-5">🔖</span>
                    <span
                      className={`text-xs ${theme.textMuted} w-20 flex-shrink-0 pt-0.5`}
                    >
                      Status
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full
                                  ${statusStyle(details.status)}`}
                    >
                      {details.status}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {details.notes && (
                  <div
                    className={`mt-4 ${theme.warningBg} ${theme.border} border
                                rounded-xl p-3 flex gap-2 text-sm`}
                  >
                    <span className="flex-shrink-0">📝</span>
                    <span className={theme.textSecondary}>{details.notes}</span>
                  </div>
                )}
              </div>

              {/* Meeting link */}
              {details.meetingLink && (
                <div
                  className={`${theme.bg} ${theme.border} border rounded-xl p-3
                              flex items-center gap-3`}
                >
                  <span className="text-lg">🔗</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${theme.textMuted}`}>Meeting link</p>
                    <p
                      className={`text-xs ${theme.primaryText} font-medium
                                  truncate`}
                    >
                      {details.meetingLink}
                    </p>
                  </div>
                  <a
                    href={details.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs ${theme.primaryText} ${theme.border} border
                                px-2.5 py-1.5 rounded-lg ${theme.hover} font-medium
                                whitespace-nowrap transition-colors`}
                  >
                    Open ↗
                  </a>
                </div>
              )}

              {/* Divider */}
              <div className={`border-t ${theme.border}`} />

              {/* ── Responsive Action CTA Layout block ── */}
              <div className="flex flex-col gap-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleJoinAIInterview}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white
                               text-sm font-semibold hover:bg-blue-700
                               transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    🎥 Start AI Interview
                  </button>
                  
                  <button
                    onClick={handleStartMachineTest}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white
                               text-sm font-semibold hover:bg-emerald-700
                               transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    💻 Launch Coding Sandbox
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className={`w-full py-2.5 rounded-xl border ${theme.border}
                              ${theme.textSecondary} ${theme.hover} text-sm
                              font-medium transition-colors`}
                >
                  Close Window
                </button>
              </div>
            </>
          )}

          {/* No interview data (non-scheduled application) */}
          {!loading && !error && !details && (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📋</div>
              <p className={`text-sm font-medium ${theme.textPrimary}`}>
                No interview scheduled yet
              </p>
              <p className={`text-xs ${theme.textMuted} mt-1`}>
                You will be notified when an interview is scheduled.
              </p>
            </div>
          )}
        </div>
      </div>
      </LockedFeature>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────
const MyApplications = () => {
  const { theme }      = useTheme();
  const { showToast }  = useToast();

  const [applications,  setApplications]  = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [filter,         setFilter]        = useState("all");
  const [withdrawingId, setWithdrawingId] = useState(null);

  const [selectedApp,   setSelectedApp]   = useState(null); 

  const { getCache, setCache, isFresh, invalidate } = useCache(60000);

  const loadApplications = useCallback(
    async (forceRefresh = false) => {
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
    },
    [applications.length, isFresh, getCache, setCache]
  );

  useEffect(() => { loadApplications(); }, []);
  useAutoRefresh(() => loadApplications(true), 60000);

  const handleWithdraw = useCallback(
    async (applicationId) => {
      const originalApplications = applications;
      try {
        setWithdrawingId(applicationId);
        setApplications((prev) =>
          prev.filter((app) => app.id !== applicationId)
        );
        await withdrawApplication(applicationId);
        invalidate(CACHE_KEY);
        showToast("Application withdrawn successfully", "success");
      } catch (err) {
        setApplications(originalApplications);
        showToast(err.message || "Failed to withdraw application", "error");
      } finally {
        setWithdrawingId(null);
      }
    },
    [applications, invalidate, showToast]
  );

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) =>
          app.status.toLowerCase().includes(filter)
        );

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

      {selectedApp && (
        <InterviewDetailsModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          theme={theme}
        />
      )}

      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
          My Applications
        </h1>
        <p className={`${theme.textSecondary} mt-2`}>
          Track the status of your job applications
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: applications.length, color: theme.textPrimary },
          { label: "Under Review", value: applications.filter((a) => a.status === "Under Review").length, color: theme.warningText },
          { label: "Interviews", value: applications.filter((a) => a.status === "Interview Scheduled").length, color: theme.infoText },
          { label: "Offers", value: applications.filter((a) => a.status === "Offer Received").length, color: theme.successText },
          { label: "Rejected", value: applications.filter((a) => a.status === "Rejected").length, color: theme.dangerText },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}
          >
            <p className={`text-xs ${theme.textMuted} font-medium`}>{label}</p>
            <h3 className={`text-2xl font-bold ${color} mt-1`}>{value}</h3>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className={`${theme.cardBg} p-4 rounded-xl ${theme.border} border`}>
        <div className="flex gap-3 flex-wrap">
          {[
            { key: "all",          label: `All (${applications.length})` },
            { key: "under review", label: "Under Review" },
            { key: "interview",    label: "Interview Scheduled" },
            { key: "offer",        label: "Offer Received" },
            { key: "rejected",     label: "Rejected" },
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
            className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border
                        ${theme.hover} transition-all ${
              withdrawingId === application.id ? "opacity-50" : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                  {application.jobTitle}
                </h3>
                <p className={`${theme.textSecondary} mt-1`}>
                  {application.company}
                </p>
                <div
                  className={`flex flex-wrap items-center gap-4 mt-3 text-sm
                              ${theme.textMuted}`}
                >
                  <span>📍 {application.location}</span>
                  <span>💰 {application.salary}</span>
                  <span>📅 Applied: {application.appliedDate}</span>
                </div>

                {application.status === "Interview Scheduled" && (
                  <div className="mt-3">
                    <InterviewScheduleChip
                      applicationId={application.id}
                      theme={theme}
                    />
                  </div>
                )}
              </div>

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
                  <button
                    onClick={() => setSelectedApp(application)}
                    className={`flex-1 lg:flex-none px-3 py-1.5 text-sm
                                ${theme.primaryText} ${theme.border} border
                                rounded-lg ${theme.hover} font-medium
                                transition-colors`}
                  >
                    View Details
                  </button>

                  {application.status !== "Rejected" && (
                    <button
                      onClick={() => handleWithdraw(application.id)}
                      disabled={withdrawingId === application.id}
                      className={`flex-1 lg:flex-none px-3 py-1.5 text-sm
                                  ${theme.dangerText} ${theme.border} border
                                  rounded-lg ${theme.hover} font-medium
                                  disabled:opacity-50 disabled:cursor-not-allowed
                                  transition-colors`}
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

// ─────────────────────────────────────────────────────────
// InterviewScheduleChip
// ─────────────────────────────────────────────────────────
const InterviewScheduleChip = ({ applicationId, theme }) => {
  const [info,    setInfo]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCandidateInterviewDetails(applicationId)
      .then((data) => { if (!cancelled) { setInfo(data); setLoading(false); } })
      .catch(()    => { if (!cancelled)   setLoading(false); });
    return () => { cancelled = true; };
  }, [applicationId]);

  if (loading) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs ${theme.textMuted}
                    ${theme.bg} px-3 py-1 rounded-full ${theme.border} border`}
      >
        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        Loading schedule…
      </span>
    );
  }

  if (!info) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium
                  ${theme.infoBg} ${theme.infoText} ${theme.border} border
                  px-3 py-1 rounded-full`}
    >
      📅 {info.date} &nbsp;·&nbsp; 🕐 {info.time} &nbsp;·&nbsp; {info.platform}
    </span>
  );
};
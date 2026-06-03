import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import { useToast } from "../../ui/toast/useToast";
import { SectionErrorBoundary } from "../../components/ErrorBoundary";
import { fetchInterviewReviews } from "../../services/scheduleService";
import LockedFeature from "../../components/LockedFeature";

// ─────────────────────────────────────────────────────────
// Score Ring — same pattern as AIInsights.jsx
// ─────────────────────────────────────────────────────────
const ScoreRing = ({ score, size = 64, strokeWidth = 6 }) => {
  const radius       = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset       = circumference - (score / 100) * circumference;
  const stroke       =
    score >= 75 ? "#22C55E" :
    score >= 50 ? "#F59E0B" : "#EF4444";
  const textColor    =
    score >= 75 ? "text-green-500" :
    score >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={stroke} strokeWidth={strokeWidth}
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${textColor}`}>{score}</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Dimension Bar — same pattern as AIInsights.jsx
// ─────────────────────────────────────────────────────────
const DimensionBar = ({ label, score, theme }) => {
  const color =
    score >= 75 ? "bg-green-500" :
    score >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs ${theme.textMuted} w-28 flex-shrink-0`}>{label}</span>
      <div className={`flex-1 h-1.5 ${theme.bg} rounded-full overflow-hidden`}>
        <div className={`h-full ${color} rounded-full transition-all duration-700`}
             style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-semibold ${theme.textPrimary} w-6 text-right`}>
        {score}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Integrity Badge
// ─────────────────────────────────────────────────────────
const IntegrityBadge = ({ status, violations, theme }) => {
  const styles = {
    "Clean":          { bg: theme.successBg, text: theme.successText, icon: "🛡" },
    "Minor Flags":    { bg: theme.warningBg, text: theme.warningText, icon: "⚠️" },
    "Critical Flags": { bg: theme.dangerBg,  text: theme.dangerText,  icon: "🚨" },
  };
  const s = styles[status] || styles["Clean"];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold
                      px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
      {s.icon} {status}
      {violations > 0 && ` · ${violations} flag${violations > 1 ? "s" : ""}`}
    </span>
  );
};

// ─────────────────────────────────────────────────────────
// Video Playback Panel
// ─────────────────────────────────────────────────────────
const VideoPlaybackPanel = ({ candidate, theme }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`${theme.bg} ${theme.border} border rounded-xl overflow-hidden`}>

      {/* Video area */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        {candidate.videoUrl ? (
          <video
            src={candidate.videoUrl}
            controls
            className="w-full h-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : (
          /* Placeholder when no video URL yet */
          <div className="flex flex-col items-center gap-3 text-center p-6">
            <div className={`w-16 h-16 rounded-full ${theme.cardBg} flex items-center
                             justify-center text-3xl`}>
              🎬
            </div>
            <div>
              <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                Interview Recording
              </p>
              <p className={`text-xs ${theme.textMuted} mt-1`}>
                Video available after backend integration.
              </p>
            </div>
            {/* Mock play button */}
            <button
              onClick={() => setPlaying((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl
                          bg-blue-600 text-white text-sm font-medium
                          hover:bg-blue-700 transition-colors`}
            >
              {playing ? "⏸ Pause" : "▶ Play"} Recording
            </button>
            {playing && (
              <p className={`text-xs ${theme.successText} animate-pulse`}>
                ▶ Simulating playback…
              </p>
            )}
          </div>
        )}

        {/* Duration chip */}
        <span className="absolute bottom-2 right-2 text-xs text-white
                          bg-black/70 px-2 py-0.5 rounded-full">
          {candidate.duration} min
        </span>
      </div>

      {/* Highlights timeline */}
      <div className="p-4">
        <h4 className={`text-xs font-semibold uppercase tracking-wide
                         ${theme.textMuted} mb-3`}>
          🎯 AI Highlights
        </h4>
        <div className="space-y-2">
          {candidate.highlights.map((h, i) => (
            <div key={i}
                 className={`flex items-start gap-3 p-2.5 rounded-lg
                             ${theme.cardBg} ${theme.border} border`}>
              <span className={`text-xs font-mono font-bold ${theme.primaryText}
                                flex-shrink-0 mt-0.5`}>
                {h.time}
              </span>
              <span className={`text-xs ${theme.textSecondary}`}>{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Candidate Detail Modal
// Opens when recruiter clicks "Review" on a candidate card
// ─────────────────────────────────────────────────────────
const ReviewModal = ({ candidate, onClose, onDecision, theme }) => {
  const [feedback,  setFeedback]  = useState(candidate.recruiterFeedback || "");
  const [decision,  setDecision]  = useState(candidate.recruiterDecision || null);
  const [saving,    setSaving]    = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: await saveRecruiterDecision(candidate.id, { decision, feedback });
    await new Promise((r) => setTimeout(r, 600)); // mock save
    onDecision(candidate.id, decision, feedback);
    setSaving(false);
    onClose();
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const verdictStyle = {
    success: { bg: theme.successBg, text: theme.successText },
    warning: { bg: theme.warningBg, text: theme.warningText },
    danger:  { bg: theme.dangerBg,  text: theme.dangerText  },
  }[candidate.verdictColor] || { bg: theme.infoBg, text: theme.infoText };

  const DECISIONS = [
    { key: "hire",   label: "✅ Hire",        style: "bg-green-600 text-white hover:bg-green-700" },
    { key: "hold",   label: "⏸ Hold",         style: `${theme.warningBg} ${theme.warningText} border ${theme.border} hover:opacity-80` },
    { key: "reject", label: "❌ Reject",       style: "bg-red-600 text-white hover:bg-red-700"   },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className={`${theme.cardBg} ${theme.border} border rounded-2xl
                       w-full max-w-3xl max-h-[92vh] overflow-y-auto`}>

        {/* Header */}
        <div className={`sticky top-0 z-10 ${theme.cardBg} flex items-center
                         justify-between p-5 border-b ${theme.border}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${theme.infoBg} ${theme.infoText}
                             font-bold text-base flex items-center justify-center`}>
              {candidate.initials}
            </div>
            <div>
              <h2 id="review-modal-title"
                  className={`text-base font-bold ${theme.textPrimary}`}>
                {candidate.candidateName}
              </h2>
              <p className={`text-xs ${theme.textMuted}`}>{candidate.position}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close"
                  className={`${theme.textMuted} ${theme.hover} p-1.5 rounded-lg
                               text-xl leading-none`}>
            ✕
          </button>
        </div>

        <div className="p-5 space-y-6">

          {/* ── Interview meta row ── */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3`}>
            {[
              { icon: "📅", label: "Date",        value: candidate.interviewDate },
              { icon: "🕐", label: "Time",        value: candidate.interviewTime },
              { icon: "⏱",  label: "Duration",    value: `${candidate.duration} min` },
              { icon: "💻", label: "Platform",    value: candidate.platform },
            ].map(({ icon, label, value }) => (
              <div key={label}
                   className={`${theme.bg} ${theme.border} border rounded-xl
                               p-3 text-center`}>
                <p className="text-lg mb-1">{icon}</p>
                <p className={`text-xs ${theme.textMuted}`}>{label}</p>
                <p className={`text-sm font-semibold ${theme.textPrimary} mt-0.5`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Two-column: video + scores ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Video playback */}
            <SectionErrorBoundary>
              <VideoPlaybackPanel candidate={candidate} theme={theme} />
            </SectionErrorBoundary>

            {/* AI scores */}
            <div className="space-y-4">

              {/* Overall score + verdict */}
              <div className={`${theme.bg} ${theme.border} border rounded-xl p-4
                               flex items-center gap-4`}>
                <ScoreRing score={candidate.overallScore} size={72} strokeWidth={7} />
                <div className="flex-1">
                  <p className={`text-xs ${theme.textMuted} mb-1`}>Overall AI Score</p>
                  <span className={`inline-block px-2.5 py-0.5 text-xs font-bold
                                   rounded-full mb-2 ${verdictStyle.bg} ${verdictStyle.text}`}>
                    {candidate.aiVerdict}
                  </span>
                  <p className={`text-xs ${theme.textMuted}`}>
                    Confidence:{" "}
                    <span className={`font-semibold ${
                      candidate.confidence === "High"
                        ? theme.successText : theme.warningText
                    }`}>
                      {candidate.confidence}
                    </span>
                  </p>
                  <IntegrityBadge
                    status={candidate.integrityStatus}
                    violations={candidate.violations}
                    theme={theme}
                  />
                </div>
              </div>

              {/* Dimension bars */}
              <div className={`${theme.bg} ${theme.border} border rounded-xl p-4`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wide
                                ${theme.textMuted} mb-3`}>
                  Score Breakdown
                </h4>
                <div className="space-y-2.5">
                  {candidate.dimensions.map((d) => (
                    <DimensionBar key={d.label} label={d.label}
                                  score={d.score} theme={theme} />
                  ))}
                </div>
              </div>

              {/* Integrity detail */}
              {candidate.violations > 0 && (
                <div className={`${theme.dangerBg} ${theme.border} border rounded-xl p-4`}>
                  <h4 className={`text-xs font-semibold ${theme.dangerText} mb-2`}>
                    🚨 Integrity Flags
                  </h4>
                  <div className={`space-y-1 text-xs ${theme.textSecondary}`}>
                    {candidate.tabSwitches > 0 && (
                      <p>• Tab switches detected: <strong>{candidate.tabSwitches}</strong></p>
                    )}
                    {candidate.cameraOffEvents > 0 && (
                      <p>• Camera-off events: <strong>{candidate.cameraOffEvents}</strong></p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── AI Remark ── */}
          <div className={`${theme.bg} ${theme.border} border rounded-xl p-4`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wide
                            ${theme.textMuted} mb-2`}>
              🤖 AI Remark
            </h4>
            <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>
              {candidate.aiRemark}
            </p>
          </div>

          {/* ── Recruiter decision ── */}
          <div className={`${theme.bg} ${theme.border} border rounded-xl p-4 space-y-4`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wide
                            ${theme.textMuted}`}>
              📝 Recruiter Decision
            </h4>

            {/* Decision buttons */}
            <div className="flex gap-3 flex-wrap">
              {DECISIONS.map(({ key, label, style }) => (
                <button
                  key={key}
                  onClick={() => setDecision(key)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold
                              transition-colors border-2
                              ${decision === key
                                ? style + " border-transparent"
                                : `${theme.cardBg} ${theme.textMuted} ${theme.border}
                                   hover:opacity-80`
                              }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Feedback textarea */}
            <div>
              <label className={`text-xs font-medium ${theme.textMuted} block mb-1.5`}>
                Feedback / Notes (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                placeholder="Add your notes about this candidate…"
                className={`w-full px-3 py-2.5 text-sm ${theme.cardBg} ${theme.border}
                            border rounded-xl ${theme.textPrimary} outline-none
                            resize-none placeholder:${theme.textMuted}`}
              />
            </div>

            {/* Save */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`flex-1 py-2.5 rounded-xl border ${theme.border}
                            ${theme.textSecondary} ${theme.hover} text-sm
                            font-medium transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!decision || saving}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm
                           font-semibold hover:bg-blue-700 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent
                                     rounded-full animate-spin" />
                    Saving…
                  </>
                ) : "💾 Save Decision"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Candidate Review Card — list item on the main dashboard
// ─────────────────────────────────────────────────────────
const ReviewCard = ({ candidate, onOpen, theme }) => {
  const verdictStyle = {
    success: { bg: theme.successBg, text: theme.successText },
    warning: { bg: theme.warningBg, text: theme.warningText },
    danger:  { bg: theme.dangerBg,  text: theme.dangerText  },
  }[candidate.verdictColor] || { bg: theme.infoBg, text: theme.infoText };

  const decisionStyle = {
    hire:   { bg: theme.successBg, text: theme.successText, label: "✅ Hire" },
    hold:   { bg: theme.warningBg, text: theme.warningText, label: "⏸ Hold" },
    reject: { bg: theme.dangerBg,  text: theme.dangerText,  label: "❌ Reject" },
  };

  return (
    <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-4 sm:p-5
                     ${theme.hover} transition-all`}>
      <div className="flex flex-col sm:flex-row gap-4">

        {/* Left: avatar + meta */}
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-12 h-12 rounded-full ${theme.infoBg} ${theme.infoText}
                           font-bold text-lg flex items-center justify-center
                           flex-shrink-0`}>
            {candidate.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className={`font-semibold text-sm ${theme.textPrimary}`}>
                {candidate.candidateName}
              </h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                                ${verdictStyle.bg} ${verdictStyle.text}`}>
                {candidate.aiVerdict}
              </span>
              {candidate.recruiterDecision && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                                  ${decisionStyle[candidate.recruiterDecision].bg}
                                  ${decisionStyle[candidate.recruiterDecision].text}`}>
                  {decisionStyle[candidate.recruiterDecision].label}
                </span>
              )}
            </div>
            <p className={`text-xs ${theme.textMuted} mb-2`}>
              {candidate.position} · {candidate.interviewDate} · {candidate.duration} min
            </p>

            {/* Mini dimension bars — top 3 */}
            <div className="space-y-1.5 mb-3">
              {candidate.dimensions.slice(0, 3).map((d) => (
                <DimensionBar key={d.label} label={d.label}
                              score={d.score} theme={theme} />
              ))}
            </div>

            {/* Integrity + video badges */}
            <div className="flex flex-wrap gap-2">
              <IntegrityBadge
                status={candidate.integrityStatus}
                violations={candidate.violations}
                theme={theme}
              />
              {candidate.hasVideo && (
                <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1
                                  rounded-full ${theme.infoBg} ${theme.infoText}
                                  font-medium`}>
                  🎬 Recording available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: score ring + review button */}
        <div className="flex sm:flex-col items-center sm:items-end
                        justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2">
            <ScoreRing score={candidate.overallScore} size={56} strokeWidth={5} />
          </div>
          <button
            onClick={() => onOpen(candidate)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs
                       font-semibold hover:bg-blue-700 transition-colors
                       whitespace-nowrap"
          >
            🔍 Review
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Main Page — RecruiterReview
// ─────────────────────────────────────────────────────────
const RecruiterReview = () => {
  const { theme }    = useTheme();
  const navigate     = useNavigate();
  const { showToast } = useToast();

  const [reviews,      setReviews]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [selected,     setSelected]     = useState(null); // candidate for modal
  const [filterVerdict, setFilterVerdict] = useState("all");
  const [sortBy,       setSortBy]       = useState("score");

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchInterviewReviews();
      setReviews(data);
    } catch (err) {
      setError(err.message || "Failed to load interview reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  // Save recruiter decision — optimistic update
  const handleDecision = useCallback((candidateId, decision, feedback) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === candidateId
          ? { ...r, recruiterDecision: decision, recruiterFeedback: feedback }
          : r
      )
    );
    showToast("Decision saved successfully", "success");
  }, [showToast]);

  // Filter + sort
  const filtered = reviews
    .filter((r) => {
      if (filterVerdict === "all")       return true;
      if (filterVerdict === "flagged")   return r.violations > 0;
      if (filterVerdict === "decided")   return r.recruiterDecision !== null;
      if (filterVerdict === "pending")   return r.recruiterDecision === null;
      return r.aiVerdict.toLowerCase().includes(filterVerdict);
    })
    .sort((a, b) =>
      sortBy === "score" ? b.overallScore - a.overallScore
      : sortBy === "date" ? new Date(b.interviewDate) - new Date(a.interviewDate)
      : a.candidateName.localeCompare(b.candidateName)
    );

  // Summary counts
  const counts = {
    total:       reviews.length,
    recommended: reviews.filter((r) => r.aiVerdict === "Strongly Recommended").length,
    needsReview: reviews.filter((r) => r.aiVerdict === "Needs Review").length,
    flagged:     reviews.filter((r) => r.violations > 0).length,
    decided:     reviews.filter((r) => r.recruiterDecision !== null).length,
    avgScore:    reviews.length
      ? Math.round(reviews.reduce((s, r) => s + r.overallScore, 0) / reviews.length)
      : 0,
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader size="lg" />
    </div>
  );
  if (error) return <ApiError message={error} onRetry={loadReviews} />;

  return (
    <div className="space-y-6 px-2 sm:px-0 mt-5">
      <Sidebar />

      <LockedFeature
        featureKey="RECRUITER_REVIEW"
        mode="hidden"
        pricingPath="/app/employer-pricing"
      >

      {/* Modal */}
      {selected && (
        <ReviewModal
          candidate={selected}
          onClose={() => setSelected(null)}
          onDecision={handleDecision}
          theme={theme}
        />
      )}

      {/* ── Page Header ── */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>
              🎬 Recruiter Review Dashboard
            </h1>
            <p className={`${theme.textSecondary} mt-1 text-sm`}>
              Review completed AI interviews, watch recordings, and make hiring decisions
            </p>
          </div>
          <button
            onClick={() => navigate("/app/interview-scheduler")}
            className={`px-4 py-2 text-sm font-medium ${theme.primaryText}
                        ${theme.border} border rounded-xl ${theme.hover}
                        transition-colors`}
          >
            📅 Scheduler →
          </button>
        </div>
      </div>

      {/* ── Summary chips ── */}
      <SectionErrorBoundary>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Reviewed",   value: counts.total,       color: theme.infoText       },
            { label: "Recommended",      value: counts.recommended, color: theme.successText    },
            { label: "Needs Review",     value: counts.needsReview, color: theme.warningText    },
            { label: "Integrity Flags",  value: counts.flagged,     color: theme.dangerText     },
            { label: "Avg AI Score",     value: counts.avgScore,    color: theme.primaryText    },
            { label: "Decisions Made",   value: counts.decided,     color: theme.successText    },
          ].map(({ label, value, color }) => (
            <div key={label}
                 className={`${theme.cardBg} ${theme.border} border rounded-xl
                             p-4 text-center`}>
              <p className={`text-xs ${theme.textMuted}`}>{label}</p>
              <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </SectionErrorBoundary>

      {/* ── Filters + sort ── */}
      <div className={`${theme.cardBg} ${theme.border} border rounded-xl p-4`}>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center
                        sm:justify-between">
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "all",         label: `All (${counts.total})`                          },
              { key: "recommended", label: `Recommended (${counts.recommended})`            },
              { key: "needs review",label: `Needs Review (${counts.needsReview})`           },
              { key: "flagged",     label: `Flagged (${counts.flagged})`                    },
              { key: "pending",     label: `Pending Decision (${counts.total - counts.decided})` },
              { key: "decided",     label: `Decided (${counts.decided})`                   },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilterVerdict(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                            ${filterVerdict === key
                              ? `${theme.primary} text-white`
                              : `${theme.bg} ${theme.textSecondary} ${theme.hover}`}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-1.5 text-xs ${theme.bg} ${theme.border} border
                        rounded-lg ${theme.textPrimary} outline-none self-start sm:self-auto`}
          >
            <option value="score">Sort: Score ↓</option>
            <option value="date">Sort: Date ↓</option>
            <option value="name">Sort: Name A–Z</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className={`text-sm ${theme.textMuted}`}>
        Showing{" "}
        <span className="font-semibold">{filtered.length}</span> of{" "}
        <span className="font-semibold">{reviews.length}</span> completed interviews
      </p>

      {/* ── Review Cards ── */}
      <SectionErrorBoundary>
        <div className="space-y-4">
          {filtered.map((candidate) => (
            <ReviewCard
              key={candidate.id}
              candidate={candidate}
              onOpen={setSelected}
              theme={theme}
            />
          ))}
        </div>
      </SectionErrorBoundary>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border}
                         border text-center`}>
          <div className="text-4xl mb-3">🎬</div>
          <p className={`font-medium ${theme.textPrimary} mb-1`}>
            No interviews found
          </p>
          <p className={`text-sm ${theme.textMuted}`}>
            {filterVerdict === "all"
              ? "No completed interviews yet."
              : "No interviews match this filter."}
          </p>
        </div>
      )}

      </LockedFeature>
    </div>
  );
};

export default RecruiterReview;
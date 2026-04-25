import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import { useToast } from "../../ui/toast/useToast";
import {
  fetchInterviews,
  scheduleInterview,
  updateInterviewStatus,
} from "../../services/scheduleService";
import useNotifications from "../../context/useNotifications";
import { NOTIF_TYPES } from "../../context/NotificationContext";

// ─── Constants ────────────────────────────────────────────
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const TIME_SLOTS = [
  "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM",
  "03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM",
];
const PLATFORMS = ["Google Meet", "Zoom", "Microsoft Teams", "Phone Call", "In-Person"];
const DURATIONS = [
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "1 hour", value: 60 },
  { label: "1.5 hours", value: 90 },
];

// ─── Status badge helper ──────────────────────────────────
const StatusBadge = ({ status, theme }) => {
  const styles = {
    Scheduled:  `${theme.infoBg} ${theme.infoText}`,
    Confirmed:  `${theme.successBg} ${theme.successText}`,
    Completed:  `${theme.bg} ${theme.textMuted}`,
    Cancelled:  `${theme.dangerBg} ${theme.dangerText}`,
  };
  const icons = {
    Scheduled: "📅", Confirmed: "✅", Completed: "🏁", Cancelled: "❌",
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status] || styles.Scheduled}`}>
      {icons[status]} {status}
    </span>
  );
};

// ─── Mini Calendar ────────────────────────────────────────
const Calendar = ({ selectedDate, onSelectDate, bookedDates, theme }) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // First day of month (0=Sun) and total days
  const firstDay   = new Date(year, month, 1).getDay();
  const totalDays  = new Date(year, month + 1, 0).getDate();
  const cells      = Array.from({ length: firstDay + totalDays }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const toKey = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const isToday    = (d) => d && new Date(year, month, d).toDateString() === today.toDateString();
  const isPast     = (d) => d && new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isWeekend  = (d) => {
    if (!d) return false;
    const day = new Date(year, month, d).getDay();
    return day === 0 || day === 6;
  };
  const isSelected = (d) => d && toKey(d) === selectedDate;
  const isBooked   = (d) => d && bookedDates.includes(toKey(d));

  return (
    <div className={`${theme.cardBg} rounded-xl ${theme.border} border p-4`}>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className={`p-2 rounded-lg ${theme.hover} ${theme.textSecondary}`}>
          ←
        </button>
        <h3 className={`font-semibold ${theme.textPrimary}`}>
          {MONTHS[month]} {year}
        </h3>
        <button onClick={nextMonth} className={`p-2 rounded-lg ${theme.hover} ${theme.textSecondary}`}>
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className={`text-center text-xs font-medium ${theme.textMuted} py-1`}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const past    = isPast(d);
          const weekend = isWeekend(d);
          const booked  = isBooked(d);
          const selected = isSelected(d);
          const todayCell = isToday(d);
          const disabled = past || weekend;

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => !disabled && onSelectDate(toKey(d))}
              className={`
                relative w-8 h-8 mx-auto rounded-full text-xs font-medium transition-all
                ${selected
                  ? "bg-blue-600 text-white"
                  : todayCell
                  ? `${theme.primaryText} font-bold border-2 border-blue-500`
                  : disabled
                  ? `${theme.textMuted} opacity-30 cursor-not-allowed`
                  : `${theme.textPrimary} ${theme.hover} cursor-pointer`
                }
              `}
            >
              {d}
              {booked && !selected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className={`flex gap-4 mt-4 pt-3 border-t ${theme.border}`}>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className={`text-xs ${theme.textMuted}`}>Has interview</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full border-2 border-blue-500`} />
          <span className={`text-xs ${theme.textMuted}`}>Today</span>
        </div>
      </div>
    </div>
  );
};

// ─── Schedule Modal (3-step booking flow) ─────────────────
const ScheduleModal = ({ onClose, onScheduled, prefillCandidate, theme }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState(1); // 1=Date, 2=Time+Details, 3=Confirm
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    candidateName: prefillCandidate?.name  || "",
    position:      prefillCandidate?.position || "",
    date:          "",
    time:          "",
    duration:      60,
    platform:      "Google Meet",
    meetingLink:   "",
    interviewerName: "",
    notes:         "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const result = await scheduleInterview(form);
      onScheduled(result.interview);
      showToast("Interview scheduled successfully!", "success");
      onClose();
    } catch (err) {
      showToast(err.message || "Failed to schedule interview", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Step labels
  const steps = ["Select Date", "Interview Details", "Confirm"];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${theme.cardBg} rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto`}>

        {/* Modal Header */}
        <div className={`p-5 border-b ${theme.border} flex items-center justify-between`}>
          <h2 className={`text-lg font-bold ${theme.textPrimary}`}>Schedule Interview</h2>
          <button onClick={onClose} className={`${theme.textMuted} ${theme.hover} p-1 rounded-lg`}>✕</button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center px-5 pt-4 pb-2 gap-2">
          {steps.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                step > i + 1
                  ? "bg-green-500 text-white"
                  : step === i + 1
                  ? "bg-blue-600 text-white"
                  : `${theme.bg} ${theme.textMuted}`
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${step === i + 1 ? theme.textPrimary : theme.textMuted}`}>
                {label}
              </span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px ${step > i + 1 ? "bg-green-500" : theme.border}`} />
              )}
            </div>
          ))}
        </div>

        <div className="p-5 space-y-4">

          {/* ── Step 1: Select Date ── */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Candidate info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-medium ${theme.textMuted} block mb-1`}>Candidate Name *</label>
                  <input
                    value={form.candidateName}
                    onChange={(e) => set("candidateName", e.target.value)}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2 text-sm ${theme.bg} ${theme.border} border rounded-lg ${theme.textPrimary} outline-none`}
                  />
                </div>
                <div>
                  <label className={`text-xs font-medium ${theme.textMuted} block mb-1`}>Position *</label>
                  <input
                    value={form.position}
                    onChange={(e) => set("position", e.target.value)}
                    placeholder="Frontend Developer"
                    className={`w-full px-3 py-2 text-sm ${theme.bg} ${theme.border} border rounded-lg ${theme.textPrimary} outline-none`}
                  />
                </div>
              </div>

              {/* Calendar */}
              <div>
                <label className={`text-xs font-medium ${theme.textMuted} block mb-2`}>Select Date *</label>
                <Calendar
                  selectedDate={form.date}
                  onSelectDate={(d) => set("date", d)}
                  bookedDates={[]}
                  theme={theme}
                />
              </div>

              <button
                disabled={!form.date || !form.candidateName || !form.position}
                onClick={() => setStep(2)}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Next: Choose Time →
              </button>
            </div>
          )}

          {/* ── Step 2: Time & Details ── */}
          {step === 2 && (
            <div className="space-y-4">
              <p className={`text-sm ${theme.textSecondary}`}>
                📅 Selected: <strong className={theme.textPrimary}>{form.date}</strong>
              </p>

              {/* Time slots */}
              <div>
                <label className={`text-xs font-medium ${theme.textMuted} block mb-2`}>Select Time Slot *</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => set("time", slot)}
                      className={`py-2 px-2 text-xs rounded-lg border transition-colors ${
                        form.time === slot
                          ? "bg-blue-600 text-white border-blue-600"
                          : `${theme.bg} ${theme.border} ${theme.textSecondary} ${theme.hover}`
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className={`text-xs font-medium ${theme.textMuted} block mb-2`}>Duration</label>
                <div className="flex gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => set("duration", d.value)}
                      className={`flex-1 py-2 text-xs rounded-lg border transition-colors ${
                        form.duration === d.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : `${theme.bg} ${theme.border} ${theme.textSecondary} ${theme.hover}`
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-medium ${theme.textMuted} block mb-1`}>Platform</label>
                  <select
                    value={form.platform}
                    onChange={(e) => set("platform", e.target.value)}
                    className={`w-full px-3 py-2 text-sm ${theme.bg} ${theme.border} border rounded-lg ${theme.textPrimary} outline-none`}
                  >
                    {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs font-medium ${theme.textMuted} block mb-1`}>Interviewer</label>
                  <input
                    value={form.interviewerName}
                    onChange={(e) => set("interviewerName", e.target.value)}
                    placeholder="HR Team"
                    className={`w-full px-3 py-2 text-sm ${theme.bg} ${theme.border} border rounded-lg ${theme.textPrimary} outline-none`}
                  />
                </div>
              </div>

              {/* Meeting Link */}
              <div>
                <label className={`text-xs font-medium ${theme.textMuted} block mb-1`}>Meeting Link (optional)</label>
                <input
                  value={form.meetingLink}
                  onChange={(e) => set("meetingLink", e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className={`w-full px-3 py-2 text-sm ${theme.bg} ${theme.border} border rounded-lg ${theme.textPrimary} outline-none`}
                />
              </div>

              {/* Notes */}
              <div>
                <label className={`text-xs font-medium ${theme.textMuted} block mb-1`}>Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Portfolio review, live coding session..."
                  rows={2}
                  className={`w-full px-3 py-2 text-sm ${theme.bg} ${theme.border} border rounded-lg ${theme.textPrimary} outline-none resize-none`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className={`flex-1 py-2.5 ${theme.border} border rounded-lg text-sm ${theme.textSecondary} ${theme.hover}`}
                >
                  ← Back
                </button>
                <button
                  disabled={!form.time}
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Review →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Confirm ── */}
          {step === 3 && (
            <div className="space-y-4">
              <div className={`${theme.bg} rounded-xl p-4 space-y-3`}>
                <h3 className={`font-semibold ${theme.textPrimary} mb-3`}>Interview Summary</h3>
                {[
                  { label: "Candidate", value: form.candidateName },
                  { label: "Position", value: form.position },
                  { label: "Date", value: form.date },
                  { label: "Time", value: form.time },
                  { label: "Duration", value: `${form.duration} minutes` },
                  { label: "Platform", value: form.platform },
                  { label: "Interviewer", value: form.interviewerName || "—" },
                  { label: "Meeting Link", value: form.meetingLink || "—" },
                  { label: "Notes", value: form.notes || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className={`text-xs ${theme.textMuted} w-24 flex-shrink-0 pt-0.5`}>{label}</span>
                    <span className={`text-sm ${theme.textPrimary} font-medium break-all`}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className={`flex-1 py-2.5 ${theme.border} border rounded-lg text-sm ${theme.textSecondary} ${theme.hover}`}
                >
                  ← Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 hover:bg-green-700 transition-colors"
                >
                  {submitting ? "Scheduling..." : "✅ Confirm Interview"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────
const InterviewScheduler = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  const [interviews, setInterviews]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [updatingId, setUpdatingId]   = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadInterviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchInterviews();
      setInterviews(data);
    } catch (err) {
      setError(err.message || "Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadInterviews(); }, []);

  // Dates that have at least one interview — used for calendar dots
  const bookedDates = interviews.map((i) => i.date);

  // Interviews on the selected calendar date
  const dayInterviews = selectedDate
    ? interviews.filter((i) => i.date === selectedDate)
    : [];

  // All interviews filtered by status tab
  const filtered = statusFilter === "all"
    ? interviews
    : interviews.filter((i) => i.status.toLowerCase() === statusFilter);

  // Status counts
  const counts = {
    all:       interviews.length,
    scheduled: interviews.filter((i) => i.status === "Scheduled").length,
    confirmed: interviews.filter((i) => i.status === "Confirmed").length,
    completed: interviews.filter((i) => i.status === "Completed").length,
    cancelled: interviews.filter((i) => i.status === "Cancelled").length,
  };

  // Handle status update with optimistic UI
  const handleStatusUpdate = useCallback(async (interviewId, newStatus) => {
    const original = interviews;
    try {
      setUpdatingId(interviewId);
      setInterviews((prev) =>
        prev.map((i) => i.id === interviewId ? { ...i, status: newStatus } : i)
      );
      await updateInterviewStatus(interviewId, newStatus);
      showToast(`Interview ${newStatus.toLowerCase()}`, "success");
      addNotification(
        NOTIF_TYPES.STATUS_UPDATE,
        "Interview Status Updated",
        `Interview status changed to ${newStatus}.`
      );
    } catch (err) {
      setInterviews(original);
      showToast("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  }, [interviews, showToast, addNotification]);

  // Add newly scheduled interview to state
  const handleScheduled = (interview) => {
    setInterviews((prev) => [interview, ...prev]);
    addNotification(
      NOTIF_TYPES.SUCCESS,
      "Interview Scheduled",
      `Interview with ${interview.candidateName} on ${interview.date} at ${interview.time}.`
    );
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader size="lg" /></div>;
  if (error)   return <ApiError message={error} onRetry={loadInterviews} />;

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <Sidebar />

      {/* Schedule modal */}
      {showModal && (
        <ScheduleModal
          onClose={() => setShowModal(false)}
          onScheduled={handleScheduled}
          prefillCandidate={null}
          theme={theme}
        />
      )}

      {/* Page Header */}
      <div className={`${theme.cardBg} p-4 sm:p-6 rounded-xl ${theme.border} border`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.textPrimary}`}>
              Interview Scheduler
            </h1>
            <p className={`${theme.textSecondary} mt-1 text-sm`}>
              Manage and schedule candidate interviews
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            + Schedule Interview
          </button>
        </div>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Scheduled", count: counts.scheduled, color: "text-blue-500",  bg: theme.infoBg },
          { label: "Confirmed", count: counts.confirmed, color: "text-green-500", bg: theme.successBg },
          { label: "Completed", count: counts.completed, color: theme.textMuted,  bg: theme.bg },
          { label: "Cancelled", count: counts.cancelled, color: "text-red-500",   bg: theme.dangerBg },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`${theme.cardBg} ${theme.border} border rounded-xl p-4 text-center`}>
            <p className={`text-xs ${theme.textMuted}`}>{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{count}</p>
          </div>
        ))}
      </div>

      {/* Calendar + Day view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Calendar */}
        <div className="lg:col-span-1">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            bookedDates={bookedDates}
            theme={theme}
          />

          {/* Day panel — shows when a date is selected */}
          {selectedDate && (
            <div className={`mt-4 ${theme.cardBg} rounded-xl ${theme.border} border p-4`}>
              <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-3`}>
                📅 {selectedDate}
              </h3>
              {dayInterviews.length === 0 ? (
                <div className="text-center py-4">
                  <p className={`text-sm ${theme.textMuted}`}>No interviews</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-2 text-xs text-blue-500 hover:underline"
                  >
                    + Schedule one
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {dayInterviews.map((iv) => (
                    <div key={iv.id} className={`p-3 ${theme.bg} rounded-lg`}>
                      <p className={`text-sm font-medium ${theme.textPrimary}`}>{iv.candidateName}</p>
                      <p className={`text-xs ${theme.textMuted}`}>{iv.time} · {iv.duration}min · {iv.platform}</p>
                      <div className="mt-1">
                        <StatusBadge status={iv.status} theme={theme} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interview list */}
        <div className="lg:col-span-2 space-y-4">

          {/* Status filter tabs */}
          <div className={`${theme.cardBg} p-3 rounded-xl ${theme.border} border`}>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "all",       label: `All (${counts.all})` },
                { key: "scheduled", label: `Scheduled (${counts.scheduled})` },
                { key: "confirmed", label: `Confirmed (${counts.confirmed})` },
                { key: "completed", label: `Completed (${counts.completed})` },
                { key: "cancelled", label: `Cancelled (${counts.cancelled})` },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === key
                      ? "bg-blue-600 text-white"
                      : `${theme.bg} ${theme.textSecondary} ${theme.hover}`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Interview cards */}
          {filtered.map((iv) => (
            <div
              key={iv.id}
              className={`${theme.cardBg} rounded-xl ${theme.border} border p-4 sm:p-5 transition-all ${
                updatingId === iv.id ? "opacity-60" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Left — candidate info */}
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-11 h-11 ${theme.infoBg} rounded-full flex items-center justify-center ${theme.infoText} font-bold text-base flex-shrink-0`}>
                    {iv.candidateName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className={`font-semibold ${theme.textPrimary} text-sm`}>{iv.candidateName}</h3>
                      <StatusBadge status={iv.status} theme={theme} />
                    </div>
                    <p className={`text-xs ${theme.textSecondary} mb-2`}>{iv.position}</p>
                    <div className={`grid grid-cols-2 gap-1 text-xs ${theme.textMuted}`}>
                      <span>📅 {iv.date}</span>
                      <span>🕐 {iv.time}</span>
                      <span>⏱ {iv.duration} min</span>
                      <span>💻 {iv.platform}</span>
                      {iv.interviewerName && <span className="col-span-2">👤 {iv.interviewerName}</span>}
                      {iv.notes && <span className="col-span-2">📝 {iv.notes}</span>}
                    </div>
                  </div>
                </div>

                {/* Right — action buttons */}
                <div className="flex flex-row sm:flex-col gap-2 items-start">
                  {iv.meetingLink && (
                    <a
                      href={iv.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Join Meeting
                    </a>
                  )}
                  {iv.status === "Scheduled" && (
                    <button
                      onClick={() => handleStatusUpdate(iv.id, "Confirmed")}
                      disabled={updatingId === iv.id}
                      className={`px-3 py-1.5 ${theme.successText} ${theme.border} border rounded-lg text-xs font-medium ${theme.hover} disabled:opacity-50 whitespace-nowrap`}
                    >
                      Confirm
                    </button>
                  )}
                  {(iv.status === "Scheduled" || iv.status === "Confirmed") && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(iv.id, "Completed")}
                        disabled={updatingId === iv.id}
                        className={`px-3 py-1.5 ${theme.textMuted} ${theme.border} border rounded-lg text-xs font-medium ${theme.hover} disabled:opacity-50 whitespace-nowrap`}
                      >
                        Mark Done
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(iv.id, "Cancelled")}
                        disabled={updatingId === iv.id}
                        className={`px-3 py-1.5 ${theme.dangerText} ${theme.border} border rounded-lg text-xs font-medium ${theme.hover} disabled:opacity-50 whitespace-nowrap`}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className={`${theme.cardBg} p-12 rounded-xl ${theme.border} border text-center`}>
              <div className="text-4xl mb-3">📅</div>
              <p className={`font-medium ${theme.textPrimary} mb-1`}>No interviews found</p>
              <p className={`text-sm ${theme.textMuted} mb-4`}>
                {statusFilter === "all" ? "Schedule your first interview to get started." : `No ${statusFilter} interviews.`}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                + Schedule Interview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
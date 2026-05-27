import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import { SectionErrorBoundary } from "../../components/ErrorBoundary";

// ─── Screen keys ──────────────────────────────────────────
const SCREEN = {
  PERMISSION:   "permission",
  WAITING:      "waiting",
  INSTRUCTIONS: "instructions", // ← NEW (Day 43)
  INTERVIEW:    "interview",
  ENDED:        "ended",
};

// ─── Mock interview data ──────────────────────────────────
// TODO: replace with scheduleService.getUpcomingInterview(user.id)
const MOCK_INTERVIEW = {
  jobTitle:    "MERN Stack Developer",
  company:     "TechCorp Solutions",
  interviewer: "Zecpath AI",
  duration:    30,
  scheduledAt: new Date(Date.now() + 40 * 1000),
};

// ─── Interview rules — shown on InstructionsScreen ────────
const INTERVIEW_RULES = [
  {
    id:   "tabs",
    icon: "🖥️",
    title: "Close unnecessary tabs",
    desc:  "Only this interview tab should be open. Switching tabs will trigger a warning.",
  },
  {
    id:   "apps",
    icon: "💬",
    title: "Close messaging & chat apps",
    desc:  "WhatsApp, Slack, Teams and similar apps must be closed before you start.",
  },
  {
    id:   "camera",
    icon: "📷",
    title: "Keep camera on at all times",
    desc:  "Turning off your camera during the interview will be flagged automatically.",
  },
  {
    id:   "phone",
    icon: "📵",
    title: "Do not use your mobile phone",
    desc:  "Put your phone face-down or in another room for the duration of the interview.",
  },
  {
    id:   "eye",
    icon: "👁️",
    title: "Maintain eye contact with the camera",
    desc:  "Looking away repeatedly will be detected and noted in your interview report.",
  },
  {
    id:   "alone",
    icon: "🚪",
    title: "Be in a quiet, private space",
    desc:  "Ensure you are alone. Multiple faces detected on camera will raise a flag.",
  },
];

// ─── Helpers ──────────────────────────────────────────────
const padTwo = (n) => String(n).padStart(2, "0");

const formatCountdown = (ms) => {
  if (ms <= 0) return "00:00";
  const s = Math.floor(ms / 1000);
  return `${padTwo(Math.floor(s / 60))}:${padTwo(s % 60)}`;
};

const formatElapsed = (sec) =>
  `${padTwo(Math.floor(sec / 60))}:${padTwo(sec % 60)}`;


// ════════════════════════════════════════════════════════
// SHARED — Violation Alert Banner (Day 43)
// Used inside InstructionsScreen (live compliance monitor)
// and InterviewScreen (real-time warnings during interview)
// ════════════════════════════════════════════════════════
const ViolationAlert = ({ violations, onDismiss, theme }) => {
  if (violations.length === 0) return null;

  // Severity: 1 violation = warning, 2 = danger, 3+ = critical
  const severity = violations.length >= 3 ? "critical" : violations.length === 2 ? "danger" : "warning";

  const styles = {
    warning:  { bg: theme.warningBg,  text: theme.warningText,  icon: "⚠️",  label: "Warning" },
    danger:   { bg: theme.dangerBg,   text: theme.dangerText,   icon: "🚨",  label: "Violation Detected" },
    critical: { bg: theme.dangerBg,   text: theme.dangerText,   icon: "🔴",  label: "Critical — Interview at Risk" },
  };

  const s = styles[severity];

  return (
    <div
      className={`${s.bg} ${s.text} ${theme.border} border rounded-xl p-4
                  flex items-start gap-3 animate-fadeIn`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold mb-1">{s.label}</p>
        <ul className="space-y-0.5">
          {violations.map((v) => (
            <li key={v.id} className="text-xs leading-relaxed">
              • {v.message}
            </li>
          ))}
        </ul>
        <p className="text-xs mt-2 opacity-80">
          Repeated violations will be included in your interview report.
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss warning"
          className="flex-shrink-0 text-lg leading-none opacity-60 hover:opacity-100
                     transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
};


// ════════════════════════════════════════════════════════
// SCREEN 1 — Camera & Microphone Permission
// ════════════════════════════════════════════════════════
const PermissionScreen = ({ onGranted, theme }) => {
  const [status, setStatus] = useState("idle");
  const [camOk,  setCamOk]  = useState(false);
  const [micOk,  setMicOk]  = useState(false);
  const streamRef  = useRef(null);
  const previewRef = useRef(null);

  const requestPermissions = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: true,
      });
      streamRef.current = stream;
      if (previewRef.current) previewRef.current.srcObject = stream;
      setCamOk(true);
      setMicOk(true);
      setStatus("granted");
    } catch (err) {
      setStatus(
        err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
          ? "denied"
          : "error"
      );
    }
  };

  const handleContinue = () => onGranted(streamRef.current);

  useEffect(() => {
    return () => {
      if (streamRef.current && status !== "granted") {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [status]);

  const checks = [
    { key: "camera", ok: camOk, icon: "📷", label: "Camera access",      desc: "Required so the AI can see you"  },
    { key: "mic",    ok: micOk, icon: "🎤", label: "Microphone access",   desc: "Required so the AI can hear you" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-8
                       w-full max-w-md shadow-lg`}>

        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full ${theme.infoBg} flex items-center
                           justify-center text-3xl mx-auto mb-4`}>
            🎥
          </div>
          <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Before we begin</h2>
          <p className={`text-sm ${theme.textSecondary} mt-2 leading-relaxed`}>
            Zecpath AI needs camera and microphone access for your{" "}
            <span className={`font-semibold ${theme.textPrimary}`}>{MOCK_INTERVIEW.jobTitle}</span>{" "}
            interview at{" "}
            <span className={`font-semibold ${theme.textPrimary}`}>{MOCK_INTERVIEW.company}</span>.
          </p>
        </div>

        {status === "granted" && (
          <div className="relative rounded-xl overflow-hidden mb-5 aspect-video bg-black">
            <video ref={previewRef} autoPlay muted playsInline
                   className="w-full h-full object-cover scale-x-[-1]" />
            <span className="absolute bottom-2 left-3 flex items-center gap-1.5
                             text-xs text-white bg-black/50 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Preview
            </span>
          </div>
        )}

        <div className="space-y-3 mb-5">
          {checks.map(({ key, ok, icon, label, desc }) => (
            <div key={key}
                 className={`flex items-center gap-3 p-3 rounded-xl border ${theme.border}
                             ${ok ? theme.successBg : theme.bg}`}>
              <span className="text-xl flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${theme.textPrimary}`}>{label}</p>
                <p className={`text-xs ${theme.textMuted}`}>{desc}</p>
              </div>
              <span className="text-lg flex-shrink-0">{ok ? "✅" : "⏳"}</span>
            </div>
          ))}
        </div>

        {status === "denied" && (
          <div className={`${theme.dangerBg} ${theme.dangerText} ${theme.border}
                           border rounded-xl p-3 text-sm mb-4 flex gap-2`} role="alert">
            <span className="flex-shrink-0">⚠️</span>
            <span>Permission denied. Please allow camera &amp; microphone access in your browser settings and reload.</span>
          </div>
        )}
        {status === "error" && (
          <div className={`${theme.dangerBg} ${theme.dangerText} ${theme.border}
                           border rounded-xl p-3 text-sm mb-4 flex gap-2`} role="alert">
            <span className="flex-shrink-0">❌</span>
            <span>Device error. Check that no other app is using your camera or microphone and try again.</span>
          </div>
        )}

        {status !== "granted" ? (
          <button onClick={requestPermissions} disabled={status === "requesting"}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold
                             text-sm hover:bg-blue-700 transition-colors disabled:opacity-50
                             disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {status === "requesting" ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent
                                 rounded-full animate-spin" aria-hidden="true" />
                Requesting access…
              </>
            ) : "🔒 Allow Camera & Microphone"}
          </button>
        ) : (
          <button onClick={handleContinue}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold
                             text-sm hover:bg-blue-700 transition-colors flex items-center
                             justify-center gap-2">
            Continue to Waiting Room →
          </button>
        )}

        <p className={`text-xs ${theme.textMuted} text-center mt-4`}>
          🔐 Recording begins only when the interview starts. Your data is encrypted end-to-end.
        </p>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════
// SCREEN 2 — Waiting Room
// ════════════════════════════════════════════════════════
const WaitingRoom = ({ stream, onEnter, theme }) => {
  const previewRef              = useRef(null);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff,   setCamOff]   = useState(false);
  const [countdown, setCountdown] = useState(MOCK_INTERVIEW.scheduledAt - Date.now());
  const [interviewReady, setInterviewReady] = useState(false);

  useEffect(() => {
    if (previewRef.current && stream) previewRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    const id = setInterval(() => {
      const remaining = MOCK_INTERVIEW.scheduledAt - Date.now();
      setCountdown(remaining);
      if (remaining <= 0) { clearInterval(id); setInterviewReady(true); }
    }, 500);
    return () => clearInterval(id);
  }, []);

  const toggleMic = () => {
    stream?.getAudioTracks().forEach((t) => { t.enabled = micMuted; });
    setMicMuted((v) => !v);
  };
  const toggleCam = () => {
    stream?.getVideoTracks().forEach((t) => { t.enabled = camOff; });
    setCamOff((v) => !v);
  };

  const checklist = [
    "Find a quiet, well-lit location",
    "Close unnecessary browser tabs",
    "Disable messaging and chat apps",
    "Keep your ID ready if required",
    "Do not use your mobile phone during the session",
    "Maintain eye contact with the camera",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-4`}>
          <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-3`}>📷 Camera Preview</h3>
          <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
            <video ref={previewRef} autoPlay muted playsInline
                   className={`w-full h-full object-cover scale-x-[-1] transition-opacity
                               ${camOff ? "opacity-0" : "opacity-100"}`} />
            {camOff && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-4xl opacity-40">📷</span>
                <p className={`text-sm ${theme.textMuted}`}>Camera off</p>
              </div>
            )}
            <span className={`absolute top-2 left-2 flex items-center gap-1.5 text-xs
                              text-white px-2.5 py-1 rounded-full
                              ${micMuted ? "bg-red-600/80" : "bg-black/50"}`}>
              {micMuted ? "🔇 Muted" : "🎤 Live"}
            </span>
          </div>
          <div className="flex gap-3 mt-4" role="toolbar" aria-label="Media controls">
            <button onClick={toggleMic} aria-label={micMuted ? "Unmute" : "Mute"} aria-pressed={micMuted}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                                border text-sm font-medium transition-colors
                                ${micMuted
                                  ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                                  : `${theme.bg} ${theme.textSecondary} ${theme.border} ${theme.hover}`}`}>
              {micMuted ? "🔇 Unmute" : "🎤 Mute"}
            </button>
            <button onClick={toggleCam} aria-label={camOff ? "Start Video" : "Stop Video"} aria-pressed={camOff}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                                border text-sm font-medium transition-colors
                                ${camOff
                                  ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                                  : `${theme.bg} ${theme.textSecondary} ${theme.border} ${theme.hover}`}`}>
              {camOff ? "📷 Start Video" : "📷 Stop Video"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5`}>
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase
                           tracking-wide ${theme.warningText} ${theme.warningBg} px-3 py-1
                           rounded-full mb-3`}>
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Waiting Room
          </div>
          <h2 className={`text-lg font-bold ${theme.textPrimary}`}>{MOCK_INTERVIEW.jobTitle}</h2>
          <p className={`text-sm ${theme.textSecondary} mt-1`}>{MOCK_INTERVIEW.company}</p>
          <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs ${theme.textMuted}`}>
            <span>🤖 {MOCK_INTERVIEW.interviewer}</span>
            <span>⏱ {MOCK_INTERVIEW.duration} min</span>
          </div>
        </div>

        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5 text-center`}
             aria-live="polite">
          {interviewReady ? (
            <>
              <p className={`text-xs uppercase tracking-wide ${theme.textMuted} mb-1`}>Interview is ready</p>
              <p className={`text-2xl font-bold ${theme.successText}`}>✅ Join now</p>
            </>
          ) : (
            <>
              <p className={`text-xs uppercase tracking-wide ${theme.textMuted} mb-1`}>Interview starts in</p>
              <p className={`text-4xl font-bold tabular-nums ${theme.textPrimary}`}
                 aria-label={`${formatCountdown(countdown)} remaining`}>
                {formatCountdown(countdown)}
              </p>
            </>
          )}
        </div>

        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wide ${theme.textMuted} mb-3`}>
            ✅ Before you join
          </h3>
          <ul className="space-y-2" role="list">
            {checklist.map((item) => (
              <li key={item} className={`flex items-start gap-2 text-sm ${theme.textSecondary}`}>
                <span className={`mt-0.5 text-xs ${theme.successText} flex-shrink-0`}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Now goes to INSTRUCTIONS first, not directly to INTERVIEW */}
        <button onClick={onEnter} disabled={!interviewReady} aria-disabled={!interviewReady}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors
                            flex items-center justify-center gap-2
                            ${interviewReady
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : `${theme.bg} ${theme.textMuted} ${theme.border} border cursor-not-allowed opacity-60`}`}>
          {interviewReady ? "📋 View Interview Instructions →" : "⏳ Waiting for interview to start…"}
        </button>

        <p className={`text-xs ${theme.textMuted} text-center`}>
          This session will be recorded with your prior consent.
        </p>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════
// SCREEN 3 — Instructions & Compliance (NEW — Day 43)
// ════════════════════════════════════════════════════════
const InstructionsScreen = ({ onProceed, theme }) => {
  // Candidate must read for READ_TIME seconds before "I Agree" unlocks
  const READ_TIME = 30;
  const [readTimer,     setReadTimer]     = useState(READ_TIME);
  const [timerRunning,  setTimerRunning]  = useState(true);
  const [allChecked,    setAllChecked]    = useState(false);
  const [checked,       setChecked]       = useState(
    () => Object.fromEntries(INTERVIEW_RULES.map((r) => [r.id, false]))
  );
  // Live compliance monitor — detects tab switches while reading rules
  const [violations,    setViolations]    = useState([]);
  const [totalTabSwitches, setTotalTabSwitches] = useState(0);

  // ── Countdown timer ──────────────────────────────────
  useEffect(() => {
    if (!timerRunning) return;
    if (readTimer <= 0) { setTimerRunning(false); return; }
    const id = setInterval(() => setReadTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning, readTimer]);

  // ── Tab-switch detection ─────────────────────────────
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTotalTabSwitches((n) => {
          const next = n + 1;
          setViolations([{
            id:      "tab-switch",
            message: `Tab switch detected (${next} time${next > 1 ? "s" : ""}) — please stay on this page.`,
          }]);
          return next;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // ── Track whether all rules are checked ─────────────
  useEffect(() => {
    setAllChecked(Object.values(checked).every(Boolean));
  }, [checked]);

  const toggleCheck = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const canProceed = readTimer === 0 && allChecked;

  // Timer colour — green when done, amber mid-way, red when urgent
  const timerColor =
    readTimer === 0       ? theme.successText :
    readTimer <= 10       ? theme.dangerText  :
    readTimer <= 20       ? theme.warningText : theme.textPrimary;

  // Progress arc for the read timer ring
  const RADIUS = 28;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const timerProgress = ((READ_TIME - readTimer) / READ_TIME) * CIRCUMFERENCE;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── Left: rules list ── */}
      <div className="lg:col-span-2 space-y-4">

        {/* Header card */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className={`text-lg font-bold ${theme.textPrimary}`}>
                📋 Interview Instructions
              </h2>
              <p className={`text-sm ${theme.textSecondary} mt-1`}>
                Read all rules carefully and tick each one before you can proceed.
              </p>
            </div>
            {/* Read timer ring */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72"
                     aria-label={readTimer > 0 ? `${readTimer} seconds remaining` : "Ready to proceed"}>
                  {/* Track */}
                  <circle cx="36" cy="36" r={RADIUS} fill="none" strokeWidth="5"
                          className="stroke-gray-200 dark:stroke-gray-700" />
                  {/* Progress */}
                  <circle cx="36" cy="36" r={RADIUS} fill="none" strokeWidth="5"
                          strokeLinecap="round"
                          stroke={readTimer === 0 ? "#22c55e" : readTimer <= 10 ? "#ef4444" : "#3b82f6"}
                          strokeDasharray={CIRCUMFERENCE}
                          strokeDashoffset={CIRCUMFERENCE - timerProgress}
                          style={{ transition: "stroke-dashoffset 0.9s linear" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-sm font-bold tabular-nums ${timerColor}`}>
                    {readTimer > 0 ? readTimer : "✓"}
                  </span>
                </div>
              </div>
              <span className={`text-xs ${theme.textMuted}`}>
                {readTimer > 0 ? "Read timer" : "Timer done"}
              </span>
            </div>
          </div>
        </div>

        {/* Violation alert — shown if tab switched */}
        <ViolationAlert
          violations={violations}
          onDismiss={() => setViolations([])}
          theme={theme}
        />

        {/* Rules checklist */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl overflow-hidden`}>
          {INTERVIEW_RULES.map((rule, i) => (
            <label
              key={rule.id}
              htmlFor={`rule-${rule.id}`}
              className={`flex items-start gap-4 p-4 cursor-pointer transition-colors
                          ${theme.hover}
                          ${i < INTERVIEW_RULES.length - 1 ? `border-b ${theme.border}` : ""}
                          ${checked[rule.id] ? theme.successBg : ""}`}
            >
              {/* Custom checkbox */}
              <div className="flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id={`rule-${rule.id}`}
                  checked={checked[rule.id]}
                  onChange={() => toggleCheck(rule.id)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border-2
                              transition-colors
                              ${checked[rule.id]
                                ? "bg-green-500 border-green-500"
                                : `${theme.border} ${theme.bg}`}`}
                  aria-hidden="true"
                >
                  {checked[rule.id] && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Rule content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base">{rule.icon}</span>
                  <span className={`text-sm font-semibold ${theme.textPrimary}`}>
                    {rule.title}
                  </span>
                </div>
                <p className={`text-xs ${theme.textSecondary} leading-relaxed`}>
                  {rule.desc}
                </p>
              </div>

              {/* Checked tick */}
              {checked[rule.id] && (
                <span className={`flex-shrink-0 text-sm font-semibold ${theme.successText}`}
                      aria-hidden="true">
                  ✓
                </span>
              )}
            </label>
          ))}
        </div>

        {/* Progress bar — how many rules checked */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-medium ${theme.textSecondary}`}>
              Rules acknowledged
            </span>
            <span className={`text-xs font-bold ${allChecked ? theme.successText : theme.textMuted}`}>
              {Object.values(checked).filter(Boolean).length} / {INTERVIEW_RULES.length}
            </span>
          </div>
          <div className={`h-2 ${theme.bg} rounded-full overflow-hidden`}>
            <div
              className={`h-full rounded-full transition-all duration-500
                          ${allChecked ? "bg-green-500" : "bg-blue-500"}`}
              style={{
                width: `${(Object.values(checked).filter(Boolean).length / INTERVIEW_RULES.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Right: status panel + CTA ── */}
      <div className="space-y-4">

        {/* Compliance status card */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5 space-y-4`}>
          <h3 className={`text-sm font-semibold ${theme.textPrimary}`}>
            🛡 Compliance Status
          </h3>

          {/* Checklist items */}
          {[
            {
              label: "Instructions read",
              done:  readTimer === 0,
              pending: `${readTimer}s remaining`,
            },
            {
              label: "All rules acknowledged",
              done:  allChecked,
              pending: `${INTERVIEW_RULES.length - Object.values(checked).filter(Boolean).length} remaining`,
            },
            {
              label: "No tab switches",
              done:  totalTabSwitches === 0,
              pending: `${totalTabSwitches} detected`,
            },
          ].map(({ label, done, pending }) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <span className={`text-xs ${theme.textSecondary}`}>{label}</span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full
                            ${done
                              ? `${theme.successBg} ${theme.successText}`
                              : `${theme.warningBg} ${theme.warningText}`}`}
              >
                {done ? "✓ Done" : pending}
              </span>
            </div>
          ))}
        </div>

        {/* What happens during the interview */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wide
                          ${theme.textMuted} mb-3`}>
            🤖 AI Monitoring
          </h3>
          <ul className="space-y-2">
            {[
              "Eye movement & gaze tracking",
              "Tab switch detection",
              "Camera-off detection",
              "External voice detection",
              "Facial expression analysis",
            ].map((item) => (
              <li key={item}
                  className={`flex items-start gap-2 text-xs ${theme.textSecondary}`}>
                <span className={`${theme.dangerText} flex-shrink-0 mt-0.5`}>•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className={`text-xs ${theme.textMuted} mt-3 leading-relaxed`}>
            Any violations detected will be included in the AI-generated interview report shared with the recruiter.
          </p>
        </div>

        {/* Consent note */}
        <div className={`${theme.warningBg} ${theme.border} border rounded-xl p-3
                         flex gap-2 text-xs ${theme.textSecondary}`}>
          <span className="flex-shrink-0">📝</span>
          <span>
            By clicking "I Agree & Start Interview" you consent to AI monitoring and recording of this session.
          </span>
        </div>

        {/* CTA — locked until timer done + all rules checked */}
        <button
          onClick={onProceed}
          disabled={!canProceed}
          aria-disabled={!canProceed}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors
                      flex items-center justify-center gap-2
                      ${canProceed
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : `${theme.bg} ${theme.textMuted} ${theme.border} border
                           cursor-not-allowed opacity-60`}`}
        >
          {!canProceed ? (
            readTimer > 0
              ? `⏳ Please read instructions (${readTimer}s)`
              : "☑️ Acknowledge all rules to continue"
          ) : (
            "✅ I Agree & Start Interview →"
          )}
        </button>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════
// End Interview Confirmation Modal
// ════════════════════════════════════════════════════════
const EndInterviewModal = ({ onCancel, onConfirm, theme }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
       role="dialog" aria-modal="true" aria-labelledby="end-interview-title">
    <div className={`${theme.cardBg} ${theme.border} border rounded-2xl
                     w-full max-w-sm p-6 text-center space-y-4`}>
      <div className={`w-14 h-14 rounded-full ${theme.dangerBg} flex items-center
                       justify-center text-3xl mx-auto`}>
        📵
      </div>
      <h2 id="end-interview-title" className={`text-lg font-bold ${theme.textPrimary}`}>
        End interview?
      </h2>
      <p className={`text-sm ${theme.textSecondary}`}>
        Are you sure you want to leave? Your responses so far will be saved.
      </p>
      <div className="flex gap-3 pt-1">
        <button onClick={onCancel}
                className={`flex-1 py-2.5 rounded-xl border ${theme.border}
                            ${theme.textSecondary} ${theme.hover} text-sm font-medium transition-colors`}>
          Keep going
        </button>
        <button onClick={onConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm
                           font-medium hover:bg-red-700 transition-colors">
          End interview
        </button>
      </div>
    </div>
  </div>
);


// ════════════════════════════════════════════════════════
// SCREEN 4 — Live Interview
// ════════════════════════════════════════════════════════
const InterviewScreen = ({ stream, onEnd, theme }) => {
  const localRef                    = useRef(null);
  const [micMuted,  setMicMuted]    = useState(false);
  const [camOff,    setCamOff]      = useState(false);
  const [elapsed,   setElapsed]     = useState(0);
  const [showModal, setShowModal]   = useState(false);
  const [speaking,  setSpeaking]    = useState(true);

  // Live violations during the interview
  const [violations,       setViolations]       = useState([]);
  const [totalViolations,  setTotalViolations]  = useState(0);

  useEffect(() => {
    if (localRef.current && stream) localRef.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSpeaking((v) => !v), 3500);
    return () => clearInterval(id);
  }, []);

  // ── Tab-switch detection during live interview ────────
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTotalViolations((n) => {
          const next = n + 1;
          setViolations([{
            id:      "tab-switch",
            message: `Tab switch detected (${next} time${next > 1 ? "s" : ""}). Please return to the interview immediately.`,
          }]);
          return next;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // ── Camera-off violation ──────────────────────────────
  useEffect(() => {
    if (camOff) {
      setViolations((prev) => {
        const alreadyFlagged = prev.some((v) => v.id === "cam-off");
        if (alreadyFlagged) return prev;
        return [...prev, { id: "cam-off", message: "Camera turned off — please re-enable your camera." }];
      });
    } else {
      setViolations((prev) => prev.filter((v) => v.id !== "cam-off"));
    }
  }, [camOff]);

  const toggleMic = () => {
    stream?.getAudioTracks().forEach((t) => { t.enabled = micMuted; });
    setMicMuted((v) => !v);
  };
  const toggleCam = () => {
    stream?.getVideoTracks().forEach((t) => { t.enabled = camOff; });
    setCamOff((v) => !v);
  };

  const handleEndConfirm = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setShowModal(false);
    onEnd(elapsed);
  };

  return (
    <>
      {showModal && (
        <EndInterviewModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleEndConfirm}
          theme={theme}
        />
      )}

      <div className="flex flex-col gap-4 min-h-[75vh]">

        {/* Top status bar */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl px-5 py-3
                         flex items-center justify-between flex-wrap gap-3`} role="banner">
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 text-xs font-bold uppercase
                              tracking-wide ${theme.dangerText} ${theme.dangerBg}
                              px-2.5 py-1 rounded-full`} aria-label="Recording in progress">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC
            </span>
            <div>
              <p className={`text-sm font-semibold ${theme.textPrimary}`}>{MOCK_INTERVIEW.jobTitle}</p>
              <p className={`text-xs ${theme.textMuted}`}>{MOCK_INTERVIEW.company}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-sm font-semibold tabular-nums ${theme.textPrimary}`}
               aria-label={`Elapsed time: ${formatElapsed(elapsed)}`}>
            ⏱ {formatElapsed(elapsed)}
          </div>
          <div className="flex items-center gap-2">
            {/* Violation count badge */}
            {totalViolations > 0 && (
              <span className={`flex items-center gap-1.5 text-xs font-medium
                                ${theme.dangerText} ${theme.dangerBg} px-3 py-1 rounded-full`}>
                🚨 {totalViolations} violation{totalViolations > 1 ? "s" : ""}
              </span>
            )}
            <span className={`flex items-center gap-1.5 text-xs font-medium
                              ${theme.successText} ${theme.successBg} px-3 py-1 rounded-full`}>
              🛡 Integrity On
            </span>
          </div>
        </div>

        {/* Violation alert banner — live during interview */}
        <ViolationAlert
          violations={violations}
          onDismiss={() => setViolations([])}
          theme={theme}
        />

        {/* Video grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

          {/* AI tile */}
          <div className={`lg:col-span-2 ${theme.cardBg} ${theme.border} border rounded-2xl
                           flex flex-col items-center justify-center min-h-[300px]
                           relative overflow-hidden`} aria-label="AI interviewer">
            <div className={`w-28 h-28 rounded-full flex items-center justify-center
                             text-5xl transition-all duration-500
                             ${speaking ? `${theme.successBg} ring-4 ring-green-400/40` : theme.infoBg}`}
                 aria-hidden="true">
              🤖
            </div>
            <p className={`text-sm font-semibold ${theme.textPrimary} mt-4`}>
              {MOCK_INTERVIEW.interviewer}
            </p>
            <span className={`mt-2 flex items-center gap-1.5 text-xs px-3 py-1
                              rounded-full font-medium
                              ${speaking
                                ? `${theme.successBg} ${theme.successText}`
                                : `${theme.bg} ${theme.textMuted}`}`}>
              {speaking ? (
                <><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />Speaking</>
              ) : (
                <><span className="w-2 h-2 rounded-full bg-gray-400" />Listening</>
              )}
            </span>
          </div>

          {/* Self-view */}
          <div className={`${theme.cardBg} ${theme.border} border rounded-2xl
                           flex flex-col overflow-hidden min-h-[200px]`}
               aria-label="Your camera">
            <div className={`px-4 pt-3 pb-2 border-b ${theme.border}`}>
              <p className={`text-xs font-semibold ${theme.textMuted}`}>You</p>
            </div>
            <div className="relative flex-1 bg-black">
              <video ref={localRef} autoPlay muted playsInline
                     className={`w-full h-full object-cover scale-x-[-1] transition-opacity
                                 ${camOff ? "opacity-0" : "opacity-100"}`} />
              {camOff && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="text-3xl opacity-30">📷</span>
                  <p className={`text-xs ${theme.textMuted}`}>Camera off</p>
                </div>
              )}
              {micMuted && (
                <span className="absolute top-2 left-2 flex items-center gap-1 text-xs
                                 bg-red-600/80 text-white px-2 py-0.5 rounded-full"
                      aria-label="Microphone muted">
                  🔇 Muted
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controls bar */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl px-5 py-4
                         flex items-center justify-between flex-wrap gap-4`}
             role="toolbar" aria-label="Interview controls">
          <div className="flex items-center gap-3">
            <button onClick={toggleMic}
                    aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
                    aria-pressed={micMuted}
                    className={`flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl
                                border text-sm font-medium transition-colors
                                ${micMuted
                                  ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                                  : `${theme.bg} ${theme.textSecondary} ${theme.border} ${theme.hover}`}`}>
              <span className="text-lg">{micMuted ? "🔇" : "🎤"}</span>
              <span className="text-xs">{micMuted ? "Unmute" : "Mute"}</span>
            </button>
            <button onClick={toggleCam}
                    aria-label={camOff ? "Turn camera on" : "Turn camera off"}
                    aria-pressed={camOff}
                    className={`flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl
                                border text-sm font-medium transition-colors
                                ${camOff
                                  ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                                  : `${theme.bg} ${theme.textSecondary} ${theme.border} ${theme.hover}`}`}>
              <span className="text-lg">{camOff ? "📷" : "📹"}</span>
              <span className="text-xs">{camOff ? "Start Video" : "Stop Video"}</span>
            </button>
          </div>
          <button onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white
                             rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors"
                  aria-label="End interview">
            📵 End Interview
          </button>
        </div>
      </div>
    </>
  );
};


// ════════════════════════════════════════════════════════
// SCREEN 5 — Interview Ended
// ════════════════════════════════════════════════════════
const EndedScreen = ({ elapsed, theme }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-10
                       w-full max-w-md text-center space-y-4`}>
        <div className={`w-16 h-16 rounded-full ${theme.successBg} flex items-center
                         justify-center text-3xl mx-auto`}>
          ✅
        </div>
        <h2 className={`text-xl font-bold ${theme.textPrimary}`}>Interview Complete!</h2>
        <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>
          Thank you for attending your interview for{" "}
          <span className={`font-semibold ${theme.textPrimary}`}>{MOCK_INTERVIEW.jobTitle}</span>.
          Your responses are being analysed by Zecpath AI. You will receive an update via
          email within 24 hours.
        </p>
        <div className={`flex items-center justify-center gap-2 text-sm ${theme.textMuted}`}>
          <span>⏱ Duration: {formatElapsed(elapsed)}</span>
        </div>
        <button onClick={() => navigate("/app/candidate-dashboard")}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold
                           text-sm hover:bg-blue-700 transition-colors mt-2">
          Back to Dashboard →
        </button>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════
// ROOT — VideoInterview page
// ════════════════════════════════════════════════════════
const VideoInterview = () => {
  const { theme }                 = useTheme();
  const [screen,  setScreen]      = useState(SCREEN.PERMISSION);
  const [stream,  setStream]      = useState(null);
  const [elapsed, setElapsed]     = useState(0);

  const handlePermissionGranted   = (mediaStream) => { setStream(mediaStream); setScreen(SCREEN.WAITING);      };
  const handleEnterInstructions   = ()             => { setScreen(SCREEN.INSTRUCTIONS);                        };
  const handleProceedToInterview  = ()             => { setScreen(SCREEN.INTERVIEW);                           };
  const handleInterviewEnd        = (sec)          => { setElapsed(sec); setScreen(SCREEN.ENDED);              };

  // Step indicator — now 4 steps
  const steps = [
    { key: SCREEN.PERMISSION,   label: "Permissions",  icon: "🔒" },
    { key: SCREEN.WAITING,      label: "Waiting Room", icon: "⏳" },
    { key: SCREEN.INSTRUCTIONS, label: "Instructions", icon: "📋" },
    { key: SCREEN.INTERVIEW,    label: "Interview",    icon: "🎥" },
  ];
  const stepOrder    = [SCREEN.PERMISSION, SCREEN.WAITING, SCREEN.INSTRUCTIONS, SCREEN.INTERVIEW, SCREEN.ENDED];
  const currentStep  = stepOrder.indexOf(screen);

  return (
    <div className="space-y-6">
      <Sidebar />

      {/* Page header */}
      <div className={`${theme.cardBg} ${theme.border} border rounded-xl p-5`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className={`text-xl font-bold ${theme.textPrimary}`}>🎥 Video Interview</h1>
            <p className={`text-sm ${theme.textMuted} mt-1`}>
              {MOCK_INTERVIEW.jobTitle} · {MOCK_INTERVIEW.company}
            </p>
          </div>

          {/* 4-step indicator */}
          {screen !== SCREEN.ENDED && (
            <div className="flex items-center gap-2 flex-wrap">
              {steps.map((s, i) => {
                const done   = currentStep > i;
                const active = currentStep === i;
                return (
                  <div key={s.key} className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                  text-xs font-medium transition-colors
                                  ${done
                                    ? `${theme.successBg} ${theme.successText}`
                                    : active
                                    ? "bg-blue-600 text-white"
                                    : `${theme.bg} ${theme.textMuted}`}`}
                      aria-current={active ? "step" : undefined}
                    >
                      <span>{done ? "✓" : s.icon}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <span className={`text-xs ${theme.textMuted}`}>›</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Screen content */}
      <SectionErrorBoundary>
        {screen === SCREEN.PERMISSION && (
          <PermissionScreen onGranted={handlePermissionGranted} theme={theme} />
        )}
        {screen === SCREEN.WAITING && (
          <WaitingRoom stream={stream} onEnter={handleEnterInstructions} theme={theme} />
        )}
        {screen === SCREEN.INSTRUCTIONS && (
          <InstructionsScreen onProceed={handleProceedToInterview} theme={theme} />
        )}
        {screen === SCREEN.INTERVIEW && (
          <InterviewScreen stream={stream} onEnd={handleInterviewEnd} theme={theme} />
        )}
        {screen === SCREEN.ENDED && (
          <EndedScreen elapsed={elapsed} theme={theme} />
        )}
      </SectionErrorBoundary>
    </div>
  );
};

export default VideoInterview;
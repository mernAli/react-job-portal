import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Dashboard/Sidebar";
import { SectionErrorBoundary } from "../../components/ErrorBoundary";

// ─── Screen keys ──────────────────────────────────────────
const SCREEN = {
  PERMISSION: "permission",
  WAITING:    "waiting",
  INTERVIEW:  "interview",
  ENDED:      "ended",
};

// ─── Mock interview data ──────────────────────────────────
// TODO: replace with scheduleService.getUpcomingInterview(user.id)
const MOCK_INTERVIEW = {
  jobTitle:    "MERN Stack Developer",
  company:     "TechCorp Solutions",
  interviewer: "Zecpath AI",
  duration:    30, // minutes
  // 2 minutes from now so the countdown demo is visible
  scheduledAt: new Date(Date.now() + 2 * 60 * 1000),
};

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
// SCREEN 1 — Camera & Microphone Permission
// ════════════════════════════════════════════════════════
const PermissionScreen = ({ onGranted, theme }) => {
  const [status, setStatus] = useState("idle");
  // idle | requesting | granted | denied | error
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

  // Pass the live stream forward — don't stop it
  const handleContinue = () => onGranted(streamRef.current);

  // Cleanup only if user never continued
  useEffect(() => {
    return () => {
      if (streamRef.current && status !== "granted") {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [status]);

  const checks = [
    {
      key:  "camera",
      ok:   camOk,
      icon: "📷",
      label: "Camera access",
      desc:  "Required so the AI can see you",
    },
    {
      key:  "mic",
      ok:   micOk,
      icon: "🎤",
      label: "Microphone access",
      desc:  "Required so the AI can hear you",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div
        className={`${theme.cardBg} ${theme.border} border rounded-2xl p-8
                    w-full max-w-md shadow-lg`}
      >
        {/* Icon + heading */}
        <div className="text-center mb-6">
          <div
            className={`w-16 h-16 rounded-full ${theme.infoBg} flex items-center
                        justify-center text-3xl mx-auto mb-4`}
          >
            🎥
          </div>
          <h2 className={`text-xl font-bold ${theme.textPrimary}`}>
            Before we begin
          </h2>
          <p className={`text-sm ${theme.textSecondary} mt-2 leading-relaxed`}>
            Zecpath AI needs camera and microphone access for your{" "}
            <span className={`font-semibold ${theme.textPrimary}`}>
              {MOCK_INTERVIEW.jobTitle}
            </span>{" "}
            interview at{" "}
            <span className={`font-semibold ${theme.textPrimary}`}>
              {MOCK_INTERVIEW.company}
            </span>
            .
          </p>
        </div>

        {/* Live self-preview — shown after grant */}
        {status === "granted" && (
          <div className="relative rounded-xl overflow-hidden mb-5 aspect-video bg-black">
            <video
              ref={previewRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover scale-x-[-1]"
            />
            <span
              className={`absolute bottom-2 left-3 flex items-center gap-1.5
                          text-xs text-white bg-black/50 px-2.5 py-1 rounded-full`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Preview
            </span>
          </div>
        )}

        {/* Permission checklist */}
        <div className="space-y-3 mb-5">
          {checks.map(({ key, ok, icon, label, desc }) => (
            <div
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl border
                          ${theme.border}
                          ${ok ? theme.successBg : theme.bg}`}
            >
              <span className="text-xl flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${theme.textPrimary}`}>
                  {label}
                </p>
                <p className={`text-xs ${theme.textMuted}`}>{desc}</p>
              </div>
              <span className="text-lg flex-shrink-0">
                {ok ? "✅" : "⏳"}
              </span>
            </div>
          ))}
        </div>

        {/* Error banners */}
        {status === "denied" && (
          <div
            className={`${theme.dangerBg} ${theme.dangerText} ${theme.border}
                        border rounded-xl p-3 text-sm mb-4 flex gap-2`}
            role="alert"
          >
            <span className="flex-shrink-0">⚠️</span>
            <span>
              Permission denied. Please allow camera &amp; microphone access
              in your browser settings and reload the page.
            </span>
          </div>
        )}
        {status === "error" && (
          <div
            className={`${theme.dangerBg} ${theme.dangerText} ${theme.border}
                        border rounded-xl p-3 text-sm mb-4 flex gap-2`}
            role="alert"
          >
            <span className="flex-shrink-0">❌</span>
            <span>
              Device error. Check that no other app is using your camera or
              microphone and try again.
            </span>
          </div>
        )}

        {/* CTA */}
        {status !== "granted" ? (
          <button
            onClick={requestPermissions}
            disabled={status === "requesting"}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold
                       text-sm hover:bg-blue-700 transition-colors disabled:opacity-50
                       disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "requesting" ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white border-t-transparent
                             rounded-full animate-spin"
                  aria-hidden="true"
                />
                Requesting access…
              </>
            ) : (
              "🔒 Allow Camera & Microphone"
            )}
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold
                       text-sm hover:bg-blue-700 transition-colors flex items-center
                       justify-center gap-2"
          >
            Continue to Waiting Room →
          </button>
        )}

        {/* Privacy note */}
        <p className={`text-xs ${theme.textMuted} text-center mt-4`}>
          🔐 Recording begins only when the interview starts. Your data is
          encrypted end-to-end.
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
  const [countdown, setCountdown] = useState(
    MOCK_INTERVIEW.scheduledAt - Date.now()
  );
  const [interviewReady, setInterviewReady] = useState(false);

  // Wire stream into preview
  useEffect(() => {
    if (previewRef.current && stream) {
      previewRef.current.srcObject = stream;
    }
  }, [stream]);

  // Live countdown tick
  useEffect(() => {
    const id = setInterval(() => {
      const remaining = MOCK_INTERVIEW.scheduledAt - Date.now();
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        setInterviewReady(true);
      }
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

      {/* ── Left: Self-preview ── */}
      <div className="space-y-4">
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-4`}>
          <h3 className={`text-sm font-semibold ${theme.textPrimary} mb-3`}>
            📷 Camera Preview
          </h3>

          {/* Video */}
          <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
            <video
              ref={previewRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover scale-x-[-1] transition-opacity
                          ${camOff ? "opacity-0" : "opacity-100"}`}
            />
            {camOff && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-4xl opacity-40">📷</span>
                <p className={`text-sm ${theme.textMuted}`}>Camera off</p>
              </div>
            )}

            {/* Mic status chip */}
            <span
              className={`absolute top-2 left-2 flex items-center gap-1.5 text-xs
                          text-white px-2.5 py-1 rounded-full
                          ${micMuted ? "bg-red-600/80" : "bg-black/50"}`}
            >
              {micMuted ? "🔇 Muted" : "🎤 Live"}
            </span>
          </div>

          {/* Mic / Cam toggles */}
          <div
            className="flex gap-3 mt-4"
            role="toolbar"
            aria-label="Media controls"
          >
            <button
              onClick={toggleMic}
              aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
              aria-pressed={micMuted}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5
                          rounded-xl border text-sm font-medium transition-colors
                          ${micMuted
                            ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                            : `${theme.bg} ${theme.textSecondary} ${theme.border} ${theme.hover}`
                          }`}
            >
              {micMuted ? "🔇 Unmute" : "🎤 Mute"}
            </button>
            <button
              onClick={toggleCam}
              aria-label={camOff ? "Turn camera on" : "Turn camera off"}
              aria-pressed={camOff}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5
                          rounded-xl border text-sm font-medium transition-colors
                          ${camOff
                            ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                            : `${theme.bg} ${theme.textSecondary} ${theme.border} ${theme.hover}`
                          }`}
            >
              {camOff ? "📷 Start Video" : "📷 Stop Video"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Right: Info + checklist + join ── */}
      <div className="space-y-4">

        {/* Interview info card */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5`}>
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold
                        uppercase tracking-wide ${theme.warningText}
                        ${theme.warningBg} px-3 py-1 rounded-full mb-3`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Waiting Room
          </div>
          <h2 className={`text-lg font-bold ${theme.textPrimary}`}>
            {MOCK_INTERVIEW.jobTitle}
          </h2>
          <p className={`text-sm ${theme.textSecondary} mt-1`}>
            {MOCK_INTERVIEW.company}
          </p>
          <div
            className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs
                        ${theme.textMuted}`}
          >
            <span>🤖 {MOCK_INTERVIEW.interviewer}</span>
            <span>⏱ {MOCK_INTERVIEW.duration} min</span>
          </div>
        </div>

        {/* Countdown card */}
        <div
          className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5
                      text-center`}
          aria-live="polite"
        >
          {interviewReady ? (
            <>
              <p className={`text-xs uppercase tracking-wide ${theme.textMuted} mb-1`}>
                Interview is ready
              </p>
              <p className={`text-2xl font-bold ${theme.successText}`}>
                ✅ Join now
              </p>
            </>
          ) : (
            <>
              <p className={`text-xs uppercase tracking-wide ${theme.textMuted} mb-1`}>
                Interview starts in
              </p>
              <p
                className={`text-4xl font-bold tabular-nums ${theme.textPrimary}`}
                aria-label={`${formatCountdown(countdown)} remaining`}
              >
                {formatCountdown(countdown)}
              </p>
            </>
          )}
        </div>

        {/* Pre-interview checklist */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-2xl p-5`}>
          <h3
            className={`text-xs font-semibold uppercase tracking-wide
                        ${theme.textMuted} mb-3`}
          >
            ✅ Before you join
          </h3>
          <ul className="space-y-2" role="list">
            {checklist.map((item) => (
              <li
                key={item}
                className={`flex items-start gap-2 text-sm ${theme.textSecondary}`}
              >
                <span className={`mt-0.5 text-xs ${theme.successText} flex-shrink-0`}>
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Join button */}
        <button
          onClick={onEnter}
          disabled={!interviewReady}
          aria-disabled={!interviewReady}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors
                      flex items-center justify-center gap-2
                      ${interviewReady
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : `${theme.bg} ${theme.textMuted} ${theme.border} border
                           cursor-not-allowed opacity-60`
                      }`}
        >
          {interviewReady ? "🎥 Join Interview" : "⏳ Waiting for interview to start…"}
        </button>

        <p className={`text-xs ${theme.textMuted} text-center`}>
          This session will be recorded with your prior consent.
        </p>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════
// End Interview Confirmation Modal
// ════════════════════════════════════════════════════════
const EndInterviewModal = ({ onCancel, onConfirm, theme }) => (
  <div
    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="end-interview-title"
  >
    <div
      className={`${theme.cardBg} ${theme.border} border rounded-2xl
                  w-full max-w-sm p-6 text-center space-y-4`}
    >
      <div
        className={`w-14 h-14 rounded-full ${theme.dangerBg} flex items-center
                    justify-center text-3xl mx-auto`}
      >
        📵
      </div>
      <h2
        id="end-interview-title"
        className={`text-lg font-bold ${theme.textPrimary}`}
      >
        End interview?
      </h2>
      <p className={`text-sm ${theme.textSecondary}`}>
        Are you sure you want to leave? Your responses so far will be saved.
      </p>
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className={`flex-1 py-2.5 rounded-xl border ${theme.border}
                      ${theme.textSecondary} ${theme.hover} text-sm font-medium
                      transition-colors`}
        >
          Keep going
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm
                     font-medium hover:bg-red-700 transition-colors"
        >
          End interview
        </button>
      </div>
    </div>
  </div>
);


// ════════════════════════════════════════════════════════
// SCREEN 3 — Live Interview
// ════════════════════════════════════════════════════════
const InterviewScreen = ({ stream, onEnd, theme }) => {
  const localRef                    = useRef(null);
  const [micMuted,  setMicMuted]    = useState(false);
  const [camOff,    setCamOff]      = useState(false);
  const [elapsed,   setElapsed]     = useState(0);
  const [showModal, setShowModal]   = useState(false);
  // Mock AI speaking state — flips every ~3.5 s
  const [speaking,  setSpeaking]    = useState(true);

  useEffect(() => {
    if (localRef.current && stream) localRef.current.srcObject = stream;
  }, [stream]);

  // Elapsed timer
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Mock AI speaking toggle
  useEffect(() => {
    const id = setInterval(() => setSpeaking((v) => !v), 3500);
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

      {/* Full-height interview layout */}
      <div className="flex flex-col gap-4 min-h-[75vh]">

        {/* ── Top status bar ── */}
        <div
          className={`${theme.cardBg} ${theme.border} border rounded-2xl px-5
                      py-3 flex items-center justify-between flex-wrap gap-3`}
          role="banner"
        >
          {/* Left: rec + job info */}
          <div className="flex items-center gap-3">
            <span
              className={`flex items-center gap-1.5 text-xs font-bold
                          uppercase tracking-wide ${theme.dangerText}
                          ${theme.dangerBg} px-2.5 py-1 rounded-full`}
              aria-label="Recording in progress"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC
            </span>
            <div>
              <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                {MOCK_INTERVIEW.jobTitle}
              </p>
              <p className={`text-xs ${theme.textMuted}`}>
                {MOCK_INTERVIEW.company}
              </p>
            </div>
          </div>

          {/* Centre: elapsed timer */}
          <div
            className={`flex items-center gap-2 text-sm font-semibold
                        tabular-nums ${theme.textPrimary}`}
            aria-label={`Elapsed time: ${formatElapsed(elapsed)}`}
          >
            ⏱ {formatElapsed(elapsed)}
          </div>

          {/* Right: integrity badge */}
          <span
            className={`flex items-center gap-1.5 text-xs font-medium
                        ${theme.successText} ${theme.successBg} px-3 py-1
                        rounded-full`}
          >
            🛡 Integrity On
          </span>
        </div>

        {/* ── Video grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

          {/* AI interviewer — main tile */}
          <div
            className={`lg:col-span-2 ${theme.cardBg} ${theme.border} border
                        rounded-2xl flex flex-col items-center justify-center
                        min-h-[300px] relative overflow-hidden`}
            aria-label="AI interviewer"
          >
            {/* Speaking ring */}
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center
                          text-5xl transition-all duration-500
                          ${speaking
                            ? `${theme.successBg} ring-4 ring-green-400/40`
                            : `${theme.infoBg}`
                          }`}
              aria-hidden="true"
            >
              🤖
            </div>

            <p className={`text-sm font-semibold ${theme.textPrimary} mt-4`}>
              {MOCK_INTERVIEW.interviewer}
            </p>

            {/* Speaking / silent badge */}
            <span
              className={`mt-2 flex items-center gap-1.5 text-xs px-3 py-1
                          rounded-full font-medium
                          ${speaking
                            ? `${theme.successBg} ${theme.successText}`
                            : `${theme.bg} ${theme.textMuted}`
                          }`}
            >
              {speaking ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Speaking
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-gray-400" />
                  Listening
                </>
              )}
            </span>
          </div>

          {/* Candidate self-view */}
          <div
            className={`${theme.cardBg} ${theme.border} border rounded-2xl
                        flex flex-col overflow-hidden min-h-[200px]`}
            aria-label="Your camera"
          >
            <div className={`px-4 pt-3 pb-2 border-b ${theme.border}`}>
              <p className={`text-xs font-semibold ${theme.textMuted}`}>
                You
              </p>
            </div>

            {/* Self video */}
            <div className="relative flex-1 bg-black">
              <video
                ref={localRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover scale-x-[-1]
                            transition-opacity
                            ${camOff ? "opacity-0" : "opacity-100"}`}
              />
              {camOff && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="text-3xl opacity-30">📷</span>
                  <p className={`text-xs ${theme.textMuted}`}>Camera off</p>
                </div>
              )}

              {/* Muted chip */}
              {micMuted && (
                <span
                  className="absolute top-2 left-2 flex items-center gap-1
                             text-xs bg-red-600/80 text-white px-2 py-0.5
                             rounded-full"
                  aria-label="Microphone muted"
                >
                  🔇 Muted
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div
          className={`${theme.cardBg} ${theme.border} border rounded-2xl px-5
                      py-4 flex items-center justify-between flex-wrap gap-4`}
          role="toolbar"
          aria-label="Interview controls"
        >
          {/* Mic + Cam toggles */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMic}
              aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
              aria-pressed={micMuted}
              className={`flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl
                          border text-sm font-medium transition-colors
                          ${micMuted
                            ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                            : `${theme.bg} ${theme.textSecondary} ${theme.border}
                               ${theme.hover}`
                          }`}
            >
              <span className="text-lg">{micMuted ? "🔇" : "🎤"}</span>
              <span className="text-xs">{micMuted ? "Unmute" : "Mute"}</span>
            </button>

            <button
              onClick={toggleCam}
              aria-label={camOff ? "Turn camera on" : "Turn camera off"}
              aria-pressed={camOff}
              className={`flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl
                          border text-sm font-medium transition-colors
                          ${camOff
                            ? `${theme.dangerBg} ${theme.dangerText} ${theme.border}`
                            : `${theme.bg} ${theme.textSecondary} ${theme.border}
                               ${theme.hover}`
                          }`}
            >
              <span className="text-lg">{camOff ? "📷" : "📹"}</span>
              <span className="text-xs">
                {camOff ? "Start Video" : "Stop Video"}
              </span>
            </button>
          </div>

          {/* End interview */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white
                       rounded-xl font-semibold text-sm hover:bg-red-700
                       transition-colors"
            aria-label="End interview"
          >
            📵 End Interview
          </button>
        </div>
      </div>
    </>
  );
};


// ════════════════════════════════════════════════════════
// SCREEN 4 — Interview Ended
// ════════════════════════════════════════════════════════
const EndedScreen = ({ elapsed, theme }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div
        className={`${theme.cardBg} ${theme.border} border rounded-2xl p-10
                    w-full max-w-md text-center space-y-4`}
      >
        <div
          className={`w-16 h-16 rounded-full ${theme.successBg} flex items-center
                      justify-center text-3xl mx-auto`}
        >
          ✅
        </div>
        <h2 className={`text-xl font-bold ${theme.textPrimary}`}>
          Interview Complete!
        </h2>
        <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>
          Thank you for attending your interview for{" "}
          <span className={`font-semibold ${theme.textPrimary}`}>
            {MOCK_INTERVIEW.jobTitle}
          </span>
          . Your responses are being analysed by Zecpath AI. You will receive
          an update via email within 24 hours.
        </p>
        <div
          className={`flex items-center justify-center gap-2 text-sm
                      ${theme.textMuted}`}
        >
          <span>⏱ Duration: {formatElapsed(elapsed)}</span>
        </div>
        <button
          onClick={() => navigate("/app/candidate-dashboard")}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold
                     text-sm hover:bg-blue-700 transition-colors mt-2"
        >
          Back to Dashboard →
        </button>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════
// ROOT — VideoInterview page
// (matches CandidateDashboard / InterviewScheduler structure exactly)
// ════════════════════════════════════════════════════════
const VideoInterview = () => {
  const { theme }   = useTheme();
  const [screen, setScreen]     = useState(SCREEN.PERMISSION);
  const [stream, setStream]     = useState(null);
  const [elapsed, setElapsed]   = useState(0);

  const handlePermissionGranted = (mediaStream) => {
    setStream(mediaStream);
    setScreen(SCREEN.WAITING);
  };

  const handleEnterInterview = () => {
    setScreen(SCREEN.INTERVIEW);
  };

  const handleInterviewEnd = (sec) => {
    setElapsed(sec);
    setScreen(SCREEN.ENDED);
  };

  // Step indicator config
  const steps = [
    { key: SCREEN.PERMISSION, label: "Permissions", icon: "🔒" },
    { key: SCREEN.WAITING,    label: "Waiting Room", icon: "⏳" },
    { key: SCREEN.INTERVIEW,  label: "Interview",    icon: "🎥" },
  ];
  const stepOrder = [SCREEN.PERMISSION, SCREEN.WAITING, SCREEN.INTERVIEW, SCREEN.ENDED];
  const currentStep = stepOrder.indexOf(screen);

  return (
    <div className="space-y-6">
      <Sidebar />

      {/* ── Page header ── */}
      <div className={`${theme.cardBg} ${theme.border} border rounded-xl p-5`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className={`text-xl font-bold ${theme.textPrimary}`}>
              🎥 Video Interview
            </h1>
            <p className={`text-sm ${theme.textMuted} mt-1`}>
              {MOCK_INTERVIEW.jobTitle} · {MOCK_INTERVIEW.company}
            </p>
          </div>

          {/* Step indicator */}
          {screen !== SCREEN.ENDED && (
            <div className="flex items-center gap-2">
              {steps.map((s, i) => {
                const done    = currentStep > i;
                const active  = currentStep === i;
                return (
                  <div key={s.key} className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5
                                  rounded-full text-xs font-medium transition-colors
                                  ${done
                                    ? `${theme.successBg} ${theme.successText}`
                                    : active
                                    ? "bg-blue-600 text-white"
                                    : `${theme.bg} ${theme.textMuted}`
                                  }`}
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

      {/* ── Screen content ── */}
      <SectionErrorBoundary>
        {screen === SCREEN.PERMISSION && (
          <PermissionScreen onGranted={handlePermissionGranted} theme={theme} />
        )}
        {screen === SCREEN.WAITING && (
          <WaitingRoom
            stream={stream}
            onEnter={handleEnterInterview}
            theme={theme}
          />
        )}
        {screen === SCREEN.INTERVIEW && (
          <InterviewScreen
            stream={stream}
            onEnd={handleInterviewEnd}
            theme={theme}
          />
        )}
        {screen === SCREEN.ENDED && (
          <EndedScreen elapsed={elapsed} theme={theme} />
        )}
      </SectionErrorBoundary>
    </div>
  );
};

export default VideoInterview;
import { useEffect, useRef, useCallback } from "react";

// Tracks user activity and triggers logout after inactivity
const useSessionTimeout = ({
  timeoutMinutes = 30,
  onTimeout,
  enabled = true,
}) => {
  const timerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onTimeout?.();
    }, timeoutMinutes * 60 * 1000);
  }, [timeoutMinutes, onTimeout]);

  useEffect(() => {
    if (!enabled) return;

    // Events that count as user activity
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => resetTimer();

    // Start the timer
    resetTimer();

    // Listen for activity
    activityEvents.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true })
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [enabled, resetTimer]);

  // Expose time since last activity (for debugging)
  const getInactiveMinutes = useCallback(() => {
    return Math.floor((Date.now() - lastActivityRef.current) / 60000);
  }, []);

  return { getInactiveMinutes };
};

export default useSessionTimeout;
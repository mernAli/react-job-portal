// useAutoRefresh.js — Runs a callback on a set interval
//
// Usage:
//   useAutoRefresh(loadJobs, 60000); // re-fetch every 60 seconds
//   useAutoRefresh(loadJobs, 60000, isEnabled); // pause when tab hidden

import { useEffect, useRef } from "react";

const useAutoRefresh = (callback, intervalMs = 60000, enabled = true) => {
  // Keep callback in a ref so changing it doesn't restart the interval
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      // Only refresh when the tab is visible — no background polling
      if (document.visibilityState === "visible") {
        callbackRef.current();
      }
    };

    const id = setInterval(tick, intervalMs);

    // Cleanup on unmount or when enabled/intervalMs changes
    return () => clearInterval(id);
  }, [intervalMs, enabled]);
};

export default useAutoRefresh;
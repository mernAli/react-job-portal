import { useState, useEffect, useCallback } from "react";
import { getUserPlan } from "../services/paymentService";
import { useAuth } from "../context/useAuth";

export const FEATURES = {
  // ── Candidate features ──────────────────────────────
  AI_SCORE:             { label: "AI Profile Score",               plans: ["pro", "enterprise"] },
  RESUME_BUILDER:       { label: "Resume Builder",                 plans: ["pro", "enterprise"] },
  SALARY_INSIGHTS:      { label: "Salary Insights",                plans: ["pro", "enterprise"] },
  UNLIMITED_APPLY:      { label: "Unlimited Applications",         plans: ["pro", "enterprise"] },
  APPLICATION_TRACKING: { label: "Advanced Application Tracking",  plans: ["pro", "enterprise"] },
  VIDEO_INTERVIEW:      { label: "AI Video Interview",             plans: ["pro", "enterprise"] },

  // ── Employer features ────────────────────────────────
  FULL_ATS:             { label: "Full ATS Dashboard",             plans: ["pro", "enterprise"] },
  ADVANCED_ANALYTICS:   { label: "Advanced Analytics",             plans: ["pro", "enterprise"] },
  RECRUITER_REVIEW:     { label: "Recruiter Review Dashboard",     plans: ["pro", "enterprise"] },
  AI_INSIGHTS:          { label: "AI Hiring Insights",             plans: ["pro", "enterprise"] },
  PRIORITY_LISTING:     { label: "Priority Job Listing",           plans: ["enterprise"]        },
  INTERVIEW_SCHEDULER:  { label: "Interview Scheduler",            plans: ["pro", "enterprise"] },
};

const useFeatureAccess = () => {
  const { user }                    = useAuth();
  const [userPlan, setUserPlan]     = useState(null);
  const [loading,  setLoading]      = useState(true);

  // fetchPlan is stable — defined with useCallback so the
  // event listener always references the same function instance,
  // making removeEventListener actually work.
  const fetchPlan = useCallback(() => {
    if (!user?.email) {
      setUserPlan("free");
      setLoading(false);
      return;
    }
    getUserPlan(user.email)
      .then((plan) => {
        setUserPlan(plan);
        setLoading(false);
      })
      .catch(() => {
        setUserPlan("free");
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    // Fetch immediately on mount or when user changes
    fetchPlan();

    // Re-fetch the moment saveUserPlan() fires "plan:updated"
    window.addEventListener("plan:updated", fetchPlan);

    // Cleanup — removes the listener AND the stable reference matches
    return () => {
      window.removeEventListener("plan:updated", fetchPlan);
    };
  }, [fetchPlan]); // fetchPlan changes only when user?.id changes

  const hasAccess = (featureKey) => {
    if (!userPlan) return false;
    const feature = FEATURES[featureKey];
    if (!feature) return true;
    return feature.plans.includes(userPlan);
  };

  const requiredPlan = (featureKey) => {
    const feature = FEATURES[featureKey];
    if (!feature) return null;
    return feature.plans[0];
  };

  return { userPlan, loading, hasAccess, requiredPlan };
};

export default useFeatureAccess;
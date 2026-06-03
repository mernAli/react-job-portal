import { useState, useEffect } from "react";
import { getUserPlan } from "../services/paymentService";

// ─── Feature definitions ───────────────────────────────────
// Each key maps to a human-readable label and which plans unlock it.
// Add new features here — components just call hasAccess("feature-key").
//
// Plans:     free | pro | enterprise  (candidate)
//            free | pro | enterprise  (employer)

export const FEATURES = {
  // ── Candidate features ──────────────────────────────────
  AI_SCORE:              { label: "AI Profile Score",          plans: ["pro", "enterprise"] },
  RESUME_BUILDER:        { label: "Resume Builder",            plans: ["pro", "enterprise"] },
  SALARY_INSIGHTS:       { label: "Salary Insights",           plans: ["pro", "enterprise"] },
  UNLIMITED_APPLY:       { label: "Unlimited Applications",    plans: ["pro", "enterprise"] },
  APPLICATION_TRACKING:  { label: "Advanced Application Tracking", plans: ["pro", "enterprise"] },
  VIDEO_INTERVIEW:       { label: "AI Video Interview",        plans: ["pro", "enterprise"] },

  // ── Employer features ───────────────────────────────────
  FULL_ATS:              { label: "Full ATS Dashboard",        plans: ["pro", "enterprise"] },
  ADVANCED_ANALYTICS:    { label: "Advanced Analytics",        plans: ["pro", "enterprise"] },
  RECRUITER_REVIEW:      { label: "Recruiter Review Dashboard", plans: ["pro", "enterprise"] },
  AI_INSIGHTS:           { label: "AI Hiring Insights",        plans: ["pro", "enterprise"] },
  PRIORITY_LISTING:      { label: "Priority Job Listing",      plans: ["enterprise"]        },
  INTERVIEW_SCHEDULER:   { label: "Interview Scheduler",       plans: ["pro", "enterprise"] },
};

// ─── Hook ─────────────────────────────────────────────────
const useFeatureAccess = () => {
  const [userPlan,  setUserPlan]  = useState(null);  // "free" | "pro" | "enterprise"
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    let cancelled = false;
    getUserPlan()
      .then((plan) => { if (!cancelled) { setUserPlan(plan); setLoading(false); } })
      .catch(()    => { if (!cancelled) { setUserPlan("free"); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  // Returns true if the current plan unlocks this feature key
  const hasAccess = (featureKey) => {
    if (!userPlan) return false;
    const feature = FEATURES[featureKey];
    if (!feature) return true; // Unknown feature key — don't gate it
    return feature.plans.includes(userPlan);
  };

  // Convenience — which upgrade is needed for a feature
  const requiredPlan = (featureKey) => {
    const feature = FEATURES[featureKey];
    if (!feature) return null;
    return feature.plans[0]; // Lowest plan that unlocks it
  };

  return { userPlan, loading, hasAccess, requiredPlan };
};

export default useFeatureAccess;
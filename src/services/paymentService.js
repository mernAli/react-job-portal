import api from "./api";

// ─── Plan persistence key ─────────────────────────────────
// Used by getUserPlan() to read the active plan from localStorage.
// Written by saveUserPlan() immediately after a successful payment.
const PLAN_KEY = "zecpath_user_plan";

// ─── NEW (Day 45) ─────────────────────────────────────────
// Saves the purchased plan to localStorage.
// Call this inside PaymentSuccess.jsx right after payment resolves:
//
//   import { saveUserPlan } from "../../services/paymentService";
//   saveUserPlan(plan.name.toLowerCase()); // "pro" | "enterprise"
//
// This makes getUserPlan() return the correct plan instantly on the
// next render, so ALL LockedFeature gates across the app disappear
// without requiring a page reload.
export const saveUserPlan = (planName) => {
  // planName should be "free" | "pro" | "enterprise"
  localStorage.setItem(PLAN_KEY, planName.toLowerCase());
};

// GET /user/plan
// Reads from localStorage first (set on payment success).
// Falls back to "free" if nothing is stored.
// When real backend is ready: uncomment the api.get line.
export const getUserPlan = async () => {
  // const response = await api.get("/user/plan");
  // return response.data.plan;

  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(PLAN_KEY);
      // stored is "pro" or "enterprise" after a successful payment,
      // "free" or null before any payment.
      resolve(stored || "free");
    }, 300);
  });
};
// ──────────────────────────────────────────────────────────

// GET /payments/candidate-plans
export const fetchCandidatePlans = async () => {
  // const response = await api.get("/payments/candidate-plans");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "candidate-free",
          name: "Free",
          price: 0,
          description: "Get started with basic job search features.",
          popular: false,
          cta: "Current Plan",
          features: [
            { text: "Browse job listings",        included: true  },
            { text: "Apply to 5 jobs/month",      included: true  },
            { text: "Basic profile",              included: true  },
            { text: "Unlimited applications",     included: false },
            { text: "AI profile score",           included: false },
            { text: "Resume builder",             included: false },
            { text: "Salary insights",            included: false },
            { text: "Application tracking",       included: false },
            { text: "Priority support",           included: false },
          ],
        },
        {
          id: "candidate-pro",
          name: "Pro",
          price: 19,
          description: "Everything you need to land your dream job.",
          popular: true,
          cta: "Upgrade to Pro",
          features: [
            { text: "Browse job listings",        included: true },
            { text: "Unlimited applications",     included: true },
            { text: "AI profile score",           included: true },
            { text: "Resume builder",             included: true },
            { text: "Salary insights",            included: true },
            { text: "Application tracking",       included: true },
            { text: "AI video interview access",  included: true },
            { text: "Priority support",           included: false },
          ],
        },
        {
          id: "candidate-enterprise",
          name: "Enterprise",
          price: 49,
          description: "Maximum visibility and career acceleration.",
          popular: false,
          cta: "Get Enterprise",
          features: [
            { text: "Everything in Pro",          included: true },
            { text: "Priority job listing",       included: true },
            { text: "Dedicated career coach",     included: true },
            { text: "Custom resume review",       included: true },
            { text: "1-on-1 interview coaching",  included: true },
            { text: "Priority support",           included: true },
          ],
        },
      ]);
    }, 800);
  });
};

// GET /payments/employer-plans
export const fetchEmployerPlans = async () => {
  // const response = await api.get("/payments/employer-plans");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "employer-free",
          name: "Free",
          price: 0,
          description: "Post jobs and find basic candidates.",
          popular: false,
          cta: "Current Plan",
          features: [
            { text: "Post up to 3 jobs",          included: true  },
            { text: "Basic applicant list",       included: true  },
            { text: "Manual screening",           included: true  },
            { text: "Full ATS dashboard",         included: false },
            { text: "AI hiring insights",         included: false },
            { text: "Advanced analytics",         included: false },
            { text: "Interview scheduler",        included: false },
            { text: "Recruiter review dashboard", included: false },
            { text: "Priority listing",           included: false },
          ],
        },
        {
          id: "employer-pro",
          name: "Pro",
          price: 79,
          description: "Professional hiring tools for growing teams.",
          popular: true,
          cta: "Upgrade to Pro",
          features: [
            { text: "Unlimited job posts",        included: true },
            { text: "Full ATS dashboard",         included: true },
            { text: "AI hiring insights",         included: true },
            { text: "Advanced analytics",         included: true },
            { text: "Interview scheduler",        included: true },
            { text: "Recruiter review dashboard", included: true },
            { text: "AI video interviews",        included: true },
            { text: "Priority listing",           included: false },
          ],
        },
        {
          id: "employer-enterprise",
          name: "Enterprise",
          price: 199,
          description: "End-to-end autonomous hiring for large teams.",
          popular: false,
          cta: "Contact Sales",
          features: [
            { text: "Everything in Pro",          included: true },
            { text: "Priority job listing",       included: true },
            { text: "Dedicated account manager",  included: true },
            { text: "Custom AI voice & branding", included: true },
            { text: "SLA & compliance support",   included: true },
            { text: "API access",                 included: true },
          ],
        },
      ]);
    }, 800);
  });
};

// POST /payments/process
export const processPayment = async (paymentData) => {
  // const response = await api.post("/payments/process", paymentData);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cardNumber = paymentData.cardNumber?.replace(/\s/g, "");

      // Decline card simulation
      if (cardNumber === "4000000000000002") {
        reject(new Error("Your card was declined. Please use a different card."));
        return;
      }

      // Success
      resolve({
        success:       true,
        transactionId: `TXN-${Date.now()}`,
        receipt:       `RCP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        amount:        paymentData.amount,
        plan:          paymentData.plan,
        paidAt:        new Date().toISOString(),
      });
    }, 2000);
  });
};
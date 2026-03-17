import api from "./api";

// POST /payments/checkout — process payment
export const processPayment = async (paymentData) => {
  // When real payment gateway is ready (Stripe/Razorpay), uncomment:
  // const response = await api.post("/payments/checkout", paymentData);
  // return response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate card validation
      const { cardNumber } = paymentData;

      // Simulate decline for test card 4000000000000002
      if (cardNumber?.replace(/\s/g, "") === "4000000000000002") {
        reject(new Error("Your card was declined. Please use a different card."));
        return;
      }

      resolve({
        success: true,
        transactionId: `TXN-${Date.now()}`,
        amount: paymentData.amount,
        plan: paymentData.plan,
        paidAt: new Date().toISOString(),
        receipt: `RCP-${Math.floor(Math.random() * 100000)}`,
      });
    }, 2000); // 2 second delay simulates real payment processing
  });
};

// GET /payments/plans/employer
export const fetchEmployerPlans = async () => {
  // const response = await api.get("/payments/plans/employer");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "employer-free",
          name: "Free",
          price: 0,
          period: "forever",
          description: "Perfect for getting started",
          color: "info",
          popular: false,
          features: [
            { text: "3 active job posts", included: true },
            { text: "Basic candidate search", included: true },
            { text: "Email support", included: true },
            { text: "ATS dashboard", included: false },
            { text: "Advanced analytics", included: false },
            { text: "Priority listing", included: false },
            { text: "Bulk messaging", included: false },
          ],
          cta: "Get Started",
        },
        {
          id: "employer-pro",
          name: "Pro",
          price: 49,
          period: "month",
          description: "For growing businesses",
          color: "primary",
          popular: true,
          features: [
            { text: "Unlimited job posts", included: true },
            { text: "Advanced candidate search", included: true },
            { text: "Priority support", included: true },
            { text: "Full ATS dashboard", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Priority listing", included: true },
            { text: "Bulk messaging", included: false },
          ],
          cta: "Get Pro",
        },
        {
          id: "employer-enterprise",
          name: "Enterprise",
          price: 199,
          period: "month",
          description: "For large organizations",
          color: "success",
          popular: false,
          features: [
            { text: "Unlimited job posts", included: true },
            { text: "Advanced candidate search", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "Full ATS dashboard", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Priority listing", included: true },
            { text: "Bulk messaging", included: true },
          ],
          cta: "Contact Sales",
        },
      ]);
    }, 800);
  });
};

// GET /payments/plans/candidate
export const fetchCandidatePlans = async () => {
  // const response = await api.get("/payments/plans/candidate");
  // return response.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "candidate-free",
          name: "Free",
          price: 0,
          period: "forever",
          description: "Start your job search",
          color: "info",
          popular: false,
          features: [
            { text: "Browse all jobs", included: true },
            { text: "Apply to 5 jobs/month", included: true },
            { text: "Basic profile", included: true },
            { text: "Resume builder", included: false },
            { text: "Application tracking", included: false },
            { text: "Salary insights", included: false },
            { text: "Interview preparation", included: false },
          ],
          cta: "Get Started",
        },
        {
          id: "candidate-pro",
          name: "Pro",
          price: 19,
          period: "month",
          description: "Accelerate your career",
          color: "primary",
          popular: true,
          features: [
            { text: "Browse all jobs", included: true },
            { text: "Unlimited applications", included: true },
            { text: "Enhanced profile", included: true },
            { text: "Resume builder", included: true },
            { text: "Application tracking", included: true },
            { text: "Salary insights", included: true },
            { text: "Interview preparation", included: false },
          ],
          cta: "Get Pro",
        },
        {
          id: "candidate-premium",
          name: "Premium",
          price: 39,
          period: "month",
          description: "Your career, supercharged",
          color: "success",
          popular: false,
          features: [
            { text: "Browse all jobs", included: true },
            { text: "Unlimited applications", included: true },
            { text: "Featured profile", included: true },
            { text: "Resume builder", included: true },
            { text: "Application tracking", included: true },
            { text: "Salary insights", included: true },
            { text: "Interview preparation", included: true },
          ],
          cta: "Get Premium",
        },
      ]);
    }, 800);
  });
};
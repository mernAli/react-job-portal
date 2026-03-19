import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../ui/Loader";
import ApiError from "../../ui/ApiError";
import { fetchEmployerPlans } from "../../services/paymentService";

const EmployerPricing
 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billing, setBilling] = useState("monthly"); // monthly | yearly

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEmployerPlans();
      setPlans(data);
    } catch (err) {
      setError(err.message || "Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (plan) => {
    if (plan.price === 0) return 0;
    return billing === "yearly"
      ? Math.floor(plan.price * 0.8) // 20% discount for yearly
      : plan.price;
  };

  const handleSelectPlan = (plan) => {
    if (plan.price === 0) return; // Free plan — no checkout
    if (plan.id === "employer-enterprise") {
      // Enterprise — contact sales
      return;
    }
    navigate("/app/checkout", {
      state: {
        plan: {
          ...plan,
          price: getPrice(plan),
          billing,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <ApiError message={error} onRetry={loadPlans} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border text-center`}>
        <h1 className={`text-3xl font-bold ${theme.textPrimary} mb-3`}>
          Employer Plans
        </h1>
        <p className={`${theme.textSecondary} text-lg max-w-xl mx-auto`}>
          Choose the right plan to find and hire the best talent for your team.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={`text-sm font-medium ${billing === "monthly" ? theme.textPrimary : theme.textMuted}`}>
            Monthly
          </span>
          <button
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              billing === "yearly" ? theme.primary : "bg-gray-300"
            }`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
              billing === "yearly" ? "translate-x-7" : "translate-x-0.5"
            }`} />
          </button>
          <span className={`text-sm font-medium ${billing === "yearly" ? theme.textPrimary : theme.textMuted}`}>
            Yearly
            <span className={`ml-2 px-2 py-0.5 ${theme.successBg} ${theme.successText} text-xs rounded-full`}>
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative ${theme.cardBg} rounded-xl ${theme.border} border p-6 flex flex-col transition-all ${
              plan.popular ? `ring-2 ${theme.primary === "bg-blue-600" ? "ring-blue-500" : "ring-indigo-500"} shadow-lg` : ""
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 ${theme.primary} text-white text-xs font-bold rounded-full`}>
                ★ Most Popular
              </div>
            )}

            {/* Plan Header */}
            <div className="mb-6">
              <h3 className={`text-xl font-bold ${theme.textPrimary} mb-1`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${theme.textMuted} mb-4`}>
                {plan.description}
              </p>
              <div className="flex items-end gap-1">
                <span className={`text-4xl font-bold ${theme.textPrimary}`}>
                  {plan.price === 0 ? "Free" : `$${getPrice(plan)}`}
                </span>
                {plan.price > 0 && (
                  <span className={`text-sm ${theme.textMuted} mb-1`}>
                    /{billing === "yearly" ? "mo, billed yearly" : "month"}
                  </span>
                )}
              </div>
              {plan.price > 0 && billing === "yearly" && (
                <p className={`text-xs ${theme.textMuted} mt-1 line-through`}>
                  ${plan.price}/month
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className={feature.included ? theme.successText : theme.textMuted}>
                    {feature.included ? "✓" : "✗"}
                  </span>
                  <span className={`text-sm ${feature.included ? theme.textSecondary : theme.textMuted}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => handleSelectPlan(plan)}
              className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                plan.popular
                  ? `${theme.primary} text-white ${theme.primaryHover}`
                  : plan.price === 0
                  ? `${theme.border} border ${theme.textPrimary} ${theme.hover}`
                  : `${theme.border} border ${theme.textPrimary} ${theme.hover}`
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Note */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-2`}>
          🔒 Locked features on Free plan
        </h3>
        <p className={`text-sm ${theme.textSecondary} mb-4`}>
          Upgrade to Pro to unlock the full ATS dashboard, advanced analytics, and priority job listing.
        </p>
        <button
          onClick={() => handleSelectPlan(plans.find((p) => p.popular))}
          className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.primaryHover} font-medium text-sm`}
        >
          Upgrade to Pro →
        </button>
      </div>
    </div>
  );
};

export default EmployerPricing;
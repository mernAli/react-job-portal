import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../ui/toast/useToast";
import { processPayment, saveUserPlan } from "../services/paymentService";
import useNotifications from "../context/useNotifications";
import { NOTIF_TYPES } from "../context/NotificationContext";
import Sidebar from "../components/Dashboard/Sidebar";


const Checkout = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;

  const [paymentState, setPaymentState] = useState("idle"); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  // Redirect if no plan selected
  if (!plan) {
    navigate("/app/pricing");
    return null;
  }

  const handleChange = (field, value) => {
    // Format card number with spaces
    if (field === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    // Format expiry MM/YY
    if (field === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    // CVV max 3 digits
    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email is required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Valid 16-digit card number required";
    if (form.expiry.length < 5) newErrors.expiry = "Valid expiry required (MM/YY)";
    if (form.cvv.length < 3) newErrors.cvv = "Valid CVV required";
    if (!form.address.trim()) newErrors.address = "Billing address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setPaymentState("loading");
      setErrorMessage("");

      const result = await processPayment({
        ...form,
        plan: plan.name,
        amount: plan.price,
        billing: plan.billing,
      });

      saveUserPlan(plan.name); // saves "Pro" or "Enterprise" to localStorage


      // Success — navigate to success page
      addNotification(
        NOTIF_TYPES.SUCCESS,
        "Payment Successful 🎉",
        `You are now on the ${plan.name} plan. Transaction ID: ${result.transactionId}`
      );

      showToast(`Payment successful! Welcome to ${plan.name}!`, "success");

      navigate("/app/payment-success", {
        state: { result, plan },
        replace: true, // Prevent going back to checkout after success
      });

    } catch (err) {
      setPaymentState("error");
      setErrorMessage(err.message || "Payment failed. Please try again.");
      showToast(err.message || "Payment failed.", "error");
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 ${theme.border} border rounded-lg ${theme.cardBg} ${theme.textPrimary} text-sm outline-none ${theme.focus} ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <Sidebar />
      {/* Header */}
      <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 ${theme.textMuted} ${theme.hover} mb-4 text-sm`}
        >
          ← Back to Plans
        </button>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Checkout</h1>
        <p className={`${theme.textSecondary} mt-1`}>
          Complete your purchase to activate {plan.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — Checkout Form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personal Info */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={inputClass("fullName")}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass("email")}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Card Info */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
              Card Details
            </h2>
            <p className={`text-xs ${theme.textMuted} mb-4`}>
              💡 Test card: 4242 4242 4242 4242 — Decline: 4000 0000 0000 0002
            </p>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={form.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  className={inputClass("cardNumber")}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) => handleChange("expiry", e.target.value)}
                    className={inputClass("expiry")}
                  />
                  {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    value={form.cvv}
                    onChange={(e) => handleChange("cvv", e.target.value)}
                    className={inputClass("cvv")}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
              Billing Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>Street Address</label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={inputClass("address")}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>City</label>
                  <input
                    type="text"
                    placeholder="New York"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={inputClass("city")}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>ZIP Code</label>
                  <input
                    type="text"
                    placeholder="10001"
                    value={form.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                    className={inputClass("zip")}
                  />
                  {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {paymentState === "error" && (
            <div className={`${theme.dangerBg} ${theme.dangerText} p-4 rounded-xl text-sm`}>
              ❌ {errorMessage}
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="lg:col-span-1">
          <div className={`${theme.cardBg} p-6 rounded-xl ${theme.border} border sticky top-24`}>
            <h2 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
              Order Summary
            </h2>

            {/* Plan Details */}
            <div className={`p-4 ${theme.bg} rounded-lg mb-4`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-semibold ${theme.textPrimary}`}>{plan.name} Plan</span>
                <span className={`font-bold ${theme.textPrimary}`}>${plan.price}/mo</span>
              </div>
              <p className={`text-xs ${theme.textMuted}`}>
                Billed {plan.billing === "yearly" ? "annually" : "monthly"}
              </p>
            </div>

            {/* Features included */}
            <div className="space-y-2 mb-6">
              {plan.features
                ?.filter((f) => f.included)
                .slice(0, 4)
                .map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-sm ${theme.successText}`}>✓</span>
                    <span className={`text-xs ${theme.textSecondary}`}>{feature.text}</span>
                  </div>
                ))}
            </div>

            {/* Total */}
            <div className={`border-t ${theme.border} pt-4 mb-6`}>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm ${theme.textSecondary}`}>Subtotal</span>
                <span className={`text-sm ${theme.textPrimary}`}>${plan.price}.00</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm ${theme.textSecondary}`}>Tax (0%)</span>
                <span className={`text-sm ${theme.textPrimary}`}>$0.00</span>
              </div>
              <div className={`flex justify-between items-center font-bold text-lg mt-3 pt-3 border-t ${theme.border}`}>
                <span className={theme.textPrimary}>Total</span>
                <span className={theme.textPrimary}>${plan.price}.00</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleSubmit}
              disabled={paymentState === "loading"}
              className={`w-full py-4 ${theme.primary} text-white rounded-xl font-bold text-base ${theme.primaryHover} disabled:opacity-60 disabled:cursor-not-allowed transition-all`}
            >
              {paymentState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Pay $${plan.price}.00`
              )}
            </button>

            <p className={`text-xs ${theme.textMuted} text-center mt-3`}>
              🔒 Secured by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
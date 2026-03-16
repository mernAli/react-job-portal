import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/useAuth";
import Sidebar from "../components/Dashboard/Sidebar";

const PaymentSuccess = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { result, plan } = location.state || {};

  // Redirect if accessed directly without payment
  if (!result || !plan) {
    navigate("/app/home");
    return null;
  }

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
        <Sidebar />
      {/* Success Card */}
      <div className={`${theme.cardBg} p-8 rounded-xl ${theme.border} border text-center`}>
        {/* Animated check */}
        <div className={`w-20 h-20 ${theme.successBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <span className="text-4xl">✅</span>
        </div>

        <h1 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>
          Payment Successful!
        </h1>
        <p className={`${theme.textSecondary} text-lg mb-6`}>
          Welcome to <span className="font-semibold">{plan.name}</span>! Your account has been upgraded.
        </p>

        {/* Receipt */}
        <div className={`${theme.bg} rounded-xl p-6 text-left space-y-3 mb-6`}>
          <h3 className={`font-semibold ${theme.textPrimary} mb-4`}>Receipt</h3>
          <div className="flex justify-between">
            <span className={`text-sm ${theme.textMuted}`}>Transaction ID</span>
            <span className={`text-sm font-mono ${theme.textPrimary}`}>{result.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${theme.textMuted}`}>Receipt No.</span>
            <span className={`text-sm font-mono ${theme.textPrimary}`}>{result.receipt}</span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${theme.textMuted}`}>Plan</span>
            <span className={`text-sm ${theme.textPrimary} font-semibold`}>{plan.name}</span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${theme.textMuted}`}>Amount Paid</span>
            <span className={`text-sm font-bold ${theme.successText}`}>${result.amount}.00</span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${theme.textMuted}`}>Billing</span>
            <span className={`text-sm ${theme.textPrimary} capitalize`}>{plan.billing}</span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${theme.textMuted}`}>Date</span>
            <span className={`text-sm ${theme.textPrimary}`}>{formatDate(result.paidAt)}</span>
          </div>
        </div>

        {/* Unlocked Features */}
        <div className={`${theme.successBg} rounded-xl p-4 mb-6 text-left`}>
          <h3 className={`font-semibold ${theme.successText} mb-3`}>
            🎉 Features now unlocked
          </h3>
          <div className="space-y-2">
            {plan.features
              ?.filter((f) => f.included)
              .map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`text-sm ${theme.successText}`}>✓</span>
                  <span className={`text-sm ${theme.successText}`}>{feature.text}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() =>
              navigate(
                user?.role === "employer"
                  ? "/app/employer-dashboard"
                  : "/app/candidate-dashboard"
              )
            }
            className={`px-8 py-3 ${theme.primary} text-white rounded-xl font-semibold ${theme.primaryHover}`}
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/app/home")}
            className={`px-8 py-3 ${theme.border} border ${theme.textPrimary} rounded-xl font-semibold ${theme.hover}`}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
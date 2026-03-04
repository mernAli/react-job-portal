import { useTheme } from "../context/ThemeContext";

const ApiError = ({ message, onRetry }) => {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center p-8 rounded-xl border text-center gap-4"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      {/* Error Icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
        style={{ backgroundColor: theme.danger + "20" }}
      >
        ⚠️
      </div>

      {/* Error Message */}
      <div>
        <h3 className="font-semibold text-lg mb-1">Something went wrong</h3>
        <p className="text-sm opacity-70">{message || "Failed to load data. Please try again."}</p>
      </div>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 rounded-lg font-medium transition-opacity hover:opacity-80"
          style={{
            backgroundColor: theme.primary,
            color: "#fff",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ApiError;
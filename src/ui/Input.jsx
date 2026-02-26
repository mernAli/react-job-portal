import { useTheme } from "../context/ThemeContext";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  rightElement,
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-xs font-medium mb-2 ${theme.textSecondary}`}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} ${theme.focus} text-sm outline-none ${
            rightElement ? "pr-16" : ""
          }`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-4 mb-4">{error}</p>}
    </div>
  );
};

export default Input;

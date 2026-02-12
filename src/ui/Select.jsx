import React from "react";
import { useTheme } from "../context/ThemeContext";

const Select = ({ label, name, value, onChange, options = [], error }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-xs font-medium mb-2 ${theme.textSecondary}`}>
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg ${theme.border} border ${theme.cardBg} ${theme.textPrimary} ${theme.focus} text-sm outline-none`}
      >
        <option value="">Select option</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Select;
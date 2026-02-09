import React from "react";

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium mb-2 text-gray-600">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border bg-amber-200 border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
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

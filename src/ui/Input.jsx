import React from "react";

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
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium mb-2 text-gray-600">
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
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm shadow-lg shadow-gray-900 bg-white text-black"
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

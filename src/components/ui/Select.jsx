import React from "react";

const Select = React.forwardRef(
  ({ label, options = [], error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <select
          ref={ref}
          {...props}
          className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    );
  }
);

export default Select;

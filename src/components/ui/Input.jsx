import React from "react";

const Input = React.forwardRef(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          className={`w-full border px-3 py-2 rounded-lg ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

export default Input;

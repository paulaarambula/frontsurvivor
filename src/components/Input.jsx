import React from "react";

const Input = ({ type, name, required, label, defaultValue, disabled }) => {
  return (
    <div className="mb-3">
      <label htmlFor="" className="text-xs text-gray-100">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        className="rounded-sm h-9 border border-gray-300 w-full mt-2 focus:outline-none pl-2 focus:border-tic-50"
      />
    </div>
  );
};

export default Input;

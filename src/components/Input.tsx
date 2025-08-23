import React from "react";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";

type InputProps = {
  label?: string;
  name: string; // required for react-hook-form
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>; // hook-form register
  rules?: RegisterOptions; // validation rules
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  rules,
  error,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)} // 👈 this replaces value + onChange
        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;

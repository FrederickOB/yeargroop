"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { InputErrorType, TextAreaType, TextInputType } from "@/types";
/**
 * Text input component.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @param {React.ReactNode} props.icon - The icon to display alongside the input field.
 * @param {string} props.error - The error message to display.
 * @returns {JSX.Element} The text input component.
 */

export const TextInput: React.FC<TextInputType> = ({
  label,
  icon,
  error,
  onChange,
  withPassword = false,
  type,
  name,
  id,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label ? (
        <p className="mb-1 text-sm font-bold capitalize">{label}:</p>
      ) : null}
      <div className="relative flex items-center px-3 py-2 font-medium bg-white dark:text-blue-600 border-2 border-black rounded-lg placeholder:font-normal hover:border-blue-800 focus-within:border-blue-800 hover:text-blue-800 focus-within:text-blue-800">
        {icon}
        <input
          className="w-full pl-2 border-none outline-none"
          type={withPassword ? (showPassword ? "text" : "password") : type}
          onChange={onChange}
          name={name}
          id={id}
        />
        {withPassword ? (
          !showPassword ? (
            <EyeIcon
              onClick={() => {
                type = "text";
                setShowPassword(true);
              }}
              className="absolute w-5 h-5 top-3 right-4"
            />
          ) : (
            <EyeSlashIcon
              onClick={() => {
                type = "password";
                setShowPassword(false);
              }}
              className="absolute w-5 h-5 top-3 right-4"
            />
          )
        ) : null}
      </div>{" "}
      {error ? <InputError>{error}</InputError> : null}
    </div>
  );
};

/**
 * Text area component.
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the text area.
 * @param {string} props.error - The error message to display.
 * @returns {JSX.Element} The text area component.
 */
export const TextArea: React.FC<TextAreaType> = ({
  onChange,
  name,
  id,
  label,
  error,
  ...props
}) => {
  return (
    <>
      {label ? (
        <p className="mb-1 text-sm font-bold capitalize">{label}:</p>
      ) : null}
      <div className="flex items-center px-3 py-2 font-medium bg-white border-2 border-black rounded-lg placeholder:font-normal hover:border-blue-800 focus-within:border-blue-800 hover:text-blue-800 focus-within:text-blue-800">
        <textarea
          onChange={onChange}
          name={name}
          id={id}
          className="w-full py-0 pl-2 border-transparent border-none focus:border-transparent focus:ring-0"
          {...props}
        />
      </div>
      {error ? <InputError>{error}</InputError> : null}
    </>
  );
};

/**
 * Input error component.
 * @param {Object} props - The component props.
 * @param {string} props.children - The error message to display.
 * @returns {JSX.Element} The input error component.
 */
export const InputError = ({ children }: InputErrorType) => (
  <p className="mt-1 text-xs text-red-500 bg-white/40 py-0.5 px-2 rounded lg:bg-transparent lg:px-0">
    {children}
  </p>
);

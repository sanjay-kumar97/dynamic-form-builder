import React from "react";

interface LabelProps {
  htmlFor: string;
  label: string;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, label, required }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};

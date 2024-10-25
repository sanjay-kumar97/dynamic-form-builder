import { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full rounded-md border border-gray-300 p-2 leading-normal shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 focus:read-only:border-gray-300 focus:read-only:ring-0 sm:text-sm",
        className
      )}
    />
  );
};

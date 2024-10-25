import { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={twMerge(
        "size-4 text-blue-600 transition duration-150 ease-in-out",
        className
      )}
    />
  );
};

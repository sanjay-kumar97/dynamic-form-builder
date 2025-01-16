import { twMerge } from "tailwind-merge";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: () => void;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  className,
  onChange,
  ...props
}) => {
  return (
    <div className={twMerge("flex items-center cursor-pointer", className)}>
      <div
        className={twMerge(
          "relative inline-block w-10 h-6 rounded-full transition-colors duration-200",
          checked ? "bg-green-500" : "bg-gray-300"
        )}
        onClick={onChange}
      >
        <span
          className={twMerge(
            "absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
            checked ? "translate-x-full" : ""
          )}
        />
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
        {...props}
      />
    </div>
  );
};

import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "bg-white rounded-md border border-slate-200 p-4 shadow",
        className
      )}
    >
      {children}
    </div>
  );
};

import { ReactNode } from "react";

interface ButtonProps {
  isActive?: boolean;
  label: string;
  onClick?: () => void;
  children: ReactNode;
}
export default function Button({ isActive, label, children }: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-4 cursor-pointer ${
        isActive ? "text-blue-500" : "text-colorfontbutton"
      }`}
    >
      {children}
      {label}
    </button>
  );
}

import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "",
  md: "text-14px py-2 px-5",
  lg: "",
};

const variantClasses = {
  default: "bg-blue-200 hover:bg-blue-100 text-white",
  outline:
    "bg-white border-2 border-blue-300 hover:bg-blue-300 text-blue-300 hover:text-white",
};

export const Button: FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { children, variant, size = "md", disabled, onClick, ...rest } = props;

  return (
    <button
      className={cn("min-w-[120px] transition-colors duration-300", {
        [variantClasses.default]: !variant,
        [variantClasses.outline]: variant === "outline",
        [sizeClasses.md]: size === "md",
      })}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

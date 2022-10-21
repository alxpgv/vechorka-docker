import React, { ButtonHTMLAttributes, FC } from "react";
import cn from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "outline" | "filled" | "filled-secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "px-3 py-2 text-14px",
  md: "min-w-[120px] px-5 py-2 text-14px",
  lg: "",
};

const variantClasses = {
  default: "bg-blue-200 hover:bg-blue-100 text-white",
  outline:
    "bg-white border-2 border-blue-300 hover:bg-blue-300 text-blue-300 hover:text-white",
  outlineActive: "border-2 border-blue-300 bg-blue-300 text-white",
  filled:
    "bg-grey-100 text-grey-400 [@media(hover:hover){&:hover}]:text-white [@media(hover:hover){&:hover}]:bg-blue-300",
  filledActive: "bg-blue-300 text-white",
  "filled-secondary": "bg-blue-100 hover:bg-blue-300 text-white",
};

export const Button: FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const {
    children,
    variant,
    size = "md",
    disabled,
    active = false,
    onClick,
    ...rest
  } = props;

  return (
    <button
      className={cn(
        "cursor-pointer select-none transition-colors duration-300",
        {
          [variantClasses.default]: !variant,
          [variantClasses.outline]: variant === "outline" && !active,
          [variantClasses.outlineActive]: variant === "outline" && active,
          [variantClasses.filled]: variant === "filled" && !active,
          [variantClasses.filledActive]: variant === "filled" && active,
          [variantClasses["filled-secondary"]]: variant === "filled-secondary",
          [sizeClasses.md]: size === "md",
          [sizeClasses.sm]: size === "sm",
        }
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

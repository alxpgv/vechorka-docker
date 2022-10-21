import React from "react";
import cn from "clsx";

interface Props {
  variant?: "primary" | "secondary";
  isError?: boolean;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  className?: string;
}

export const InputText = ({
  variant = "primary",
  isError = false,
  errorMessage,
  onChange,
  placeholder = "",
  value = "",
  className,
}: Props) => {
  return (
    <>
      {isError && (
        <span className="absolute -top-3 left-1 bg-white p-0.5 px-1.5 text-10px text-error">
          {errorMessage}
        </span>
      )}
      <input
        className={cn(
          className,
          "border w-full h-full p-2 text-14px",
          variant === "primary"
            ? "border-grey-200 focus:border-blue-300"
            : "border-white bg-grey-450 focus:border-blue-100 text-white",
          {
            "border-error focus:border-error": isError,
          }
        )}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        value={value}
      />
    </>
  );
};

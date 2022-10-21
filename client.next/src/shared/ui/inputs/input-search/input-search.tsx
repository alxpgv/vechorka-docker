import React, { FC, FormEvent, useEffect, useState } from "react";
import cn from "clsx";
import { Icon } from "@/shared/ui/icon";
import router from "next/router";

interface Props {
  defaultValue?: string;
  variant?: "primary" | "secondary";
  onSubmit?: () => void;
}

export const InputSearch: FC<Props> = ({
  defaultValue,
  variant = "primary",
  onSubmit,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateValue = (value: string) => {
    if (value.length < 3) {
      setError("Минимум 3 символа");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (value && validateValue(value)) {
      if (onSubmit) {
        onSubmit();
      }
      router.push(`/search?q=${value}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    defaultValue && setValue(defaultValue);
  }, [defaultValue]);

  return (
    <form className="relative w-full h-full" onSubmit={onSearch} noValidate>
      {error && (
        <span className="absolute -top-3 left-1 bg-white p-0.5 text-10px text-error">
          {error}
        </span>
      )}
      <input
        // ref={refInput}
        className={cn(
          "border w-full h-full p-2 pr-8 text-14px",
          variant === "primary"
            ? "border-grey-200 focus:border-blue-300"
            : "border-white bg-grey-450 focus:border-blue-100 text-white",
          {
            "border border-error": error,
          }
        )}
        onChange={onChange}
        type="text"
        placeholder="Поиск по сайту..."
        value={value}
      />
      <button
        type="submit"
        className="absolute right-0 bottom-0 w-[30px] h-full flex items-center justify-center"
      >
        <Icon
          name="search"
          className={cn(
            "w-[14px] h-[14px]",
            variant === "primary" ? "stroke-blue-300" : "stroke-white"
          )}
        />
      </button>
    </form>
  );
};

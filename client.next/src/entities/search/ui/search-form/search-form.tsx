import React, { FormEvent, useEffect, useState } from "react";
import cn from "clsx";
import { Icon } from "@/shared/ui/icon";
import router from "next/router";
import { InputText } from "@/shared/ui/inputs";

interface Props {
  defaultValue?: string;
  variant?: "primary" | "secondary";
  onSubmit?: () => void;
}

export const SearchForm = ({
  defaultValue,
  variant = "primary",
  onSubmit,
}: Props) => {
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
      <InputText
        variant={variant}
        onChange={onChange}
        placeholder="Поиск по сайту..."
        value={value}
        isError={Boolean(error)}
        errorMessage={error}
        className="pr-8"
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

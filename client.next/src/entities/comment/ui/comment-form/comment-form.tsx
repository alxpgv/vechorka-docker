import React, { FormEvent, useState } from "react";
import { InputText } from "@/shared/ui/inputs";
import cn from "clsx";
import { Button } from "@/shared/ui/buttons";

interface Props {
  postId: number;
}

export const CommentForm = ({ postId }: Props) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (field: string, value: string) => {
    const _value = value.trim();
    let validate = false;

    if (field === "name") {
      if (_value.length < 3) {
        setErrors((prev) => ({ ...prev, name: "Минимум 3 символа" }));
      } else {
        const { name, ...removedError } = errors;
        setErrors(removedError);
        validate = true;
      }
    }

    if (field === "content") {
      if (_value.length < 3) {
        setErrors((prev) => ({ ...prev, content: "Минимум 3 символа" }));
      } else {
        const { content, ...removedError } = errors;
        setErrors(removedError);
        validate = true;
      }
    }

    return validate;
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validate("name", e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    validate("content", e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validateName = validate("name", name);
    const validateContent = validate("content", content);

    if (validateName && validateContent) {
      console.log("okkkkk");
    } else {
      console.log("errrrrr");
    }
  };

  // console.log(errors);

  return (
    <form className="bg-grey-100 p-5" onSubmit={onSubmit} noValidate>
      <div className="relative h-[40px] w-full sm:w-[300px]">
        <InputText
          value={name}
          placeholder="Имя"
          onChange={onChangeName}
          isError={Boolean(errors.name)}
          errorMessage={errors.name ?? ""}
        />
      </div>
      <div className="relative mt-3">
        {Boolean(errors.content) && (
          <span className="absolute -top-3 left-1 bg-white p-0.5 px-1.5 text-10px text-error">
            {errors.content}
          </span>
        )}
        <textarea
          className={cn(
            "border w-full h-full max-h-[300px] p-2 text-14px border-grey-200 focus:border-blue-300 outline-none",
            {
              "border-error focus:border-error": Boolean(errors.content),
            }
          )}
          rows={4}
          placeholder="Комментарий"
          onChange={onChangeContent}
        />
      </div>
      <div className="mt-1">
        <Button type="submit" variant="filled-secondary" size="md">
          Добавить комментарий
        </Button>
      </div>
    </form>
  );
};

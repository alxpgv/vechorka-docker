import React, { FormEvent, useState } from "react";
import { InputText } from "@/shared/ui/inputs";
import cn from "clsx";
import { Button } from "@/shared/ui/buttons";

interface Props {
  postId: number;
}

export const CommentForm = ({ postId }: Props) => {
  const [name, setName] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="bg-grey-100 p-5" onSubmit={onSubmit} noValidate>
      <div className="relative h-[40px] w-full sm:w-[300px]">
        <InputText value={name} placeholder="Имя" onChange={onChangeName} />
      </div>
      <div className="relative mt-3">
        <textarea
          className={cn(
            "border w-full h-full max-h-[300px] p-2 text-14px border-grey-200 focus:border-blue-300 outline-none"
            // {
            //   "border-error focus:border-error": isError,
            // }
          )}
          rows={4}
          placeholder="Комментарий"
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

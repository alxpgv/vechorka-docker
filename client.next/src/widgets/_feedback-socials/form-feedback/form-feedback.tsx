import React, { FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export const FormFeedback = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("feedback submit");
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[480px] h-full mx-auto text-center">
      <h3 className="mb-5 text-white">Связаться с редакцией газеты</h3>

      <form className="relative w-full" onSubmit={onSubmit} noValidate>
        <input
          type="email"
          className="w-full border-2 border-grey-500 focus:border-blue-100 p-2.5 pr-[134px]"
          placeholder="Электронная почта"
        />
        <div className="absolute w-[120px] right-1.5 top-0 bottom-0 flex items-center">
          <Button type="submit">Отправить</Button>
        </div>
      </form>

      <p className="mt-3 text-white text-14px">
        Заполняя форму, вы даете согласие на{" "}
        <Link href="/user-agreement">
          <a className="link-light underline">обработку персональных данных</a>
        </Link>{" "}
        и{" "}
        <Link href="/privacy-policy">
          <a className="link-light underline">политику конфиденциальности</a>
        </Link>
      </p>
    </div>
  );
};

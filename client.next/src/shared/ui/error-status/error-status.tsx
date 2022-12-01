import React from "react";
import { Button } from "@/shared/ui/buttons";
import router from "next/router";

export const ErrorStatus = ({ statusCode }: { statusCode?: number }) => {
  let message = "";

  if (statusCode === 404) {
    message =
      "По вашему запросу ничего не найдено. Возможно, вы перешли по ссылке, в которой была допущена ошибка, или ресурс был удален.";
  } else {
    message = "Что-то пошло не так";
  }

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-grey-500">{statusCode}</h1>
        <div className="ml-5">{message}</div>
      </div>
      {/*<div className="mt-5 text-center md:text-left">*/}
      {/*  <Button*/}
      {/*    size="md"*/}
      {/*    variant="filled-secondary"*/}
      {/*    onClick={() => router.push("/")}*/}
      {/*  >*/}
      {/*    На главную*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};

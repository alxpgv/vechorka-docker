import React from "react";

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
    </div>
  );
};

import React, { FormEvent, useState } from "react";
import { InputText } from "@/shared/ui/inputs";
import cn from "clsx";
import { Button } from "@/shared/ui/buttons";
import { createComment } from "@/shared/api/comments";

interface Props {
  postId: number;
}

export const CommentForm = ({ postId }: Props) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [sendingErrors, setSendingErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const [status, setStatus] = useState<
    "intl" | "sending" | "success" | "error"
  >("intl");

  const validate = (field: string, value: string) => {
    const _value = value.trim();
    let validate = false;

    if (field === "author") {
      if (_value.length < 3) {
        setErrors((prev) => ({ ...prev, author: "Минимум 3 символа" }));
      } else {
        const { author, ...removedError } = errors;
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

  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    validate("author", e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    validate("content", e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validateAuthor = validate("author", author);
    const validateContent = validate("content", content);

    if (validateAuthor && validateContent) {
      const addComment = async () => {
        setStatus("sending");
        try {
          const comment = await createComment({
            postId,
            author,
            content,
          });
          setStatus("success");
          setAuthor("");
          setContent("");
        } catch (error: any) {
          console.log("post comment", error);
          setStatus("error");
          const errorMessage =
            typeof error?.message === "object"
              ? error.message
              : {
                  server:
                    "Произошла ошибка при отправке, повторите запрос поздее или сообщите нам",
                };
          setSendingErrors(errorMessage);
        }
      };
      addComment();
    }
  };

  const StatusSending = () => {
    if (status === "success") {
      return (
        <div className="mt-3 text-success text-14px">
          <strong>
            Ваш комментарий успешно отправлен, после проверки модератором он
            будет опубликован
          </strong>
        </div>
      );
    }

    if (status === "error") {
      const errors = Object.entries(sendingErrors);
      return (
        <div className="mt-3 text-error text-14px">
          {errors.map(([key, value], index) => (
            <div key={index} className="mt-1">
              <strong>{key}</strong>: <span>{value}</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <form className="bg-grey-100 p-5" onSubmit={onSubmit} noValidate>
      <div className="relative h-[40px] w-full sm:w-[300px]">
        <InputText
          value={author}
          placeholder="Имя"
          onChange={onChangeAuthor}
          isError={Boolean(errors.author)}
          errorMessage={errors.author ?? ""}
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
          value={content}
        />
      </div>
      <div className="mt-1">
        <Button
          type="submit"
          variant="filled-secondary"
          size="md"
          disabled={status === "sending"}
        >
          Добавить комментарий
        </Button>
      </div>
      <StatusSending />
    </form>
  );
};

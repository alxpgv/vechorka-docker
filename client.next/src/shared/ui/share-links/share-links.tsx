import React from "react";
import { Button } from "@/shared/ui/buttons";
import router from "next/router";

interface Props {
  url: string;
  text: string;
  customers: Array<"vk" | "ok" | "whatsapp" | "telegram">;
}

export const ShareLinks = ({ url, text = "", customers }: Props) => {
  const encodedUrl = encodeURI(url);
  const encodedText = encodeURIComponent(text);

  if (!customers?.length || !url) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-bold">Поделиться:</span>
      {customers.map((customer, index) => {
        switch (customer) {
          case "vk":
            return (
              <Button
                key={index}
                variant="filled-secondary"
                size="sm"
                onClick={() =>
                  router.push(`https://vk.com/share.php?url=${encodedUrl}`)
                }
              >
                Вконтакте
              </Button>
            );
          case "ok":
            return (
              <Button
                key={index}
                variant="filled-secondary"
                size="sm"
                onClick={() =>
                  router.push(
                    `https://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=${encodedUrl}&st.comments=${encodedText}`
                  )
                }
              >
                Одноклассники
              </Button>
            );
          case "whatsapp":
            return (
              <Button
                key={index}
                variant="filled-secondary"
                size="sm"
                onClick={() =>
                  router.push(
                    `https://api.whatsapp.com/send?text=${encodedUrl}`
                  )
                }
              >
                Whatsapp
              </Button>
            );
          case "telegram":
            return (
              <Button
                key={index}
                variant="filled-secondary"
                size="sm"
                onClick={() =>
                  router.push(
                    `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
                  )
                }
              >
                Telegram
              </Button>
            );
        }
      })}
    </div>
  );
};

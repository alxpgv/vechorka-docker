import React from "react";
import { Button } from "@/shared/ui/buttons";
import router from "next/router";

interface Props {
  url: string;
  title?: string;
  text: string;
  imageUrl?: string;
  customers: Array<"vk" | "ok" | "whatsapp" | "telegram">;
}

export const ShareLinks = ({
  url,
  title = "",
  text = "",
  imageUrl,
  customers,
}: Props) => {
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
            //https://connect.ok.ru/offer?url=URL_TO_SHARE&title=TITLE&imageUrl=IMAGE_URL
            title = title ? `&title=${title}` : "";
            imageUrl = imageUrl ? `&imageUrl=${imageUrl}` : "";
            return (
              <Button
                key={index}
                variant="filled-secondary"
                size="sm"
                onClick={() =>
                  router.push(
                    `https://connect.ok.ru/offer?url=${encodedUrl}${title}${imageUrl}`
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

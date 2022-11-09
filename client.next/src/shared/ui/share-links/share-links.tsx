import React from "react";
import { Button } from "@/shared/ui/buttons";
import router from "next/router";
import { Icon } from "@/shared/ui/icon";

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
                <div className="flex">
                  <Icon
                    name="vk"
                    className="w-[18px] h-[18px] mr-2 fill-white"
                  />
                  Вконтакте
                </div>
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
                <div className="flex">
                  <Icon
                    name="ok"
                    className="w-[18px] h-[18px] mr-2 fill-white"
                  />
                  Одноклассники
                </div>
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
                <div className="flex">
                  <Icon
                    name="whatsapp"
                    className="w-[18px] h-[18px] mr-2 fill-white"
                  />
                  Whatsapp
                </div>
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
                <div className="flex">
                  <Icon
                    name="telegram"
                    className="w-[18px] h-[18px] mr-2 fill-white"
                  />
                  Telegram
                </div>
              </Button>
            );
        }
      })}
    </div>
  );
};

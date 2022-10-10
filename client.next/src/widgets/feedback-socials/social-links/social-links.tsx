import React from "react";
import { useSettings } from "@/app/contexts/settings-context";
import { Icon } from "@/shared/ui/icon";
import cn from "clsx";

interface SocialLinkProps {
  href: string;
  label: string;
  name: string;
}

export const SocialLinks = () => {
  const settings = useSettings();
  const socials: SocialLinkProps[] = settings?.contacts?.socials;
  if (!socials || socials.length === 0) return null;
  return (
    <>
      <h4 className="mb-5">Мы в социальных сетях</h4>
      {socials.map(({ name, href, label }, index) => (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noreferrer noopener nofollow"
          className={cn(
            "flex items-center w-full mb-2 py-2.5 px-3 text-14px font-bold link-light rounded-2xl bg-opacity-80 hover:bg-opacity-100",
            {
              "bg-ok": name === "ok",
              "bg-vk": name === "vk",
              "bg-telegram": name === "telegram",
              "bg-youtube": name === "youtube",
              "bg-twitter": name === "twitter",
            }
          )}
        >
          {name && (
            <Icon name={name} className="w-[18px] h-[18px] fill-white" />
          )}
          <span className="flex-1 ml-2">{label}</span>
          <Icon
            name="arrow"
            className="h-[8px] w-[10px] ml-1.5 stroke-white -rotate-90"
          />
        </a>
      ))}
    </>
  );
};

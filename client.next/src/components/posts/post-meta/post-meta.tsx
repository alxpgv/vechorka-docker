import React, { FC } from "react";
import { Icon } from "@/components/ui/icon";
import cn from "clsx";
import { getDateFromISO, getTimeFromISO } from "@/utils/helpers";

interface PostMetaProps {
  date?: string;
  time?: string;
  views?: number;
  commentCount?: number;
  color?: "light" | "dark" | "responsive";
  className?: string;
}

export const PostMeta: FC<PostMetaProps> = ({
  date,
  time,
  views,
  commentCount,
  color = "dark",
  className,
}) => {
  const iconClasses = "w-[16px] h-[16px] mr-1";
  const iconColorClasses = {
    "stroke-grey-400": color === "dark",
    "stroke-white": color === "light",
    "stroke-grey-400 sm:stroke-white": color === "responsive",
  };
  const textColorClasses = {
    "text-grey-400": color === "dark",
    "text-white": color === "light",
    "text-grey-400 sm:text-white": color === "responsive",
  };

  return (
    <div
      className={cn(
        className,
        "relative flex space-x-3 text-14px",
        textColorClasses
      )}
    >
      {date && <div>{getDateFromISO(date)}</div>}
      {views ? (
        <div className="flex">
          <Icon
            name="post-views"
            className={cn(iconClasses, iconColorClasses)}
          />
          {views}
        </div>
      ) : null}
      {time ? (
        <div className="flex">
          <Icon name="clock" className={cn(iconClasses, iconColorClasses)} />
          {getTimeFromISO(time)}
        </div>
      ) : null}
      {commentCount ? (
        <div className="flex">
          <Icon
            name="review-count"
            className={cn(iconClasses, iconColorClasses)}
          />
          {commentCount}
        </div>
      ) : null}
    </div>
  );
};

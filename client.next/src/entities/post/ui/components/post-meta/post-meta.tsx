import React, { FC } from "react";
import { Icon } from "@/shared/ui/icon";
import cn from "clsx";
import { formatISODate, formatISOTime } from "@/shared/lib/date";

interface Props {
  date?: string;
  time?: string;
  views?: number;
  commentCount?: number;
  color?: "light" | "dark";
  className?: string;
}

export const PostMeta: FC<Props> = ({
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
  };
  const textColorClasses = {
    "text-grey-400": color === "dark",
    "text-white": color === "light",
  };

  return (
    <div
      className={cn(
        className,
        "relative flex space-x-3 text-14px",
        textColorClasses
      )}
    >
      {date && <div>{formatISODate(date)}</div>}
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
          {formatISOTime(time)}
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

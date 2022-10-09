import React from "react";
import Link from "next/link";
import { TaxonomyProps } from "@/shared/types";
import cn from "clsx";

interface Props {
  categories: TaxonomyProps[];
  className?: string;
  color?: "light" | "dark";
  variant?: "button";
  urlPrefix: string;
}

export const PostCategoryLink = ({
  categories,
  className,
  color = "dark",
  variant,
  urlPrefix,
}: Props) => {
  if (!categories.length) return null;

  return (
    <div
      className={cn(
        className,
        "relative flex flex-wrap space-x-3 w-fit text-sm-10",
        {
          "link-light": color === "light",
        }
      )}
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${urlPrefix}/${category.slug}`}
          prefetch={false}
        >
          <a
            className={cn({
              "py-2 px-3 bg-grey-450 hover:bg-blue-300": variant === "button",
            })}
          >
            {category.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

import React, { FC } from "react";
import Link from "next/link";
import { MenuProps } from "@/components/common/navigation/types";
import cn from "clsx";
import { useSettings } from "@/contexts/settings-context";

interface SubMenuProps {
  parentSlug: string;
  items: MenuProps[];
  isOpen: boolean;
}

export const SubMenu: FC<SubMenuProps> = ({ parentSlug, items, isOpen }) => {
  const settings = useSettings();
  const tags = settings?.taxonomies?.tags?.length
    ? settings?.taxonomies?.tags
    : null;

  const linkClasses =
    "block px-3 py-2 m-1 text-14px text-grey-500 hover:text-white bg-grey-100 hover:bg-blue-300";

  return (
    <div
      className={cn(
        "absolute top-full min-w-[400px] p-5 bg-white transition-opacity duration-300 shadow-2xl",
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <ul className="flex flex-wrap w-full -m-1">
        {items.map(({ id, slug, name }) => (
          <li key={id}>
            <Link href={`/${parentSlug}/${slug}`}>
              <a className={linkClasses}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      {/* tax geography */}
      <hr className="w-full my-4 border-t border-grey-300" />
      <div className="flex flex-wrap -m-1">
        {tags &&
          tags.map((tag) => (
            <Link key={tag.id} href={`/${parentSlug}/${tag.slug}`}>
              <a className={linkClasses}>{tag.name}</a>
            </Link>
          ))}
      </div>
    </div>
  );
};

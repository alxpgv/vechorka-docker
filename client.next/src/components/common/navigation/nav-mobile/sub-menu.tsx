import React, { FC } from "react";
import Link from "next/link";
import type { MenuProps } from "../types";
import cn from "clsx";

interface SubMenuProps {
  items: MenuProps[];
  parentSlug: string;
  isOpen: boolean;
  onClickItem?: () => void;
}

export const SubMenu: FC<SubMenuProps> = ({
  items,
  parentSlug,
  isOpen,
  onClickItem,
}) => {
  return (
    <ul className={cn("bg-grey-600", isOpen ? "block" : "hidden")}>
      {items.map(({ id, slug, name }) => (
        <li key={id}>
          <Link href={`/${parentSlug}/${slug}`}>
            <a
              className="block link-light p-4 pl-5 border-b border-grey-480 hover:border-grey-600 hover:bg-grey-480"
              onClick={onClickItem}
            >
              {name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

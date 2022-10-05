import React, { FC, useState } from "react";
import Link from "next/link";
import { SubMenu } from "./sub-menu";
import { Icon } from "@/shared/ui/icon";
import type { MenuProps } from "../types";
import cn from "clsx";

interface MenuItemProps {
  item: MenuProps;
  onClick?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({ item, onClick }) => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { name, slug, child, icon } = item;

  const toggleSubMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSubMenu((prev) => !prev);
  };

  const linkClasses =
    "flex items-center p-4 link-light border-b border-grey-600 hover:bg-grey-490";
  const iconClasses = "w-[20px] h-[20px] mr-4 stroke-grey-200";

  const href = slug === "/" ? slug : `/${slug}`;

  if (child?.length) {
    return (
      <li>
        <Link href={href} prefetch={false}>
          <a
            className={cn(linkClasses, openSubMenu && "bg-grey-490")}
            onClick={toggleSubMenu}
          >
            {icon && <Icon name={icon} className={iconClasses} />}
            <span className="flex-1">{name}</span>
            <Icon
              name="arrow"
              className={cn(
                "w-[12px] h-[12px] ml-2 stroke-white",
                openSubMenu ? "hover:bg-grey-490" : "-rotate-90"
              )}
            />
          </a>
        </Link>
        <SubMenu
          items={child}
          parentSlug={slug}
          isOpen={openSubMenu}
          onClickItem={onClick}
        />
      </li>
    );
  } else {
    return (
      <li>
        <Link href={href} prefetch={false}>
          <a className={linkClasses} onClick={onClick}>
            {icon && <Icon name={icon} className={iconClasses} />}
            {name}
          </a>
        </Link>
      </li>
    );
  }
};

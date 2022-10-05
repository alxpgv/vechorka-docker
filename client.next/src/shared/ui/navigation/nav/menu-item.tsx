import React, { FC, useState } from "react";
import Link from "next/link";
import type { MenuProps } from "../types";
import cn from "clsx";
import { Icon } from "@/shared/ui/icon";
import { SubMenu } from "@/shared/ui/navigation/nav/sub-menu";

export const MenuItem: FC<{ item: MenuProps }> = ({ item }) => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { name, slug, child } = item;

  // const isActive = (currentSlug: string) => {
  //   const segments = router.asPath.split("/");
  //   segments.shift();
  //
  //   console.log(segments);
  //   return (
  //     currentSlug &&
  //     (currentSlug === router.asPath || segments.includes(currentSlug))
  //   );
  // };
  //
  // isActive(item.slug);

  const handleMouseEnter = () => {
    setOpenSubMenu(true);
  };

  const handleMouseLeave = () => {
    setOpenSubMenu(false);
  };

  const linkClasses = `h-full flex items-center px-2 font-bold link-primary`;
  const itemClasses = `relative h-navbar-md flex items-center`;
  const href = slug === "/" ? slug : `/${slug}`;

  if (child?.length) {
    return (
      <li
        className={cn(itemClasses, "-mb-1 pb-1")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={href}>
          <a className={cn(linkClasses, "")}>
            <span className={cn(openSubMenu && "text-blue-300")}>{name}</span>
            <Icon
              name="arrow"
              className={cn(
                "w-[12px] h-[12px] ml-2",
                openSubMenu ? "stroke-blue-300" : "stroke-grey-500"
              )}
            />
          </a>
        </Link>
        <SubMenu parentSlug={slug} items={child} isOpen={openSubMenu} />
      </li>
    );
  } else {
    return (
      <li className={itemClasses}>
        <Link href={href}>
          <a className={cn(linkClasses)}>{name}</a>
        </Link>
      </li>
    );
  }
};

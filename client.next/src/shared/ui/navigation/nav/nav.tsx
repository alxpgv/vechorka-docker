import React, { FC } from "react";
import type { MenuProps } from "../types";
import { MenuItem } from "@/shared/ui/navigation/nav/menu-item";

export const Nav: FC<{ menu: MenuProps[] }> = ({ menu }) => {
  return (
    <nav role="navigation" className="w-full">
      <ul className="flex items-center justify-between">
        {menu?.length > 0 &&
          menu.map((item) => <MenuItem item={item} key={item.id} />)}
      </ul>
    </nav>
  );
};

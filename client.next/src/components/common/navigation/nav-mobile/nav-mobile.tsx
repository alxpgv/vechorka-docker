import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import type { MenuProps } from "../types";
import {
  CloseButton,
  Hamburger,
} from "@/components/common/navigation/nav-mobile/buttons";
import cn from "clsx";
import { InputSearch } from "@/components/ui/inputs/input-search";
import { MenuItem } from "@/components/common/navigation/nav-mobile/menu-item";
import { useKey } from "@/utils/hooks/useKey";

interface NavMobileProps {
  menu: MenuProps[];
}

export const NavMobile: FC<NavMobileProps> = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>;

  const clickOutside = (e: any) => {
    if (overlayRef?.current && overlayRef.current === e.target) {
      setIsOpen(false);
    }
  };

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("lock-scrollbar");
      document.body.style.top = "0";
    } else {
      document.body.classList.remove("lock-scrollbar");
      document.body.style.top = "";
    }
  }, [isOpen]);

  useKey("Escape", () => setIsOpen(false));

  return (
    <>
      {/* hamburger btn */}
      <Hamburger handleClick={openMenu} />

      {/* overlay */}
      <div
        className={cn(
          "fixed flex inset-0 bg-black bg-opacity-50",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        role="navigation"
        onClick={clickOutside}
        ref={overlayRef}
      >
        {/* content */}
        <div
          className={cn(
            "relative w-[85%] max-w-[300px] min-w-[220px] bg-grey-480 shadow-2xl shadow-grey-600 transition duration-200 ease-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* heading */}
          <div className="flex items-center justify-between h-[60px] px-4 border-b border-grey-600 bg-grey-450">
            {/* search */}
            <div className="h-[30px] w-[80%]">
              <InputSearch variant={"secondary"} />
            </div>
            {/* close btn */}
            <CloseButton onClick={() => setIsOpen(false)} />
          </div>

          {/* menu */}
          <ul className="h-full overflow-y-auto webkit-overflow-scroll">
            {menu?.length > 0 &&
              menu.map((item) => (
                <MenuItem
                  item={item}
                  key={item.id}
                  onClick={() => setIsOpen(false)}
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

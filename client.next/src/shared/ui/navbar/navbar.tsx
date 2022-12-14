import React from "react";
import { Container } from "@/shared/ui/container";
import { useSettings } from "@/app/contexts/settings-context";
import { Logo } from "@/shared/ui/logo";
import { SearchForm } from "@/entities/search/ui/search-form";
import { Nav } from "@/shared/ui/navigation/nav";
import { NavMobile } from "@/shared/ui/navigation/nav-mobile";
import { menuHomeItem } from "@/shared/config";

export const Navbar = () => {
  const { menus } = useSettings();

  return (
    <div className="fixed w-full min-w-[220px] h-navbar-sm md:h-navbar-md bg-white z-20">
      <Container className="h-full">
        <div className="flex items-center h-full border-b-2 border-blue-300">
          {/* logo */}
          <div className="relative flex-shrink-0 h-[35px] md:h-[49px] w-[116px] md:w-[166px] transition-all">
            <Logo priority />
          </div>

          {/* wrapper */}
          <div className="flex h-full w-full items-center justify-end xl:justify-between">
            {/* menu */}
            <div className="hidden xl:flex flex-1 items-center px-12">
              {menus?.main && <Nav menu={menus.main} />}
            </div>

            {/* search */}
            <div className="hidden md:flex justify-end w-[310px] h-[30px]">
              <SearchForm />
            </div>

            {/* mobile */}
            <div className="flex xl:hidden items-center">
              {menus?.main && (
                <NavMobile menu={[menuHomeItem, ...menus.main]} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

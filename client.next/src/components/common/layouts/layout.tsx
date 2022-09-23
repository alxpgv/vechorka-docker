import React, { FC, PropsWithChildren } from "react";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import cn from "clsx";
import { Container } from "@/components/ui/container";
import { TopBtn } from "@/components/ui/top-btn";

interface LayoutProps extends PropsWithChildren {
  navbarOffset?: boolean;
}

export const Layout: FC<LayoutProps> = ({ navbarOffset = true, children }) => {
  return (
    <>
      <Navbar />
      <main className={cn(navbarOffset && "pt-navbar-sm md:pt-navbar-md")}>
        <Container className="pt-5 lg:pt-8">{children}</Container>
      </main>
      <TopBtn />
      <Footer />
    </>
  );
};

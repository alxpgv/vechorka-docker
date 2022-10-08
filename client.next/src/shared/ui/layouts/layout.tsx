import React, { FC, PropsWithChildren } from "react";
import { Footer } from "@/shared/ui/footer";
import { Navbar } from "@/shared/ui/navbar";
import cn from "clsx";
import { Container } from "@/shared/ui/container";
import { TopBtn } from "@/shared/ui/top-btn";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";

interface Props extends PropsWithChildren {
  navbarOffset?: boolean;
}

export const Layout: FC<Props> = ({ navbarOffset = true, children }) => {
  return (
    <>
      <Navbar />
      <main className={cn(navbarOffset && "pt-navbar-sm md:pt-navbar-md")}>
        <Container className="pt-5 lg:pt-8">
          <Breadcrumbs />
          {children}
        </Container>
      </main>
      <TopBtn />
      <Footer />
    </>
  );
};

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface LogoProps {
  priority?: boolean;
}

export const Logo = ({ priority = false }: LogoProps) => {
  const router = useRouter();

  const ImageLogo = () => (
    <Image
      layout="fill"
      src="/images/logo.png"
      objectFit="contain"
      alt="Вечерний ставрополь"
      // priority={priority}
    />
  );

  return (
    <>
      {router.pathname === "/" ? (
        <div className="relative w-full h-full">
          <ImageLogo />
        </div>
      ) : (
        <Link href="/">
          <a className="relative block w-full h-full">
            <ImageLogo />
          </a>
        </Link>
      )}
    </>
  );
};

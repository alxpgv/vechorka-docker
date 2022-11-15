import { SEO } from "@/shared/ui/SEO";

export const Head = () => {
  return (
    <SEO>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        key="viewport"
      />
      <link
        rel="preload"
        href="/fonts/raleway/raleway-v28-latin_cyrillic-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
        key="ralewayRegular"
      />
    </SEO>
  );
};

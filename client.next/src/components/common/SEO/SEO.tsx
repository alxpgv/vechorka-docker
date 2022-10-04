// TODO: !check all this code
import { Fragment, PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSettings } from "@/contexts/settings-context";

interface OgImage {
  url?: string;
  width?: string;
  height?: string;
  alt?: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    type?: string;
    locale?: string;
    description?: string;
    site_name?: string;
    url?: string;
    image?: OgImage;
  };
}

export const SEO = ({
  title,
  description,
  openGraph,
  robots,
  children,
}: SEOProps & PropsWithChildren) => {
  const router = useRouter();
  const settings = useSettings();

  const getTitle = (pageTitle?: string) => {
    const siteTitle = settings?.title || "";

    // home page
    if (router.pathname === "/") {
      return pageTitle ?? siteTitle;
    }
    // other pages
    return pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  };

  const ogImage = openGraph?.image || settings?.openGraph?.image;

  // The `key` property makes the tag is only rendered once,
  return (
    <Head>
      <title key="title">{getTitle(title)}</title>
      <meta
        key="description"
        name="description"
        content={description ?? settings?.description ?? ""}
      />
      <meta
        key="og:type"
        property="og:type"
        content={openGraph?.type ?? settings?.openGraph?.type}
      />
      <meta
        key="og:title"
        property="og:title"
        content={
          openGraph?.title ??
          title ??
          settings?.openGraph?.title ??
          settings.title ??
          ""
        }
      />
      <meta
        key="og:description"
        property="og:description"
        content={
          openGraph?.description ??
          settings?.openGraph?.description ??
          description ??
          settings?.description ??
          ""
        }
      />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={openGraph?.site_name ?? settings?.openGraph?.site_name ?? ""}
      />
      <meta
        key="og:url"
        property="og:url"
        content={
          openGraph?.url ?? settings?.openGraph?.url ?? settings?.siteUrl ?? ""
        }
      />
      <meta
        key="og:locale"
        property="og:locale"
        content={settings?.openGraph?.locale ?? ""}
      />
      {ogImage ? (
        <Fragment key="og:image">
          {ogImage.url && (
            <meta
              key="twitter:card"
              name="twitter:card"
              content="summary_large_image"
            />
          )}
          {ogImage.url && (
            <meta
              key="og:image:url"
              property="og:image"
              content={ogImage.url}
            />
          )}
          {ogImage.width && (
            <meta
              key="og:image:width"
              property="og:image:width"
              content={ogImage.width}
            />
          )}
          {ogImage.height && (
            <meta
              key="og:image:height"
              property="og:image:height"
              content={ogImage.height}
            />
          )}
          {ogImage.alt && (
            <meta
              key="og:image:alt"
              property="og:image:alt"
              content={ogImage.alt}
            />
          )}
        </Fragment>
      ) : null}
      <meta key="robots" name="robots" content={robots ?? "index,follow"} />
      {children}
    </Head>
  );
};

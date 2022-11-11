import React, { Fragment } from "react";
import type { PostProps } from "@/shared/types";
import { Heading } from "@/shared/ui/heading";
import { parseContent } from "@/shared/lib/content";
import { useRouter } from "next/router";
import { useSettings } from "@/app/contexts/settings-context";
import { SEO } from "@/shared/ui/SEO";

export const PageDetail = ({
  title,
  content,
  preview,
  seo,
}: Partial<PostProps>) => {
  const components: Array<string | React.ReactNode> = content
    ? parseContent(content)
    : [];

  const router = useRouter();
  const settings = useSettings();

  const postUrl = `${settings.siteUrl}${router.asPath}`;
  const previewUrl = preview?.url
    ? `${process.env.UPLOAD_HOST}/${preview?.url}`
    : "";

  const description = seo?.description;

  return (
    <>
      <SEO
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          type: "article",
          url: postUrl,
          image: {
            url: previewUrl,
            width: preview?.width,
            height: preview?.height,
            alt: preview?.alt || title,
          },
        }}
      />

      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      {components &&
        components.map((component, index) => {
          if (typeof component === "string") {
            return (
              <div
                key={index}
                className="content"
                dangerouslySetInnerHTML={{ __html: component }}
              />
            );
          } else if (typeof component === "object") {
            return <Fragment key={index}>{component}</Fragment>;
          }
        })}
    </>
  );
};

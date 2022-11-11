import React from "react";
import type { PostProps } from "@/shared/types";
import { PageDetail } from "@/entities/page/ui/page-detail";
import { GalleryEmployees } from "@/widgets/gallery-employees";

export const PageAbout = ({ title, content, preview, seo }: PostProps) => {
  return (
    <>
      <PageDetail title={title} content={content} preview={preview} seo={seo} />
      <GalleryEmployees />
    </>
  );
};

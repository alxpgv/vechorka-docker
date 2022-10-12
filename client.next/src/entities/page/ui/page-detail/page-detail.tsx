import React from "react";
import type { PostProps } from "@/shared/types";
import { parseContent } from "@/shared/lib/content";
import { Heading } from "@/shared/ui/heading";

export const PageDetail = ({ title, content }: PostProps) => {
  return (
    <>
      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      {content && (
        <div
          className="content mt-5"
          dangerouslySetInnerHTML={{ __html: parseContent(content) }}
        />
      )}
    </>
  );
};

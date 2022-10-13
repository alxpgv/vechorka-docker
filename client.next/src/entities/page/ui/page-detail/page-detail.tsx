import React from "react";
import type { PostProps } from "@/shared/types";
import { Heading } from "@/shared/ui/heading";
import { parseContent } from "@/shared/lib/content";

export const PageDetail = ({ title, content }: PostProps) => {
  return (
    <>
      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      {content && (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: parseContent(content) }}
        />
      )}
    </>
  );
};

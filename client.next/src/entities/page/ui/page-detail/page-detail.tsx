import React, { Fragment, ReactElement } from "react";
import type { PostProps } from "@/shared/types";
import { Heading } from "@/shared/ui/heading";
import { parseContent } from "@/shared/lib/content";

export const PageDetail = ({ title, content }: PostProps) => {
  const components: Array<string | React.ReactNode> = content
    ? parseContent(content)
    : [];

  return (
    <>
      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      <div className="content">
        {components &&
          components.map((component, index) => {
            if (typeof component === "string") {
              return (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: component }}
                />
              );
            } else if (typeof component === "object") {
              return <Fragment key={index}>{component}</Fragment>;
            }
          })}
      </div>
    </>
  );
};

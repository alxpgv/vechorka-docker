import React, { FC } from "react";
import { PaperLinksWidget } from "@/newspaper/paper-links-widget";
import { CommentLast } from "@/widgets/comment-last";
import { PostTopDynamic } from "@/widgets/post-top";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { NavCategories } from "@/shared/ui/navigation/nav-categories";

interface Props {
  left: React.ReactNode;
}

export const PostLayout: FC<Props> = ({ left }) => {
  return (
    <>
      <LayoutColumn
        left={left}
        right={
          <>
            <div className="hidden md:block">
              <NavCategories />
            </div>

            <div className="smx1:flex md:block mt-6 lg:mt-12">
              <PostTopDynamic className="smx1:mr-3 md:mr-0" />
              <CommentLast className="mt-6 smx1:mt-0 md:mt-12" />
            </div>
            <PaperLinksWidget />
          </>
        }
      />
    </>
  );
};

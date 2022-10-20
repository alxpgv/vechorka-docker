import React, { FC } from "react";
import { PaperLinks } from "@/widgets/paper-links";
import { NewsCommentedDynamic } from "@/widgets/news-commented";
import { NewsTopDynamic } from "@/widgets/news-top";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { NavCategories } from "@/shared/ui/navigation/nav-categories";
import { PostProps } from "@/shared/types";
import { PostRelated } from "@/widgets/post-related";

interface Props {
  left: React.ReactNode;
  showNewsWidgets?: boolean;
  interestPosts?: PostProps[];
}

export const PostLayout: FC<Props> = ({
  left,
  interestPosts,
  showNewsWidgets = true,
}) => {
  return (
    <>
      <LayoutColumn
        left={left}
        right={
          <>
            <div className="hidden md:block">
              <NavCategories />
            </div>

            {showNewsWidgets && (
              <div className="smx1:flex md:block mt-6 lg:mt-12">
                <NewsTopDynamic className="smx1:mr-3 md:mr-0" />
                <NewsCommentedDynamic className="mt-6 smx1:mt-0 md:mt-12" />
              </div>
            )}
            <PaperLinks />
          </>
        }
      />
      {interestPosts && interestPosts.length > 0 && (
        <PostRelated
          title="Интересное"
          posts={interestPosts}
          urlPrefix="news"
        />
      )}
    </>
  );
};

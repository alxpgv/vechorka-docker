import React, { FC } from "react";
import type { PostProps } from "@/shared/types";
import Link from "next/link";
import { PostImage } from "@/shared/ui/post/post-image";
import { PostLinkCategory } from "@/shared/ui/post/post-link-category";
import { PostMeta } from "@/shared/ui/post/post-meta";

interface Props {
  posts: PostProps[];
}

export const PostInterest: FC<Props> = ({ posts }) => {
  if (!posts || !posts.length) return null;

  return (
    <div className="mt-6 md:mt-12">
      <h2 className="mb-7 text-grey-500">Интересное</h2>
      <div className="flex flex-wrap -m-3 sm:-m-2">
        {posts.map(({ id, title, preview, slug, createdAt, taxonomies }) => {
          const categories = taxonomies?.categories;
          const categorySlug =
            categories && categories[0] ? categories[0].slug : "";
          const href = `/news/${categorySlug}/${slug}`;

          return (
            <div key={id} className="w-full sm:w-1/2 md:flex-1 p-3 sm:p-2">
              {/* image */}
              <PostImage
                url={preview?.url}
                href={href}
                className={"h-[190px] lg:h-[260px] xl:h-[320px]"}
              />

              {/* meta */}
              <div className="flex flex-wrap items-center justify-between mt-3">
                {/* category */}
                {categories && (
                  <PostLinkCategory
                    className="mr-2"
                    color="dark"
                    parentSlug="news"
                    categories={categories}
                  />
                )}
                {/* meta */}
                <PostMeta date={createdAt} />
              </div>

              {/* title */}
              {title && (
                <Link href={href} prefetch={false}>
                  <a className="link-primary">
                    <h4 className="mt-3">{title}</h4>
                  </a>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

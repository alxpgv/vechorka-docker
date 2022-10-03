import React, { FC } from "react";
import { PostProps } from "@/types";
import Link from "next/link";
import { PostImage } from "@/components/posts/post-image";
import { PostCategory } from "@/components/posts/post-category/post-category";
import { PostMeta } from "@/components/posts/post-meta";

interface InterestNewsProps {
  items: PostProps[];
}

export const InterestNews: FC<InterestNewsProps> = ({ items }) => {
  if (!items || !items.length) return null;

  return (
    <div className="mt-6 md:mt-12">
      <h2 className="mb-7 text-grey-500">Интересное</h2>
      <div className="flex flex-wrap -m-3 sm:-m-2">
        {items.map(({ id, title, preview, slug, createdAt, taxonomies }) => {
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
                  <PostCategory
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

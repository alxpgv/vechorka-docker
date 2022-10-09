import React, { FC } from "react";
import type { PostProps } from "@/shared/types";
import Link from "next/link";
import { Icon } from "@/shared/ui/icon";
import { PostImage } from "@/features/post/post-image";
import cn from "clsx";
import { PostMeta } from "@/features/post/post-meta";

interface MainLastArticlesProps {
  articles: PostProps[];
}

export const MainLastArticles: FC<MainLastArticlesProps> = ({ articles }) => {
  if (!articles || !articles.length) return null;

  return (
    <div className="mt-10 md:mt-12 mb-7">
      <h2 className="mb-7 text-grey-500">Статьи</h2>
      <div className="space-y-5 md:space-y-7 lg:space-y-8">
        {articles.map(
          ({ id, preview, slug, title, excerpt, createdAt, type }) => {
            const href = `/article/${slug}`;
            return (
              <div key={id} className="flex flex-col sm:flex-row">
                {/* image */}
                <div className="sm:flex-1 max-w-[420px] h-[190px] lg:h-[260px] mr-0 sm:mr-6">
                  <PostImage url={preview?.url} href={href} />
                </div>

                {/* content */}
                <div className="sm:flex-1 flex flex-col border-b border-grey-200 pb-3">
                  {title && (
                    <Link href={href}>
                      <a className="link-primary mt-3 sm:mt-0">
                        <h3>{title}</h3>
                      </a>
                    </Link>
                  )}

                  {/* meta */}
                  <PostMeta className="mt-3 lg:mt-5 " date={createdAt} />

                  {/* text */}
                  {excerpt && (
                    <p className="my-3 lg:my-5 text-grey-400 text-line-clamp-2 lg:text-line-clamp-3 xl:text-line-clamp-5">
                      {excerpt}
                    </p>
                  )}

                  {/* more link */}
                  <div className="mt-auto text-14px">
                    <Link href={href}>
                      <a className="flex items-center justify-end group">
                        <span>Прочитать больше</span>
                        <Icon
                          name="arrow"
                          className="h-[6px] w-[10px] ml-2 -rotate-90 stroke-blue-300 group-hover:stroke-blue-100"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

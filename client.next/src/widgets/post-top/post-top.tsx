import React, { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import cn from "clsx";
import type { PostProps } from "@/shared/types";
import { SimpleLoader } from "@/shared/ui/loaders";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import { PostMeta } from "@/shared/ui/post/post-meta";
import { PostImage } from "@/shared/ui/post/post-image";
import { getPosts } from "@/shared/api/posts";

export interface PostTopProps {
  className?: string;
}

export const PostTop: FC<PostTopProps> = ({ className }) => {
  const [news, setNews] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    setLoading(true);
    const fetchedPosts = async () => {
      try {
        const fetchedPosts = await getPosts({
          limit: 5,
          relations: { taxonomy: true },
        });
        setNews(fetchedPosts);
      } catch (e) {
        console.log("error");
      }
      setLoading(false);
    };
    isVisible && fetchedPosts();
  }, [isVisible]);

  return (
    <div className={cn(className, "p-6 bg-grey-100")} ref={ref}>
      <div className="pb-4 border-b border-b-grey-200">
        <h4 className="text-grey-500">Самые популярные</h4>
      </div>
      {loading && <SimpleLoader />}
      <div className="divide-y divide-grey-200">
        {!loading &&
          news?.length > 0 &&
          news.map((item) => {
            const categories = item.taxonomies?.categories;
            const categorySlug =
              categories && categories[0] ? categories[0].slug : "";
            const href = `/news/${categorySlug}/${item.slug}`;

            return (
              <div key={item.id} className="flex py-4">
                {/* image */}
                <div className="relative w-[60px] min-h-[70px]">
                  <PostImage
                    url={
                      item.preview?.sizes?.thumbnail?.url || item.preview?.url
                    }
                    href={href}
                  />
                </div>
                {/* content */}
                <div className="flex-1 pl-3">
                  {/* meta */}
                  <PostMeta
                    className="justify-between"
                    date={item.createdAt}
                    commentCount={item.commentCount}
                  />

                  {/* title */}
                  {item.title && (
                    <Link href={href}>
                      <a className="pt-2 text-line-clamp-3 link-primary">
                        <h6>{item.title}</h6>
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

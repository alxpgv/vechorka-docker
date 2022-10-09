import React, { FC, useEffect, useRef, useState } from "react";
import cn from "clsx";
import type { PostProps } from "@/shared/types";
import { PostMeta } from "@/features/post/post-meta";
import { getLink } from "@/shared/lib/links";
import { PostTitle } from "@/features/post/post-title";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import { SimpleLoader } from "@/shared/ui/loaders";
import { PostImage } from "@/features/post/post-image";

export interface PostListWidgetProps {
  title: string;
  showPreview?: boolean;
  className?: string;
  urlPrefix: string;
  fetchCallback: () => Promise<PostProps[]>;
}

export const PostListWidget: FC<PostListWidgetProps> = ({
  title,
  showPreview = false,
  className,
  urlPrefix,
  fetchCallback,
}) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const fetchedData = await fetchCallback();
        setPosts(fetchedData);
      } catch (e) {
        console.log("error");
      }
      setLoading(false);
    };
    isVisible && fetchData();
  }, [isVisible]);

  return (
    <div className={cn(className, "p-6 bg-grey-100")} ref={ref}>
      {title && (
        <div className="pb-4 border-b border-b-grey-200">
          <h4 className="text-grey-500">{title}</h4>
        </div>
      )}
      {loading && <SimpleLoader />}
      <div className="divide-y divide-grey-200">
        {!loading &&
          posts?.length > 0 &&
          posts.map((post) => {
            const categories = post.taxonomies?.categories;
            const categorySlug =
              categories && categories[0] ? categories[0].slug : "";
            const href = getLink(urlPrefix, categorySlug, post.slug);

            return (
              <div key={post.id} className="flex py-4">
                {/* image */}
                {showPreview && (
                  <div className="border relative w-[60px] min-h-[70px] mr-3">
                    <PostImage
                      url={
                        post.preview?.sizes?.thumbnail?.url || post.preview?.url
                      }
                      href={href}
                    />
                  </div>
                )}

                {/* meta */}
                <PostMeta
                  className="justify-between"
                  date={post.createdAt}
                  time={post.createdAt}
                />

                {/* title */}
                {post.title && (
                  <PostTitle
                    title={post.title}
                    href={href}
                    tag="h6"
                    className="pt-2 text-line-clamp-3"
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

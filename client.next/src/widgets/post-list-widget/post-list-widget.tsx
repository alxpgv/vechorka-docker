import React, { useEffect, useRef, useState } from "react";
import cn from "clsx";
import type { PostProps } from "@/shared/types";
import { getLink } from "@/shared/lib/links";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import { SimpleLoader } from "@/shared/ui/loaders";

interface Props {
  title: string;
  className?: string;
  urlPrefix: string;
  fetchCallback: () => Promise<PostProps[]>;
  view: ({
    post,
    href,
  }: {
    post: PostProps;
    href: string;
  }) => React.ReactElement;
}

export const PostListWidget = ({
  title,
  className,
  urlPrefix,
  fetchCallback,
  view,
}: Props) => {
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
        console.log("post list widget");
      }
      setLoading(false);
    };
    isVisible && fetchData();
  }, [fetchCallback, isVisible]);

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
                {view({ post, href })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

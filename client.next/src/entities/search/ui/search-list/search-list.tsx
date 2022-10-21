import React, { useState } from "react";
import { Heading } from "@/shared/ui/heading";
import { useRouter } from "next/router";
import { PostProps, PostType } from "@/shared/types";
import { searchPosts } from "@/shared/api/search";
import { SearchForm } from "@/entities/search/ui/search-form";
import { PostItem } from "@/entities/post/ui/post-item";
import { messages } from "@/shared/constants";

const getPrefixFromType = (type: PostType) => {
  if (type === "post") {
    return "news";
  }

  if (type === "article") {
    return "articles";
  }

  return type;
};

export const SearchList = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [query, setQuery] = useState<string>("");

  const router = useRouter();
  const q = router.query.q || "";

  if (q && q !== query) {
    const fetchPosts = async () => {
      try {
        const posts = await searchPosts(q as string, { limit: 30 });
        if (posts?.length > 0) {
          setPosts(posts);
        }
      } catch (error) {
        console.log("search", error);
      }
    };
    setPosts([]);
    setQuery(q as string);
    fetchPosts();
  }

  return (
    <>
      <Heading className="text-grey-500 mb-5" tag="h1" title="Поиск по сайту" />
      <div>
        <SearchForm defaultValue={query} />
      </div>
      {posts.length > 0 ? (
        <div className="relative flex flex-wrap -m-2 mt-5">
          {posts.map((post) => {
            const urlPrefix = post.type ? getPrefixFromType(post.type) : "";
            return (
              <PostItem
                key={post.id}
                post={post}
                className="p-2 sm:w-1/2 lg:w-1/3"
                urlPrefix={urlPrefix}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-5">{messages.post.notFound}</div>
      )}
    </>
  );
};

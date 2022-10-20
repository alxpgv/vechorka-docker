import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { PostLayout } from "@/shared/ui/layouts";
import { PostListShowMore } from "@/entities/post/ui/post-list-show-more";
import { ListPostProps, PostProps } from "@/shared/types";
import { getPosts } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";

export interface Props {
  posts: {
    articles: PostProps[];
    interestNews: PostProps[];
  };
}

const ArticlesIndexPage: NextPage<Props> = ({ posts }) => {
  const { articles, interestNews } = posts;
  return (
    <>
      <PostLayout
        left={<PostListShowMore initPosts={articles} urlPrefix="articles" />}
        interestPosts={interestNews}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const posts: ListPostProps = {
    articles: [],
    interestNews: [],
  };

  try {
    posts.articles = await getPosts({
      postType: "article",
      limit: 13,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("articles index", error);
  }

  if (
    !posts.articles ||
    !Array.isArray(posts.articles) ||
    !posts.articles.length
  ) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies } = await getGeneralSettings();

  // interest news
  try {
    posts.interestNews = await getPosts({
      limit: 4,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("articles index interest", error);
  }

  return {
    props: {
      posts,
      settings,
      taxonomies,
    },
  };
};

export default ArticlesIndexPage;

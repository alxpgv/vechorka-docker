import React from "react";
import { PostLayout } from "@/shared/ui/layouts";
import { CategoryNews } from "@/news/category-news";
import { PostInterest } from "@/widgets/post-interest";
import { FeedbackSocials } from "@/widgets/feedback-socials";
import { getPagePostsCategory } from "@/shared/api/page-posts-category";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";

export interface NewsCategoryProps {
  posts: {
    news: PostProps[];
    interestNews: PostProps[];
  };
}

const NewsCategoryPage = ({ posts }: NewsCategoryProps) => {
  const { news, interestNews } = posts;
  return (
    <>
      <PostLayout left={<CategoryNews initNews={news} />} />
      {interestNews && <PostInterest posts={interestNews} />}
      <FeedbackSocials />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let category = params?.category;
  // news slug taxonomy is exist in base, example news/news - is work, condition for exclude this category
  category = category && category === "news" ? undefined : (category as string);

  return await getPagePostsCategory({ slugTaxonomy: category });
};

export default NewsCategoryPage;

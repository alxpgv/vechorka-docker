import React from "react";
import { NewsLayout } from "@/components/common/layouts";
import { CategoryNews } from "@/news/category-news";
import { InterestNews } from "@/news/interest-news";
import { FeedbackWidget } from "@/widgets/feedback-widget";
import { getPagePostsCategory } from "@/services/api/page-posts-category";
import type { GetServerSideProps, NextPage } from "next";
import type { PostProps } from "@/types";

export interface NewsCategoryProps {
  posts: {
    news: PostProps[];
    interestNews: PostProps[];
  };
}

const NewsCategoryPage: NextPage<NewsCategoryProps> = ({ posts }) => {
  const { news, interestNews } = posts;
  return (
    <>
      <NewsLayout left={<CategoryNews initNews={news} />} />
      {interestNews && <InterestNews items={interestNews} />}
      <FeedbackWidget />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = params?.category;
  return await getPagePostsCategory({ slugTaxonomy: category as string });
};

export default NewsCategoryPage;

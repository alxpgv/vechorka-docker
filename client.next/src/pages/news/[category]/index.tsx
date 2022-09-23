import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { PostProps } from "@/types";
import { NewsLayout } from "@/components/common/layouts";
import { CategoryNews } from "@/news/category-news";
import { InterestNews } from "@/news/interest-news";
import { FeedbackWidget } from "@/widgets/feedback-widget";
import { getPagePostsCategory } from "@/services/api/page-posts-category";

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
  const category = params?.category as string;
  return await getPagePostsCategory({ slugTaxonomy: category });
};

export default NewsCategoryPage;

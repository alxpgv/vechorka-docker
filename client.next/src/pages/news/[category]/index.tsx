import React from "react";
import { PostLayout } from "@/shared/ui/layouts";
import { PostListShowMore } from "@/features/post/post-list-show-more";
import { NewsInterest } from "@/widgets/news-interest";
import { FeedbackSocials } from "@/widgets/feedback-socials";
import { getPageNewsCategory } from "@/shared/api/page-news-category";
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
      <PostLayout
        left={<PostListShowMore initPosts={news} urlPrefix="news" />}
      />
      {interestNews && <NewsInterest posts={interestNews} urlPrefix="news" />}
      <FeedbackSocials />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let category = params?.category;
  // news slug taxonomy is exist in base, example news/news - is work, condition for exclude this category
  category = category && category === "news" ? undefined : (category as string);

  return await getPageNewsCategory({ slugTaxonomy: category });
};

export default NewsCategoryPage;

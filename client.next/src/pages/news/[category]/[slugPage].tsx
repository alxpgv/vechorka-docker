import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/types";
import { NewsLayout } from "@/components/common/layouts";
import { InterestNews } from "@/news/interest-news";
import { FeedbackWidget } from "@/widgets/feedback-widget";
import { NewsDetail } from "@/news/news-detail";
import { getPosts } from "@/services/api/posts";

interface NewsDetailProps {
  post: PostProps;
  interestNews: PostProps[];
}

const NewsDetailPage = ({ post, interestNews }: NewsDetailProps) => {
  return (
    <>
      <NewsLayout left={<NewsDetail post={post} />} />
      {interestNews && <InterestNews items={interestNews} />}
      <FeedbackWidget />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slugPage = params?.slugPage as string;

  let post = null;
  let interestNews: PostProps[] = [];

  try {
    interestNews = await getPosts({
      limit: 4,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("category interest", error);
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      interestNews,
    },
  };
};

export default NewsDetailPage;

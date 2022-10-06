import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";
import { NewsLayout } from "@/shared/ui/layouts";
import { InterestNews } from "@/news/interest-news";
import { FeedbackWidget } from "@/widgets/feedback-widget";
import { NewsDetail } from "@/news/news-detail";
import { getPost, getPosts } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";

interface NewsDetailProps {
  post: PostProps;
  interestNews: PostProps[];
}

const NewsDetailPage = ({ post, interestNews }: NewsDetailProps) => {
  return (
    <>
      <NewsLayout left={<NewsDetail {...post} />} />
      {interestNews && <InterestNews items={interestNews} />}
      <FeedbackWidget />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slugPage as string;
  const slugTaxonomy = params?.category as string;

  console.log(slug, slugTaxonomy);

  let post = null;
  let interestNews: PostProps[] = [];

  try {
    post = await getPost(slug, slugTaxonomy);
  } catch (error) {
    console.log("news detail post", error);
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies } = await getGeneralSettings();

  try {
    interestNews = await getPosts({
      limit: 4,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("news detail interest:", error);
  }

  return {
    props: {
      post,
      interestNews,
      settings,
      taxonomies,
    },
  };
};

export default NewsDetailPage;

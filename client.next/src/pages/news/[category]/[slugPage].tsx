import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { NewsInterest } from "@/widgets/news-interest";
import { FeedbackSocials } from "@/widgets/feedback-socials";
import { PostDetail } from "@/entities/post/ui/post-detail";
import { getPost, getPosts } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const NewsDetailPage = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout left={<PostDetail {...post} />} />
      {interestNews && <NewsInterest posts={interestNews} urlPrefix="news" />}
      <FeedbackSocials />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slugPage as string;
  const slugTaxonomy = params?.category as string;

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

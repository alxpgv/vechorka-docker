import { GetServerSideProps } from "next";
import { getGeneralSettings } from "@/shared/api/settings";
import { PostLayout } from "@/shared/ui/layouts";
import React from "react";
import { ErrorStatus } from "@/shared/ui/error-status";
import { getPostsInterest } from "@/shared/api/posts";
import { PostProps } from "@/shared/types";

const ErrorPage = ({
  statusCode,
  interestNews,
}: {
  statusCode?: number;
  interestNews: PostProps[];
}) => {
  return (
    <PostLayout
      left={<ErrorStatus statusCode={statusCode} />}
      interestPosts={interestNews}
      showNewsWidgets={false}
      showAdvert={false}
      showPaper={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { settings, taxonomies, advert } = await getGeneralSettings();
  let interestNews = null;
  // interest news
  try {
    interestNews = await getPostsInterest();
  } catch (error) {
    console.log("interest", error);
  }
  return {
    props: {
      statusCode: res.statusCode,
      interestNews,
      taxonomies,
      settings,
      advert,
    },
  };
};

export default ErrorPage;

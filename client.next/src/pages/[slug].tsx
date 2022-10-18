import { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { NewsInterest } from "@/widgets/news-interest";
import { getPage } from "@/shared/api/pages";
import React from "react";
import { GetServerSideProps } from "next";
import { PageDetail } from "@/entities/page/ui/page-detail";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const Page = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout left={<PageDetail {...post} />} showNewsWidgets={false} />
      {interestNews && <NewsInterest posts={interestNews} urlPrefix="news" />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  return await getPage({ slug });
};

export default Page;

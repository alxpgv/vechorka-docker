import { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { getPage } from "@/shared/api/pages";
import React from "react";
import { GetServerSideProps } from "next";
import { PageDetail } from "@/entities/page/ui/page-detail";
import { PostRelated } from "@/widgets/post-related";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const Page = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout left={<PageDetail {...post} />} showNewsWidgets={false} />
      {interestNews && (
        <PostRelated title="Интересное" posts={interestNews} urlPrefix="news" />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  return await getPage({ slug });
};

export default Page;

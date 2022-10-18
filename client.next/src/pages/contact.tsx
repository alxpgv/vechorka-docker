import React from "react";
import { getPage } from "@/shared/api/pages";
import { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { NewsInterest } from "@/widgets/news-interest";
import { PageContact } from "@/entities/page/ui/page-contact";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const Contact = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout left={<PageContact {...post} />} />
      {interestNews && <NewsInterest posts={interestNews} urlPrefix="news" />}
    </>
  );
};

export const getServerSideProps = async () => {
  return await getPage({ slug: "contact" });
};

export default Contact;

import React from "react";
import { getPage } from "@/shared/api/pages";
import { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { NewsInterest } from "@/widgets/news-interest";
import { FeedbackSocials } from "@/widgets/feedback-socials";
import { PageDetail } from "@/entities/page/ui/page-detail";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const About = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout left={<PageDetail {...post} />} />
      {interestNews && <NewsInterest posts={interestNews} urlPrefix="news" />}
      <FeedbackSocials />
    </>
  );
};

export const getServerSideProps = async () => {
  return await getPage({ slug: "about" });
};

export default About;

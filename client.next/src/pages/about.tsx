import React from "react";
import { getPage } from "@/shared/api/pages";
import { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PageAbout } from "@/entities/page/ui/page-about";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const About = ({ post, interestNews }: Props) => {
  return (
    <PostLayout
      left={<PageAbout {...post} />}
      showNewsWidgets={false}
      interestPosts={interestNews}
    />
  );
};

export const getServerSideProps = async () => {
  return await getPage({ slug: "about" });
};

export default About;

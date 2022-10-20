import React from "react";
import { getPage } from "@/shared/api/pages";
import { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PageContact } from "@/entities/page/ui/page-contact";
import { PostRelated } from "@/widgets/post-related";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const Contact = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout left={<PageContact {...post} />} showNewsWidgets={false} />
      {interestNews && (
        <PostRelated title="Интересное" posts={interestNews} urlPrefix="news" />
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  return await getPage({ slug: "contact" });
};

export default Contact;

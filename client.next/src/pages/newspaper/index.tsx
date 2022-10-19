import { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { NewsInterest } from "@/widgets/news-interest";
import { getPage } from "@/shared/api/pages";
import React from "react";
import { NewspaperArchive } from "@/entities/newspaper/ui/newspaper-archive";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const NewsPaperIndex = ({ post, interestNews }: Props) => {
  return (
    <>
      <PostLayout
        left={<NewspaperArchive {...post} />}
        showNewsWidgets={false}
      />
      {interestNews && <NewsInterest posts={interestNews} urlPrefix="news" />}
    </>
  );
};

export const getServerSideProps = async () => {
  return await getPage({ slug: "gazeta-vecherniy-stavropol-160-7461" });
};

export default NewsPaperIndex;

import React from "react";
import { NewsPaperAllProps, PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { NewspaperArchive } from "@/entities/newspaper/ui/newspaper-archive";
import { getNewspapers } from "@/shared/api/newspaper";
import { getPosts } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";

interface Props {
  newspapers: NewsPaperAllProps;
  interestNews: PostProps[];
}

const NewsPaperIndex = ({ newspapers, interestNews }: Props) => {
  return (
    <>
      <PostLayout
        left={<NewspaperArchive newspapers={newspapers} />}
        showNewsWidgets={false}
        interestPosts={interestNews}
      />
    </>
  );
};

export const getServerSideProps = async () => {
  let newspapers = {
    posts: null,
    postsMonths: null,
    postsYear: null,
    allYears: null,
    lastRelease: null,
  };

  try {
    newspapers = await getNewspapers({
      allYears: true,
      lastRelease: true,
    });
  } catch (error) {
    console.log("newspaper", error);
  }

  if (!newspapers.posts) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies } = await getGeneralSettings();

  // interest news
  let interestNews: PostProps[] = [];
  try {
    interestNews = await getPosts({
      limit: 4,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("newspaper interest", error);
  }

  return {
    props: {
      newspapers,
      interestNews,
      settings,
      taxonomies,
    },
  };
};

export default NewsPaperIndex;

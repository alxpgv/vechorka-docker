import React from "react";
import { MainNews } from "@/news/main-news";
import { HomeColumnLayout } from "@/shared/ui/layouts";
import { MainLastNews } from "@/news/main-last-news";
import { MainLastArticles } from "@/articles/main-last-articles";
import { InterestNews } from "@/news/interest-news";
import { getGeneralSettings } from "@/shared/api/settings";
import { getHomePosts } from "@/shared/api/posts";
import type { TaxonomiesProps } from "@/shared/types";
import type { ListPostProps, PostProps } from "@/shared/types";
import { DynamicLastVideoSlider } from "@/video/last-video-slider";
import { DynamicFeedbackWidget } from "@/widgets/feedback-widget";
import { menuHomeItem } from "@/shared/config";

interface HomeProps {
  posts: {
    stavropol: PostProps[];
    lastNews: PostProps[];
    interestNews: PostProps[];
    articles: PostProps[];
  };
  taxonomies: TaxonomiesProps;
}

const HomePage = ({ posts, taxonomies }: HomeProps) => {
  const { stavropol, lastNews, interestNews, articles } = posts;
  const categories = [menuHomeItem, ...taxonomies?.categories];

  return (
    <>
      {stavropol && taxonomies?.tags && (
        <MainNews
          initNews={{ stavropol }}
          tabs={taxonomies?.tags}
          defaultActiveSlug="stavropol"
        />
      )}
      <HomeColumnLayout
        left={
          <>
            {lastNews && (
              <MainLastNews initNews={{ news: lastNews }} tabs={categories} />
            )}
            {articles && <MainLastArticles articles={articles} />}
          </>
        }
      />
      <DynamicLastVideoSlider />
      {interestNews && <InterestNews items={interestNews} />}
      <DynamicFeedbackWidget />
    </>
  );
};

export const getStaticProps = async () => {
  let posts: ListPostProps = {
    stavropol: [],
    lastNews: [],
    interestNews: [],
    articles: [],
  };

  try {
    posts = await getHomePosts(true);
  } catch (error) {
    console.log("error: posts/index: ", error);
  }

  const { settings, taxonomies } = await getGeneralSettings(true);

  return {
    props: {
      posts,
      taxonomies,
      settings,
    },
  };
};

export default HomePage;

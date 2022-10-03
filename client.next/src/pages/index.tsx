import React from "react";
import { MainNews } from "@/news/main-news";
import { MainLayout } from "@/components/common/layouts";
import { MainLastNews } from "@/news/main-last-news";
import { MainLastArticles } from "@/articles/main-last-articles";
import { InterestNews } from "@/news/interest-news";
import { LastVideoSlider } from "@/video/last-video-slider/last-video-slider";
import { FeedbackWidget } from "@/widgets/feedback-widget/feedback-widget";
import { getGeneralSettings } from "@/services/api/settings";
import { homeMenuItem } from "@/utils/menus";
import { getHomePosts } from "@/services/api/posts";
import type { TaxonomiesProps } from "@/types";
import { ListPostProps, PostProps } from "@/types";

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
  const categories = [homeMenuItem, ...taxonomies?.categories];

  return (
    <>
      {stavropol && taxonomies?.tags && (
        <MainNews
          initNews={{ stavropol }}
          tabs={taxonomies?.tags}
          defaultActiveSlug="stavropol"
        />
      )}
      <MainLayout
        left={
          <>
            {lastNews && (
              <MainLastNews initNews={{ news: lastNews }} tabs={categories} />
            )}
            {articles && <MainLastArticles articles={articles} />}
          </>
        }
      />
      <LastVideoSlider />
      {interestNews && <InterestNews items={interestNews} />}
      <FeedbackWidget />
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

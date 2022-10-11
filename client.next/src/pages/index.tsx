import React from "react";
import { HomeLayout } from "@/shared/ui/layouts";
import { NewsCategoriesTabbed } from "@/widgets/news-categories-tabbed";
import { ArticleLast } from "@/widgets/article-last";
import { NewsInterest } from "@/widgets/news-interest";
import { getGeneralSettings } from "@/shared/api/settings";
import { getHomePosts } from "@/shared/api/posts";
import type { TaxonomiesProps } from "@/shared/types";
import type { ListPostProps, PostProps } from "@/shared/types";
import { VideoLastSliderDynamic } from "@/widgets/video-last-slider";
import { FeedbackSocialsDynamic } from "@/widgets/feedback-socials";
import { menuAllNewsItem, menuMainNewsItem } from "@/shared/config";
import { NewsCategoriesGridTabbed } from "@/widgets/news-categories-grid-tabbed";

interface HomeProps {
  posts: {
    mainNews: PostProps[];
    lastNews: PostProps[];
    interestNews: PostProps[];
    articles: PostProps[];
  };
  taxonomies: TaxonomiesProps;
}

const HomePage = ({ posts, taxonomies }: HomeProps) => {
  const { mainNews, lastNews, interestNews, articles } = posts;
  const geographyTabs = [menuMainNewsItem, ...taxonomies?.geography];
  const categoriesTabs = [menuAllNewsItem, ...taxonomies?.categories];

  const mainNewsIds = mainNews.map((post) => post.id).join(",");

  return (
    <>
      {mainNews && geographyTabs && (
        <NewsCategoriesGridTabbed
          initPosts={{ news: mainNews }}
          tabs={geographyTabs}
          defaultActiveSlug="news"
          urlPrefix="news"
        />
      )}
      <HomeLayout
        left={
          <>
            {lastNews && (
              <NewsCategoriesTabbed
                initPosts={{ news: lastNews }}
                tabs={categoriesTabs}
                urlPrefix="news"
                excludeIds={mainNewsIds}
                excludeInSlug="news"
              />
            )}
            {articles && <ArticleLast posts={articles} />}
          </>
        }
      />
      <VideoLastSliderDynamic />
      {interestNews && <NewsInterest posts={interestNews} urlPrefix="news" />}
      <FeedbackSocialsDynamic />
    </>
  );
};

export const getStaticProps = async () => {
  let posts: ListPostProps = {
    mainNews: [],
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

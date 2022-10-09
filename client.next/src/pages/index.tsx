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
import { menuAllNewsItem } from "@/shared/config";
import { NewsCategoriesGridTabbed } from "@/widgets/news-categories-grid-tabbed";

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
  const categories = [menuAllNewsItem, ...taxonomies?.categories];

  return (
    <>
      {stavropol && taxonomies?.geography && (
        <NewsCategoriesGridTabbed
          initPosts={{ stavropol }}
          tabs={taxonomies?.geography}
          defaultActiveSlug="stavropol"
          urlPrefix="news"
        />
      )}
      <HomeLayout
        left={
          <>
            {lastNews && (
              <NewsCategoriesTabbed
                initPosts={{ news: lastNews }}
                tabs={categories}
                urlPrefix="news"
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

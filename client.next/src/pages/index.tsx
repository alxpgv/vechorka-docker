import React from "react";
import { HomeLayout } from "@/shared/ui/layouts";
import { MainLastNews } from "@/news/main-last-news";
import { MainLastArticles } from "@/articles/main-last-articles";
import { PostInterest } from "@/widgets/post-interest";
import { getGeneralSettings } from "@/shared/api/settings";
import { getHomePosts } from "@/shared/api/posts";
import type { TaxonomiesProps } from "@/shared/types";
import type { ListPostProps, PostProps } from "@/shared/types";
import { DynamicLastVideoSlider } from "@/video/last-video-slider";
import { FeedbackSocialsDynamic } from "@/widgets/feedback-socials";
import { menuAllNewsItem } from "@/shared/config";
import { PostGridInside } from "@/widgets/post-grid-inside";

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
      {stavropol && taxonomies?.tags && (
        <PostGridInside
          initPosts={{ stavropol }}
          tabs={taxonomies?.tags}
          defaultActiveSlug="stavropol"
        />
      )}
      <HomeLayout
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
      {interestNews && <PostInterest posts={interestNews} />}
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

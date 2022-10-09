import React from "react";
import { HomeLayout } from "@/shared/ui/layouts";
import { PostCategoriesTabbed } from "@/widgets/post-categories-tabbed";
import { MainLastArticles } from "@/articles/main-last-articles";
import { PostInterest } from "@/widgets/post-interest";
import { getGeneralSettings } from "@/shared/api/settings";
import { getHomePosts } from "@/shared/api/posts";
import type { TaxonomiesProps } from "@/shared/types";
import type { ListPostProps, PostProps } from "@/shared/types";
import { VideoLastSliderDynamic } from "@/widgets/video-last-slider";
import { FeedbackSocialsDynamic } from "@/widgets/feedback-socials";
import { menuAllNewsItem } from "@/shared/config";
import { PostCategoriesGridTabbed } from "@/widgets/post-categories-grid-tabbed";

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
        <PostCategoriesGridTabbed
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
              <PostCategoriesTabbed
                initPosts={{ news: lastNews }}
                tabs={categories}
                urlPrefix="news"
              />
            )}
            {articles && <MainLastArticles articles={articles} />}
          </>
        }
      />
      <VideoLastSliderDynamic />
      {interestNews && <PostInterest posts={interestNews} urlPrefix="news" />}
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

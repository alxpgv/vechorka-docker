import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PostDetail } from "@/entities/post/ui/post-detail";
import { getPost, getPostsInterest } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";
import { PostRelated } from "@/widgets/post-related";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
  relatedPosts: PostProps[];
}

const ArticlesDetailPage = ({ post, interestNews, relatedPosts }: Props) => {
  return (
    <>
      <PostLayout
        left={<PostDetail post={post} showComment />}
        showNewsWidgets={false}
      />
      {relatedPosts && (
        <PostRelated
          title="Статьи из раздела"
          posts={relatedPosts}
          urlPrefix="articles"
        />
      )}
      {interestNews.length > 0 && (
        <PostRelated title="Интересное" posts={interestNews} urlPrefix="news" />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slugPage as string;

  let posts = { post: null, relatedPosts: null };

  try {
    posts = await getPost(slug, {
      postType: "article",
      withRelatedPosts: true,
    });
  } catch (error) {
    console.log("article detail post", error);
  }

  if (!posts || !posts.post) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies } = await getGeneralSettings();

  let interestNews: PostProps[] = [];
  try {
    interestNews = await getPostsInterest();
  } catch (error) {
    console.log("article detail interest", error);
  }

  return {
    props: {
      post: posts.post,
      relatedPosts: posts.relatedPosts,
      interestNews,
      settings,
      taxonomies,
    },
  };
};

export default ArticlesDetailPage;

import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PostDetail } from "@/entities/post/ui/post-detail";
import { getPostBySlug, getPostsInterest } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";
import { PostRelated } from "@/widgets/post-related";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
  relatedPosts: PostProps[];
}

const NewsDetailPage = ({ post, interestNews, relatedPosts }: Props) => {
  return (
    <>
      <PostLayout left={<PostDetail post={post} showComment />} />
      {relatedPosts && (
        <PostRelated
          title="Другие новости"
          posts={relatedPosts}
          urlPrefix="news"
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
  const slugTaxonomy = params?.category as string;

  let posts = { post: null, relatedPosts: null };

  try {
    posts = await getPostBySlug(slug, {
      slugTaxonomy,
      postType: "post",
      withRelatedPosts: true,
    });
  } catch (error) {
    console.log("news detail post", error);
  }

  if (!posts || !posts.post) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies, advert } = await getGeneralSettings();

  let interestNews: PostProps[] = [];
  try {
    interestNews = await getPostsInterest();
  } catch (error) {
    console.log("news detail interest:", error);
  }

  return {
    props: {
      post: posts.post,
      relatedPosts: posts.relatedPosts,
      interestNews,
      settings,
      taxonomies,
      advert,
    },
  };
};

export default NewsDetailPage;

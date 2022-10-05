import React from "react";
import type { GetServerSideProps } from "next";
import { getPagePostsCategory } from "@/shared/api/page-posts-category";
import type { NewsCategoryProps } from "@/pages/news/[category]";
import NewsCategoryPage from "@/pages/news/[category]";

const NewsIndexPage = ({ posts }: NewsCategoryProps) => {
  return <NewsCategoryPage posts={posts} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return await getPagePostsCategory({ slugTaxonomy: "news" });
};

export default NewsIndexPage;

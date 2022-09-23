import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getPagePostsCategory } from "@/services/api/page-posts-category";
import type { NewsCategoryProps } from "@/pages/news/[category]";
import NewsCategoryPage from "@/pages/news/[category]";

const NewsIndexPage: NextPage<NewsCategoryProps> = ({ posts }) => {
  return <NewsCategoryPage posts={posts} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return await getPagePostsCategory({ slugTaxonomy: "news" });
};

export default NewsIndexPage;

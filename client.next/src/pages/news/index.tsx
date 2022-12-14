import React from "react";
import type { GetServerSideProps } from "next";
import { getPageNewsCategory } from "@/shared/api/page-news-category";
import type { NewsCategoryProps } from "@/pages/news/[category]";
import NewsCategoryPage from "@/pages/news/[category]";

const NewsIndexPage = ({ posts }: NewsCategoryProps) => {
  return <NewsCategoryPage posts={posts} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return await getPageNewsCategory({ slugTaxonomy: "news" });
};

export default NewsIndexPage;

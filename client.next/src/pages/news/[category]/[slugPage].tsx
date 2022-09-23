import React from "react";
import { GetServerSideProps } from "next";

const NewsDetailedPage = () => {
  return <div>news page</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slugPage: string | string[] | undefined = params?.slugPage;

  console.log("------page-------");
  console.log(slugPage);

  return {
    props: {
      news: [],
    },
  };
};

export default NewsDetailedPage;

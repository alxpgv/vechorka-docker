import { PostLayout } from "@/shared/ui/layouts";
import { getGeneralSettings } from "@/shared/api/settings";
import type { PostProps } from "@/shared/types";
import { getPostsInterest } from "@/shared/api/posts";
import { SearchList } from "@/entities/search/ui/search-list";

interface Props {
  post: PostProps;
  interestNews: PostProps[];
}

const SearchPage = ({ interestNews }: Props) => {
  return (
    <PostLayout
      left={<SearchList />}
      showNewsWidgets={false}
      interestPosts={interestNews}
    />
  );
};

export const getServerSideProps = async () => {
  // global settings
  const { settings, taxonomies, advert } = await getGeneralSettings();

  // interest news
  let interestNews: PostProps[] = [];
  try {
    interestNews = await getPostsInterest();
  } catch (error) {
    console.log("newspaper interest", error);
  }

  return {
    props: {
      interestNews,
      settings,
      taxonomies,
      advert,
    },
  };
};

export default SearchPage;

import { mainMenu, menuNewsItem, settings } from "@/shared/config";
import type { TaxonomiesProps } from "@/shared/types";
import { getTaxonomiesGroup } from "@/shared/api/taxonomies";

export const getGeneralSettings = async (isSSG = false) => {
  let taxonomies: TaxonomiesProps = { categories: [], geography: [], tags: [] };

  try {
    taxonomies = await getTaxonomiesGroup(isSSG);
    // remove news category
    taxonomies.categories = taxonomies.categories.filter(
      (cat) => cat.slug !== "news"
    );
  } catch (error) {
    console.log("settings taxonomies: ", error);
  }

  // TODO: check this code
  const mainNavigation = [
    {
      ...menuNewsItem,
      child: taxonomies.categories,
    },
    ...mainMenu,
  ];

  return {
    // TODO: check this code
    settings: {
      ...settings,
      menus: {
        main: mainNavigation,
      },
    },
    taxonomies,
  };
};

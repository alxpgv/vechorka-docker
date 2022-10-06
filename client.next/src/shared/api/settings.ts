import { api } from "@/shared/api/core";
import { mainMenu, menuNewsItem, settings } from "@/shared/config";
import type { TaxonomiesProps } from "@/shared/types";

export const getGeneralSettings = async (isSSG = false) => {
  let taxonomies: TaxonomiesProps = { categories: [], tags: [] };

  try {
    taxonomies = await api.get("taxonomies/group", isSSG);
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

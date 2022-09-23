import { api } from "@/services/api/core";
import { mainMenu, settings } from "@/config";
import type { TaxonomiesProps } from "@/types";

export const getGeneralSettings = async () => {
  let taxonomies: TaxonomiesProps = { categories: [], tags: [] };

  try {
    taxonomies = await api.get("taxonomies/group");
  } catch (error) {
    console.log("settings taxonomies: ", error);
  }

  const mainNavigation = [
    {
      id: 9999,
      slug: "news",
      name: "Новости",
      icon: "earth",
      child: taxonomies.categories,
    },
    ...mainMenu,
  ];

  return {
    settings: {
      ...settings,
      menus: {
        main: mainNavigation,
      },
    },
    taxonomies,
  };
};

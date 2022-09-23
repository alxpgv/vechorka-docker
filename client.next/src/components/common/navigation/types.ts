import { TaxonomyProps } from "@/types";

export interface MenuItemProps extends TaxonomyProps {
  icon?: string;
}

export interface MenuProps extends MenuItemProps {
  child?: MenuItemProps[];
}

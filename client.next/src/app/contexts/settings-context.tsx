import React, { createContext, PropsWithChildren, useContext } from "react";
import type { MenuProps } from "@/shared/ui/navigation/types";
import type { SEOProps } from "@/shared/ui/SEO";
import type { TaxonomiesProps } from "@/shared/types";

interface SettingsState extends SEOProps {
  siteUrl?: string;
  apiUrl?: string;
  uploadUrl?: string;
  menus?: {
    main: MenuProps[];
  };
  contacts?: any;
  taxonomies: TaxonomiesProps;
  advert: Record<string, string> | null;
}

interface SettingsProviderProps extends PropsWithChildren {
  value: SettingsState;
}

const initialContext = {
  taxonomies: { categories: [], geography: [], tags: [] },
  advert: null,
};

const SettingsContext = createContext<SettingsState>(initialContext);
SettingsContext.displayName = "SettingsContext";

export const SettingsProvider = ({
  children,
  value,
}: SettingsProviderProps) => {
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};

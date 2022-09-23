import React, { createContext, PropsWithChildren, useContext } from "react";
import type { MenuProps } from "@/components/common/navigation/types";
import type { SEOProps } from "@/components/common/SEO";
import type { TaxonomiesProps } from "@/types";

interface SettingsState extends SEOProps {
  siteUrl?: string;
  menus?: {
    main: MenuProps[];
  };
  contacts?: any;
  taxonomies: TaxonomiesProps;
}

interface SettingsProviderProps extends PropsWithChildren {
  value: SettingsState;
}

const initialContext = {
  taxonomies: { categories: [], tags: [] },
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

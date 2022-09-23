import React, { FC } from "react";
import { MenuProps } from "@/components/common/navigation/types";
import Link from "next/link";
import cn from "clsx";
import { useSettings } from "@/contexts/settings-context";
import { useRouter } from "next/router";
import { homeMenuItem } from "@/utils/menus";

interface NavCategoriesProps {
  className?: string;
}

const CategoriesView = ({
  title,
  items,
}: {
  title: string;
  items: MenuProps[];
}) => {
  const router = useRouter();

  const active = (currentSlug: string) => {
    const category = router.query.category || "news";
    return currentSlug === category;
  };

  return (
    <>
      <div className="my-3 text-16px text-white font-bold">{title}</div>
      <div className="flex flex-wrap gap-2 text-13px">
        {items.map(({ id, name, slug }) => {
          return (
            <Link key={id} href={`/news/${slug}`}>
              <a
                className={cn(
                  "flex items-center px-3 py-2 text-white hover:text-white hover:bg-blue-300",
                  active(slug) ? "bg-blue-300" : "bg-blue-100"
                )}
              >
                <span>{name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export const NavCategories: FC<NavCategoriesProps> = ({ className }) => {
  const { taxonomies } = useSettings();
  const categories = taxonomies?.categories;
  const geography = taxonomies?.tags;

  return (
    <div className={cn(className, "p-5 pt-2 bg-blue-200")}>
      {categories && categories.length > 0 && (
        <CategoriesView title="Новости" items={[homeMenuItem, ...categories]} />
      )}
      {geography && geography.length > 0 && (
        <CategoriesView title="География" items={geography} />
      )}
    </div>
  );
};

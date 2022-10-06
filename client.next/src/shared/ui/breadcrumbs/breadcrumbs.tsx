import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useSettings } from "@/app/contexts/settings-context";
import { menuHomeItem } from "@/shared/config";
import Link from "next/link";
import { Icon } from "@/shared/ui/icon";

interface BreadcrumbProps {
  id: number;
  slug: string;
  name: string;
}

const Separator = () => (
  <Icon name="arrow" className="h-[8px] w-[10px] stroke-grey-450 -rotate-90" />
);

export const Breadcrumbs = () => {
  const router = useRouter();
  const { taxonomies, menus } = useSettings();

  if (router.pathname === "/" || !taxonomies || !menus) return null;

  const segments = router.asPath.split("/");

  segments.shift();

  const breadcrumbs: BreadcrumbProps[] = [menuHomeItem];

  if (segments[0]) {
    const crumbItem = menus?.main?.find((item) => item.slug === segments[0]);
    crumbItem &&
      breadcrumbs.push({
        id: crumbItem.id,
        name: crumbItem.name,
        slug: `/${segments[0]}`,
      });

    if (segments[1]) {
      if (segments[0] === "news") {
        const allTaxonomies = [...taxonomies.categories, ...taxonomies.tags];
        const category = allTaxonomies.find((tax) => tax.slug === segments[1]);
        category &&
          breadcrumbs.push({
            id: category.id,
            slug: `/${segments[0]}/${category.slug}`,
            name: category.name,
          });
      } else if (crumbItem?.child?.length) {
        const childItem = crumbItem.child.find(
          (item) => item.slug === segments[1]
        );

        childItem &&
          breadcrumbs.push({
            id: childItem.id,
            slug: `/${segments[0]}/${childItem.slug}`,
            name: childItem.name,
          });
      }
    }
  }

  return (
    <ol
      className="flex items-center"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {breadcrumbs.map((crumb, index) => {
        return (
          <Fragment key={crumb.id}>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link href={crumb.slug}>
                <a itemProp="item" className="text-14px">
                  <span itemProp="name">{crumb.name}</span>
                </a>
              </Link>
              <meta itemProp="position" content={`${index + 1}`} />
            </li>

            {breadcrumbs.length > index + 1 ? (
              <li className="mx-2">
                <Separator />
              </li>
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
};

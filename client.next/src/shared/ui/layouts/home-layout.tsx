import React from "react";
import { PaperLinks } from "@/widgets/paper-links";
import { NewsCommentedDynamic } from "@/widgets/news-commented";
import { NewsTopDynamic } from "@/widgets/news-top";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import type { NextPage } from "next";
import { DynamicAdvert } from "@/shared/ui/advert";
import { useSettings } from "@/app/contexts/settings-context";

interface Props {
  left: React.ReactNode;
}

export const HomeLayout: NextPage<Props> = ({ left }) => {
  const { advert } = useSettings();

  return (
    <LayoutColumn
      left={left}
      right={
        <>
          {/* advert block 2 mobile 300x300 */}
          {advert && !!Number(advert.advert_block_2_mobile_visible) && (
            <DynamicAdvert
              className="block md:hidden my-6"
              type={advert.advert_block_2_mobile_type}
              size="300x300"
              imageUrl={advert.advert_block_2_mobile_image_url}
              href={advert.advert_block_2_mobile_href}
              htmlCode={advert.advert_block_2_mobile_html_code}
            />
          )}
          <div className="smx1:flex md:block">
            <NewsTopDynamic className="smx1:mr-3 md:mr-0" />
            {/* advert block 2 pc 300x600 */}
            {advert && !!Number(advert.advert_block_2_pc_visible) && (
              <DynamicAdvert
                className="hidden md:block mt-6 md:mt-12"
                type={advert.advert_block_2_pc_type}
                size="300x600"
                imageUrl={advert.advert_block_2_pc_image_url}
                href={advert.advert_block_2_pc_href}
                htmlCode={advert.advert_block_2_pc_html_code}
              />
            )}
            <NewsCommentedDynamic className="mt-6 smx1:mt-0 md:mt-12" />
          </div>

          {/* advert block 3 300x300 */}
          {advert && !!Number(advert.advert_block_3_visible) && (
            <DynamicAdvert
              className="mt-6 md:mt-12"
              type={advert.advert_block_3_type}
              size="300x300"
              imageUrl={advert.advert_block_3_image_url}
              href={advert.advert_block_3_href}
              htmlCode={advert.advert_block_3_html_code}
            />
          )}

          <PaperLinks />

          {/* advert block 4 pc 300x600 */}
          {advert && !!Number(advert.advert_block_4_pc_visible) && (
            <DynamicAdvert
              className="hidden md:block mt-6 md:mt-12"
              type={advert.advert_block_4_pc_type}
              size="300x600"
              imageUrl={advert.advert_block_4_pc_image_url}
              href={advert.advert_block_4_pc_href}
              htmlCode={advert.advert_block_4_pc_html_code}
            />
          )}
          {/* advert block 4 mobile 300x300 */}
          {advert && !!Number(advert.advert_block_4_mobile_visible) && (
            <DynamicAdvert
              className="block md:hidden mt-6"
              type={advert.advert_block_4_mobile_type}
              size="300x300"
              imageUrl={advert.advert_block_4_mobile_image_url}
              href={advert.advert_block_4_mobile_href}
              htmlCode={advert.advert_block_4_mobile_html_code}
            />
          )}
        </>
      }
    />
  );
};

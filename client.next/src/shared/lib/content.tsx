import React from "react";
import { GalleryByIds } from "@/widgets/gallery-by-ids";

export const parseContent = (body: string) => {
  body = replaceBlockquote(body);
  body = body.replace(/\t|\s\t/gi, "");

  const blocks = body?.split("\r\n");
  const components: Array<string | React.ReactNode> = [];
  let indexComponentType = 0;

  blocks?.length > 0 &&
    blocks.map((block) => {
      if (block) {
        const component = parseBlock(block);
        // html markup
        if (typeof component === "string") {
          if (!components[indexComponentType]) {
            components[indexComponentType] = component;
          } else {
            components[indexComponentType] += component;
          }
        }
        // react component
        if (typeof component === "object") {
          components[++indexComponentType] = component;
          indexComponentType++;
        }
      }
    });
  return components;
};

const parseBlock = (block: string) => {
  // const tagsExcludeRegex = /^<(?!strong|em).+?>/gim;
  const tagsExcludeRegex = /^<(strong|em).+?>/gim;
  let element: React.ReactNode = null;
  const matchTags = block.match(/^<.+>/gi);

  if (!matchTags && block) {
    if (block.match(/\[gallery/is)) {
      // gallery
      const gallery = parseGallery(block);
      if (gallery) {
        element = gallery;
      }
    } else {
      // if not tags, then this text wrapped by paragraph
      element = `<p>${block.trim()}</p>`;
    }
  }

  if (block.match(tagsExcludeRegex)) {
    element = `<p>${block.trim()}</p>`;
  }

  return element ?? block;
};

const parseGallery = (body: string) => {
  const idsRegex = /\[gallery.+ids=\\?"([\d,]+)\\?"/im;
  const colsRegex = /\[gallery.+columns=\\?"([\d]+)\\?"/im;
  const titleRegex = /\[gallery.+title=\\?"([\w\s\S].+?)\\?"/im;

  const matchIds = body.match(idsRegex);
  const matchCols = body.match(colsRegex);
  const matchTitle = body.match(titleRegex);

  const ids = matchIds && matchIds[1] ? matchIds[1] : null;
  const cols = matchCols && matchCols[1] ? matchCols[1] : 3;
  const title = matchTitle && matchTitle[1] ? matchTitle[1] : "";

  if (ids) {
    return <GalleryByIds ids={ids} title={title} perView={cols as number} />;
  }

  return null;
};

const replaceBlockquote = (body: string) => {
  return body?.replace(
    /<blockquote>(.*)<\/blockquote>/g,
    `<blockquote><svg viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
    </svg>$1</blockquote>`
  );
};

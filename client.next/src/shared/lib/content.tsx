import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { Gallery } from "@/shared/ui/gallery";

export const parseContent = (body: string) => {
  body = replaceBlockquote(body);
  body = body.replace(/\t|\s\t/gi, "");

  const blocks = body?.split("\r\n");
  const components: React.ReactNode[] = [];

  blocks?.length > 0 &&
    blocks.map((block) => {
      if (block) {
        const component = parseBlock(block);
        component && components.push(component);
      }
    });

  return components.join("");
};

const parseBlock = (block: string) => {
  const tagsRegex = /^<(?!strong|em).+?>/gim;
  const galleryRegex =
    /\[gallery.+ids=\\?"([\d,]+)\\?"(.+title=\\?"([\w\s\S]+)\\?")?/im;
  let element: React.ReactNode = null;

  const matchTags = block.match(tagsRegex);

  if (!matchTags) {
    // gallery
    const matchGallery = block.match(galleryRegex);
    if (matchGallery) {
      const galleryIds = matchGallery[1] && matchGallery[1].split(",");
      const galleryTitle = matchGallery[3] ?? "";
      const galleryComponent = galleryIds ? (
        <Gallery ids={galleryIds} title={galleryTitle} />
      ) : null;

      element =
        galleryComponent &&
        ReactDOMServer.renderToStaticMarkup(galleryComponent);
    } else {
      // if not tags, then this text wrapped by paragraph
      element = `<p>${block.trim()}</p>`;
    }
  }

  return element ?? block;
};

const replaceBlockquote = (body: string) => {
  return body?.replace(
    /<blockquote>(.*)<\/blockquote>/g,
    `<blockquote><svg viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
    </svg>$1</blockquote>`
  );
};

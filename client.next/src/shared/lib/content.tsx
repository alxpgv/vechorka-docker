import React from "react";
import { GalleryByIds } from "@/widgets/gallery-by-ids";
import { ImageCaption } from "@/shared/ui/image-preview/image-caption";

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

const parseToComponent = (block: string) => {
  // gallery
  if (block.match(/\[gallery/is)) {
    return createGallery(block);
  }

  // image with caption
  const imageWithCaption = block.match(
    /\[caption.+width="(\d+)"\]<img.+src="(.+?)".+\/>(.+)\[\/caption\]/im
  );
  if (imageWithCaption) {
    return createImageWithCaption(imageWithCaption);
  }

  return null;
};

const parseBlock = (block: string) => {
  let element: React.ReactNode = null;
  const tagsAllow = block?.match(/<(strong|em).+?>/gim);
  const isTag = block.match(/^<.+>/gi);

  if (block && !isTag) {
    element = parseToComponent(block);
  }

  if (!element && !tagsAllow) {
    element = `<p>${block.trim()}</p>`;
  }

  return element ?? block;
};

const createGallery = (body: string) => {
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

const createImageWithCaption = (data: string[]) => {
  if (!data.length) {
    return null;
  }

  const width = data[1] ?? 500;
  const src = data[2] ?? null;
  const caption = data[3] ?? null;

  if (src) {
    return (
      <div className="relative w-fit mx-auto mt-5">
        <img src={src} width={width} height="340" alt="" />
        <ImageCaption caption={caption} />
      </div>
    );
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

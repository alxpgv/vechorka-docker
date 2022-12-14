import { Injectable } from '@nestjs/common';
import { ImageWithSizes } from '../../types';
import { unserializeValue } from '../../utils/helpers';

@Injectable()
export class AttachmentService {
  public unserializeImageMeta(
    serializeValue: string,
    pathPrefix = '',
  ): ImageWithSizes {
    let image: ImageWithSizes = null;

    try {
      // unserialize php value
      const { image_meta = null, ...imageProps }: any =
        unserializeValue(serializeValue);

      if (imageProps && Object.keys(imageProps).length && imageProps.file) {
        const pathSegments = imageProps.file?.split('/');
        const path = pathSegments.slice(0, -1).join('/');
        const mimeType =
          imageProps.sizes?.thumbnail && imageProps.sizes.thumbnail['mime-type']
            ? imageProps.sizes.thumbnail['mime-type']
            : null;

        image = {
          width: imageProps.width,
          height: imageProps.height,
          url: `${pathPrefix}/${imageProps.file}`,
          mimeType,
          sizes: {
            large: {
              width: imageProps.sizes?.large?.width ?? null,
              height: imageProps.sizes?.large?.height ?? null,
              url: imageProps.sizes?.large?.file
                ? `${pathPrefix}/${path}/${imageProps.sizes?.large?.file}`
                : null,
              mimeType,
            },
            medium: {
              width: imageProps.sizes?.medium?.width ?? null,
              height: imageProps.sizes?.medium?.height ?? null,
              url: imageProps.sizes?.medium?.file
                ? `${pathPrefix}/${path}/${imageProps.sizes?.medium?.file}`
                : null,
              mimeType,
            },
            thumbnail: {
              width: imageProps.sizes?.thumbnail?.width ?? null,
              height: imageProps.sizes?.thumbnail?.height ?? null,
              url: imageProps.sizes?.thumbnail?.file
                ? `${pathPrefix}/${path}/${imageProps.sizes?.thumbnail?.file}`
                : null,
              mimeType,
            },
          },
        };
      }
    } catch (error) {
      console.log('unserializeImageMeta', error);
    }

    return image;
  }
}

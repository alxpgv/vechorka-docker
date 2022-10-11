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

      if (imageProps && Object.keys(imageProps).length) {
        const pathSegments = imageProps.file?.split('/');
        const path = pathSegments.slice(0, -1).join('/');

        image = {
          width: imageProps.width,
          height: imageProps.height,
          url: `${pathPrefix}/${imageProps.file}`,
          sizes: {
            large: {
              width: imageProps.sizes?.large?.width ?? null,
              height: imageProps.sizes?.large?.height ?? null,
              url: imageProps.sizes?.large?.file
                ? `${pathPrefix}/${path}/${imageProps.sizes?.large?.file}`
                : null,
            },
            // mediumSm: {
            //   width: imageProps.sizes?.medium_sm?.width ?? null,
            //   height: imageProps.sizes?.medium_sm?.height ?? null,
            //   url: imageProps.sizes?.medium_sm?.file
            //     ? `${pathPrefix}/${path}/${imageProps.sizes?.medium_sm?.file}`
            //     : null,
            // },
            medium: {
              width: imageProps.sizes?.medium?.width ?? null,
              height: imageProps.sizes?.medium?.height ?? null,
              url: imageProps.sizes?.medium?.file
                ? `${pathPrefix}/${path}/${imageProps.sizes?.medium?.file}`
                : null,
            },
            thumbnail: {
              width: imageProps.sizes?.thumbnail?.width ?? null,
              height: imageProps.sizes?.thumbnail?.height ?? null,
              url: imageProps.sizes?.thumbnail?.file
                ? `${pathPrefix}/${path}/${imageProps.sizes?.thumbnail?.file}`
                : null,
            },
          },
        };
      }
    } catch (error) {
      console.log('error transform image', error);
    }

    return image;
  }
}

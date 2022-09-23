export interface Image {
  width?: number;
  height?: number;
  filesize?: number;
  url?: string;
  mimeType?: string;
}

export interface ImageWithSizes extends Image {
  sizes?: {
    [key: string]: Image;
  };
}

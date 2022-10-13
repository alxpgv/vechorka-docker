import React, { useEffect, useRef, useState } from "react";
import cn from "clsx";
import { useKeenSlider } from "keen-slider/react";
import { getPosts } from "@/shared/api/posts";
import { PostProps } from "@/shared/types";
import { SimpleLoader } from "@/shared/ui/loaders";
import { Arrow } from "@/shared/ui/button";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";

interface Props {
  ids: string;
  title?: string;
  perView?: number;
  className?: string;
}

export const Gallery = ({ ids, title, perView = 3, className }: Props) => {
  const [images, setImages] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    // mode: "snap",
    slides: {
      perView: perView,
      spacing: 20,
    },
    created() {
      setSliderLoaded(true);
    },
  });

  useEffect(() => {
    setLoading(true);

    const fetchImages = async () => {
      try {
        const fetchedImages = await getPosts({
          limit: 30,
          postType: "attachment",
          includeIds: ids,
        });
        setImages(fetchedImages);
      } catch (e) {
        console.log("error");
      }
      setLoading(false);
    };

    ids && isVisible && fetchImages();
  }, [ids, isVisible]);

  if (!loading && (!ids.length || !images.length)) return null;

  return (
    <div className="mt-6 md:mt-12" ref={ref}>
      {loading && <SimpleLoader />}
      {!loading && images.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-7">
            <div>{title && <h3 className="text-grey-500">{title}</h3>}</div>
            {/* navigation */}
            {sliderLoaded && instanceRef.current && (
              <div className="flex">
                <Arrow
                  left
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                />

                <Arrow
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                />
              </div>
            )}
          </div>

          <div ref={sliderRef} className="keen-slider">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  "keen-slider__slide w-full grid grid-cols-[1fr_1fr] md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2.5fr_1fr_1fr] grid-rows-auto md:grid-rows-2 gap-4 select-none"
                )}
              >
                <div className="relative w-full md:row-span-2 col-span-2 md:col-span-1 h-[190px] sm:h-[260px] md:h-[420px] bg-grey-500">
                  image
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

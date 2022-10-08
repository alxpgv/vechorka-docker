import React, { useEffect, useRef, useState } from "react";
import { createNestedArray } from "@/shared/lib/helpers";
import { VideoItem } from "@/widgets/video-last-slider/video-item";
import { IconPlay } from "@/widgets/video-last-slider/icon-play";
import { useKeenSlider } from "keen-slider/react";
import cn from "clsx";
import { SimpleLoader } from "@/shared/ui/loaders";
import { VideoModal } from "@/widgets/video-last-slider/video-modal";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import { Arrow } from "@/widgets/video-last-slider/arrow";
import { getPosts } from "@/shared/api/posts";
import type { PostProps } from "@/shared/types";

type VideoGroupItems = Array<PostProps[]>;

export const VideoLastSlider = () => {
  const [videos, setVideos] = useState<VideoGroupItems>([]);
  const [activeVideo, setActiveVideo] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [dragged, setDragged] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    // mode: "snap",
    slides: {
      perView: 1,
      spacing: 20,
    },
    created() {
      setSliderLoaded(true);
    },
    // on production, for example in vercel, propagation click after drag in slide
    dragChecked: () => {
      setDragged(true);
    },
    slideChanged: () => {
      setDragged(false);
    },
  });

  useEffect(() => {
    setLoading(true);

    const fetchVideos = async () => {
      try {
        const fetchedVideos = await getPosts({
          limit: 20,
          postType: "video",
        });
        const groupVideos = createNestedArray<PostProps>(fetchedVideos);
        setVideos(groupVideos);
      } catch (e) {
        console.log("error");
      }
      setLoading(false);
    };

    isVisible && fetchVideos();
  }, [isVisible]);

  if (!loading && videos.length === 0) return null;

  return (
    <div className="mt-6 md:mt-12" ref={ref}>
      {loading && <SimpleLoader />}
      {!loading && videos.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-grey-500">Смотрите нас на Youtube</h2>
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

          {activeVideo && (
            <VideoModal
              video={activeVideo}
              onClose={() => setActiveVideo(null)}
            />
          )}

          <div ref={sliderRef} className="keen-slider">
            {videos.map((groupVideos, index) => (
              <div
                key={index}
                className={cn(
                  "keen-slider__slide w-full grid grid-cols-[1fr_1fr] md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2.5fr_1fr_1fr] grid-rows-auto md:grid-rows-2 gap-4 select-none"
                )}
              >
                {groupVideos.length > 0 &&
                  groupVideos.map((video, index) => {
                    /* first item */
                    if (index % 5 === 0) {
                      return (
                        <div
                          key={video.id}
                          className="relative w-full md:row-span-2 col-span-2 md:col-span-1 h-[190px] sm:h-[260px] md:h-[420px] bg-grey-500"
                          onClick={() => !dragged && setActiveVideo(video)}
                        >
                          <IconPlay size="md" />
                          <VideoItem item={video} />
                        </div>
                      );
                    } else {
                      /*other items*/
                      return (
                        <div
                          key={video.id}
                          className="relative w-full h-full min-h-[160px] bg-grey-500"
                          onClick={() => !dragged && setActiveVideo(video)}
                        >
                          <IconPlay size="sm" />
                          <VideoItem item={video} />
                        </div>
                      );
                    }
                  })}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

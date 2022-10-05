import React, { FC, useState } from "react";
import { Spinner } from "@/shared/ui/loaders/spinner";
import { Icon } from "@/shared/ui/icon";
import cn from "clsx";
import { useKey } from "@/shared/hooks/useKey";
import type { PostProps } from "@/shared/types";

interface VideoModalProps {
  video: PostProps;
  onClose: () => void;
}

export const VideoModal: FC<VideoModalProps> = ({ video, onClose }) => {
  const [loading, setLoading] = useState(true);
  useKey("Escape", onClose);
  const youtubeId = video.meta?.youtubeId;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur bg-black/80 z-20"
      role="dialog"
    >
      {/* close button */}
      <button
        className="absolute right-6 top-6 flex items-center justify-center w-[42px] h-[42px] cursor-pointer hover:scale-110 hover:bg-black transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <Icon name="close" className="w-[26px] h-[26px] stroke-white" />
      </button>
      {loading && <Spinner />}
      {/* iframe */}
      {youtubeId ? (
        <iframe
          className={cn(
            "w-[90%] max-h-[90%] min-h-[320px] aspect-video",
            loading && "opacity-50"
          )}
          src={`https://www.youtube.com/embed/${youtubeId}`}
          onLoad={() => setLoading(false)}
        />
      ) : (
        <span className="text-white">ID видео не задан</span>
      )}
    </div>
  );
};

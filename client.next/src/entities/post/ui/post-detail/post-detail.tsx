import React, { Fragment } from "react";
import type { PostProps } from "@/shared/types";
import { ImagePreview } from "@/shared/ui/image-preview";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { Heading } from "@/shared/ui/heading";
import { parseContent } from "@/shared/lib/content";
import { CommentForm } from "@/entities/comment/ui/comment-form";
import { CommentList } from "@/entities/comment/ui/comment-list";
import { PollView } from "@/entities/poll/ui/poll-view";
import { ShareLinks } from "@/shared/ui/share-links";
import { useRouter } from "next/router";
import { useSettings } from "@/app/contexts/settings-context";
import { textOverflow } from "@/shared/lib/string";

interface Props {
  post: PostProps;
  showComment?: boolean;
}

export const PostDetail = ({ post, showComment = false }: Props) => {
  const {
    id,
    title,
    excerpt,
    content,
    preview,
    commentCount,
    commentStatus,
    createdAt,
    meta,
    user,
  } = post;
  const components: Array<string | React.ReactNode> = content
    ? parseContent(content)
    : [];
  const views = meta?.views || null;
  const pollId = meta?.poll_id || null;
  const router = useRouter();
  const settings = useSettings();

  return (
    <>
      {preview && Object.keys(preview).length > 0 && (
        <div className="h-[260px] sm:h-[320px] lg:h-[460px] mb-5">
          <ImagePreview url={preview?.url} />
        </div>
      )}
      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      <PostMeta
        date={createdAt}
        time={createdAt}
        views={views}
        commentCount={commentCount}
      />
      {/* content parse */}
      {components &&
        components.map((component, index) => {
          if (typeof component === "string") {
            return (
              <div
                key={index}
                className="content"
                dangerouslySetInnerHTML={{ __html: component }}
              />
            );
          } else if (typeof component === "object") {
            return <Fragment key={index}>{component}</Fragment>;
          }
        })}
      <div className="flex flex-wrap">
        {/* poll */}
        {pollId && (
          <div className="w-full lg:w-[260px] lg:mr-8 mt-5">
            <PollView pollId={pollId} postId={id} />
          </div>
        )}
        <div className="w-full flex-1">
          {/* author */}
          {user && (
            <div className="mt-5 text-grey-500">
              <strong>Автор:</strong> {user}
            </div>
          )}
          <div className="mt-5">
            <ShareLinks
              url={`${settings.siteUrl}${router.asPath}`}
              title={title}
              text={excerpt ? excerpt : content ? textOverflow(content) : ""}
              imageUrl={
                preview?.url ? `${process.env.UPLOAD_HOST}/${preview?.url}` : ""
              }
              customers={["ok", "telegram", "vk", "whatsapp"]}
            />
          </div>
        </div>
      </div>
      {/* comments */}
      {showComment && (
        <div className="mt-8">
          {commentStatus === "open" || Number(commentCount) > 0 ? (
            <h3 className="text-grey-500">Комментарии</h3>
          ) : null}
          {commentStatus === "open" && (
            <div className="mt-5">
              <CommentForm postId={id} />
            </div>
          )}
          {Number(commentCount) > 0 && (
            <div className="mt-5">
              <CommentList postId={id} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

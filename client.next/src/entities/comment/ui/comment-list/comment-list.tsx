import React, { useEffect, useState } from "react";
import { getCommentByPostId } from "@/shared/api/comments";
import type { CommentProps } from "@/shared/types";
import Image from "next/image";
import { formatISODate, formatISOTime } from "@/shared/lib/date";

interface Props {
  postId: number;
}

export const CommentList = ({ postId }: Props) => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const comments = await getCommentByPostId(postId);
        if (comments?.length) {
          setComments(comments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.log("get comments", error);
      }
    };
    fetchComment();
  }, [postId]);

  if (!comments?.length) return null;

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div
            key={comment.id}
            className="flex border-b border-grey-200 my-5 pb-5 text-grey-400"
          >
            <div className="flex-shrink-0 h-[42px] w-[42px] sm:h-[60px] sm:w-[60px] mr-5">
              <Image
                src="/images/no-avatar.jpg"
                width="100%"
                height="100%"
                alt="avatar"
              />
            </div>
            <div>
              <div className="flex flex-wrap mb-3 text-14px">
                <strong className="mr-3">{comment.author}</strong>
                <span>
                  {formatISODate(comment.createdAt)}{" "}
                  {formatISOTime(comment.createdAt)}
                </span>
              </div>
              <div
                className="text-13px sm:text-14px"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

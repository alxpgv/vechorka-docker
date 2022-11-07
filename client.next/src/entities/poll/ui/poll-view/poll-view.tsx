import React, { useEffect, useState } from "react";
import type { PostProps } from "@/shared/types";
import { getPostById } from "@/shared/api/posts";
import { PollForm } from "@/entities/poll/ui/poll-form";

interface Props {
  pollId: number;
}

export const PollView = ({ pollId }: Props) => {
  const [poll, setPoll] = useState<PostProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostById(pollId, { withMeta: true });
        setPoll(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pollId]);

  // [
  // {
  // postId: 123,
  // pollId: 333,
  // choiceKey?: poll_list_item_1
  // }
  // ]

  // poll_results: {
  // poll_id: 333,
  // results: {
  // poll_list_item_1: 10,
  // poll_list_item_2: 20,
  // }
  // }

  if (!poll) return null;

  return (
    <div>
      <PollForm poll={poll} />
    </div>
  );
};

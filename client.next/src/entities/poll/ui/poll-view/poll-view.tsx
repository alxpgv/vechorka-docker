import React, { useEffect, useState } from "react";
import type { PostProps } from "@/shared/types";
import { getPostById } from "@/shared/api/posts";
import { PollForm } from "@/entities/poll/ui/poll-form";
import { PollResult } from "@/entities/poll/ui/poll-result";
import cn from "clsx";

interface Props {
  postId: number;
  pollId: number;
}

export const PollView = ({ postId, pollId }: Props) => {
  const [poll, setPoll] = useState<PostProps | null>(null);
  const [results, setResults] = useState(null);

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

  if (!poll) return null;

  return (
    <div className={cn("p-8 sm:p-10", results ? "bg-blue-200" : "bg-grey-100")}>
      {!results && (
        <PollForm
          poll={poll}
          postId={postId}
          onReply={(data) => setResults(data)}
        />
      )}
      {results && <PollResult poll={poll} results={results} />}
    </div>
  );
};

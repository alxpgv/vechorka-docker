import React, { FormEvent, useState } from "react";
import type { PostProps } from "@/shared/types";
import { getFieldsRepeater } from "@/shared/lib/meta-fields";
import { Button } from "@/shared/ui/buttons";
import { addPostPollReply } from "@/shared/api/posts";

interface Props {
  postId: number;
  poll: PostProps;
  onReply?: (data: any) => void;
}

export const PollForm = ({ postId, poll, onReply }: Props) => {
  const [activeKey, setActiveKey] = useState("");
  const { id: pollId, title, meta } = poll;
  const pollList = getFieldsRepeater(meta, "poll_list");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (activeKey) {
      const addPollReply = async () => {
        try {
          const data = await addPostPollReply({
            postId,
            pollId,
            pollKey: activeKey,
          });

          if (data?.results && onReply) {
            onReply(data.results);
          }
        } catch (error) {
          console.log(error);
        }
      };
      addPollReply();
    }
  };

  console.log(activeKey);

  return (
    <div>
      {title && <h5 className="text-center text-grey-500 mb-5">{title}</h5>}
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          {pollList &&
            pollList.length > 0 &&
            pollList.map((item) => {
              const [key, value] = Object.entries(item)[0];
              return (
                <div key={key} className="flex mb-3">
                  <input
                    className="mr-3 cursor-pointer"
                    id={key}
                    type="radio"
                    name="poll"
                    value={key}
                    onChange={() => setActiveKey(key)}
                    checked={activeKey === key}
                  />
                  <label
                    className="text-grey-500 text-14px cursor-pointer"
                    htmlFor={key}
                  >
                    {value}
                  </label>
                </div>
              );
            })}
        </div>
        <div className="text-center">
          <Button
            type="submit"
            variant="filled-secondary"
            size="md"
            disabled={!Boolean(activeKey)}
          >
            Голосовать
          </Button>
        </div>
      </form>
    </div>
  );
};

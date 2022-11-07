import React, { FormEvent } from "react";
import type { PostProps } from "@/shared/types";
import { getFieldsRepeater } from "@/shared/lib/meta-fields";

export const PollForm = ({ poll }: { poll: PostProps }) => {
  const { id, title, meta } = poll;
  const pollList = getFieldsRepeater(meta, "poll_list");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  console.log(id, title, meta, pollList);

  return (
    <div className="text-center">
      {title && <h5 className="text-grey-500">{title}</h5>}
      <form onSubmit={onSubmit}>
        <input id="radio1" type="radio" name="poll" value="" />
        <label htmlFor="radio1">radio - 1</label>
      </form>
    </div>
  );
};

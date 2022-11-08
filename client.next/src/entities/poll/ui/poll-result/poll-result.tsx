import React from "react";
import { PostProps } from "@/shared/types";
import { getFieldsRepeater } from "@/shared/lib/meta-fields";

interface Props {
  poll: PostProps;
  results: Record<string, number>;
}

export const PollResult = ({ poll, results }: Props) => {
  const { title, meta } = poll;
  const pollList = getFieldsRepeater(meta, "poll_list");

  const total = Object.values(results).reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );

  return (
    <div>
      {title && <h5 className="text-center text-white mb-5">{title}</h5>}
      <div className="space-y-5">
        {pollList &&
          pollList.length > 0 &&
          pollList.map((item) => {
            const [key, value] = Object.entries(item)[0];
            const progress = Math.ceil((results[key] / total) * 100);
            return (
              <div key={key} className="text-white text-14px">
                <div>{value}</div>
                <div className="w-full h-1 mt-2 bg-grey-100">
                  <div
                    className="h-1 bg-blue-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

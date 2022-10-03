import React, { FC } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import cn from "clsx";
import useDrag from "@/news/components/news-tabs/useDrag";
import type { TaxonomyProps } from "@/types";
import { LeftArrow, RightArrow } from "@/news/components/news-tabs/arrows";

interface NewsTabsProps {
  tabs: TaxonomyProps[];
  active?: TaxonomyProps;
  onChange?: (tab: TaxonomyProps) => void;
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

export const NewsTabs: FC<NewsTabsProps> = ({ tabs, active, onChange }) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const handleItemClick = (tab: TaxonomyProps) => () => {
    if (dragging) {
      return false;
    }

    onChange ? onChange(tab) : null;
  };

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="mb-5 overflow-x-hidden" onMouseLeave={dragStop}>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        scrollContainerClassName="tab-scroll-container"
        wrapperClassName="tab-scroll-wrapper"
        itemClassName="tab-scroll-item"
      >
        {tabs.map((tab) => {
          return (
            <div
              key={tab.id}
              className={cn(
                "px-3 py-2 text-14px cursor-pointer select-none transition-colors",
                active?.id === tab.id
                  ? "bg-blue-300 text-white"
                  : "bg-grey-100 text-grey-400 [@media(hover:hover){&:hover}]:text-white [@media(hover:hover){&:hover}]:bg-blue-300"
              )}
              onClick={handleItemClick(tab)}
            >
              {tab.name}
            </div>
          );
        })}
      </ScrollMenu>
    </div>
  );
};

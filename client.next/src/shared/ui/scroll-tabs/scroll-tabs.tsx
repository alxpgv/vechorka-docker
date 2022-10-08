import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import cn from "clsx";
import useDrag from "@/shared/ui/scroll-tabs/useDrag";
import type { TaxonomyProps } from "@/shared/types";
import { LeftArrow, RightArrow } from "@/shared/ui/scroll-tabs/arrows";

interface Props {
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

export const ScrollTabs = ({ tabs, active, onChange }: Props) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  if (!tabs || tabs.length === 0) return null;

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const tabClick = (tab: TaxonomyProps) => () => {
    if (dragging) {
      return false;
    }
    onChange ? onChange(tab) : null;
  };

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
              onClick={tabClick(tab)}
            >
              {tab.name}
            </div>
          );
        })}
      </ScrollMenu>
    </div>
  );
};

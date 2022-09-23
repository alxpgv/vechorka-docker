import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import cn from "clsx";
import { Icon } from "@/components/ui/icon";

const Arrow = ({
  children,
  disabled,
  hidden,
  left = false,
  onClick,
}: {
  children?: React.ReactNode;
  disabled: boolean;
  hidden?: boolean;
  left?: boolean;
  onClick: VoidFunction;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        hidden && "sm:hidden",
        "hidden sm:flex relative items-center justify-center w-[40px] h-full bg-grey-100 select-none cursor-pointer select-touch-none transition-colors",
        left && "border-r-2 border-r-white",
        !left && "border-l-2 border-l-white",
        disabled ? "opacity-30" : "group active:bg-blue-300"
      )}
    >
      <Icon
        name="arrow"
        className={cn(
          "w-[16px] h-[16px] stroke-grey-450 group-active:stroke-white",
          left ? "ml-2 rotate-90" : "mr-2 -rotate-90"
        )}
      />

      {children}
    </button>
  );
};

export const LeftArrow = () => {
  const {
    isFirstItemVisible,
    isLastItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  if (!initComplete) return null;
  return (
    <Arrow
      disabled={disabled}
      hidden={isFirstItemVisible && isLastItemVisible}
      left
      onClick={() => scrollPrev()}
    />
  );
};

export const RightArrow = () => {
  const {
    isFirstItemVisible,
    isLastItemVisible,
    scrollNext,
    initComplete,
    visibleItemsWithoutSeparators,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete ||
      (!visibleItemsWithoutSeparators.length && isLastItemVisible)
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  if (!initComplete) return null;
  return (
    <Arrow
      disabled={disabled}
      hidden={isFirstItemVisible && isLastItemVisible}
      onClick={() => scrollNext()}
    />
  );
};

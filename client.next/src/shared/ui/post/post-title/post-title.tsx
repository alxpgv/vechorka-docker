import React from "react";
import Link from "next/link";
import cn from "clsx";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";

interface Props {
  className?: string;
  href?: string;
  title: string;
  tag?: HeadingTag;
  color?: "light" | "dark";
}

export const PostTitle = ({
  className,
  href,
  title,
  tag = "div",
  color = "dark",
}: Props) => {
  const classes = {
    "link-primary": color === "dark",
    "link-light": color === "light",
  };

  const Title = ({ className }: { className?: string }) =>
    React.createElement(tag, { className }, title);

  return (
    <>
      {href ? (
        <Link href={href} prefetch={false}>
          <a className={cn(className, classes)}>
            <Title />
          </a>
        </Link>
      ) : (
        <Title className={cn(className, classes)} />
      )}
    </>
  );
};

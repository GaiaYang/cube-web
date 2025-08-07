import cn from "@/utils/cn";
import React from "react";

export interface ArticleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

export default function Article({
  children,
  className,
  ...props
}: ArticleProps) {
  return (
    <article
      {...props}
      className={cn(
        "prose dark:prose-invert",
        "prose-sm md:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl",
        "w-full max-w-none grow",
        "px-6 py-12",
        className,
      )}
    >
      {children}
    </article>
  );
}

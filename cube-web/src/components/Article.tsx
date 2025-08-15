import React from "react";

import cn from "@/utils/cn";

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
        // "prose-sm md:prose-base",
        "w-full max-w-none grow",
        "px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </article>
  );
}

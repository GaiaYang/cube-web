import React from "react";

import cn from "@/utils/cn";

export interface HeaderSectionProps {
  title?: string | null;
  description?: string | null;
  eyebrow?: string | null;
}

export default function HeaderSection({
  title,
  description,
  eyebrow,
}: HeaderSectionProps) {
  return (
    <div className={cn("w-full", "px-6 lg:px-8", "py-24 sm:py-32")}>
      <div className="mx-auto w-full max-w-2xl text-center">
        {eyebrow ? (
          <p className="text-primary text-base leading-7 font-semibold">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2
            className={cn(
              "text-base-content text-5xl font-semibold tracking-tight sm:text-7xl",
              { "mt-2": Boolean(eyebrow) },
            )}
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            className={cn(
              "text-base-content/40 text-lg font-medium text-pretty sm:text-xl/8",
              { "mt-8": Boolean(title) || Boolean(eyebrow) },
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

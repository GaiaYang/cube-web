import cn from "@/utils/cn";
import React from "react";

export interface ContentSectionProps {
  title?: string | null;
  description?: string | null;
  eyebrow?: string | null;
}

export default function ContentSection({
  title,
  description,
  eyebrow,
}: ContentSectionProps) {
  const hasTitle = Boolean(title);
  const hasEyebrow = Boolean(eyebrow);

  return (
    <div className="max-w-(--container-2xl)">
      {eyebrow ? (
        <p className="text-primary text-base/7 font-semibold">{eyebrow}</p>
      ) : null}
      {title ? (
        <h1
          className={cn(
            "text-base-content font-semibold tracking-tight text-pretty",
            "text-4xl sm:text-5xl",
            {
              "mt-2": hasEyebrow,
            },
          )}
        >
          {title}
        </h1>
      ) : null}
      {description ? (
        <p
          className={cn("text-base-content/80 text-xl/8", {
            "mt-6": hasTitle || hasEyebrow,
          })}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

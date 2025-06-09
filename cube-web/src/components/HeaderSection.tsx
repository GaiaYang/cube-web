import React from "react";

import cn from "@/utils/cn";

export interface HeaderSectionProps {
  title?: string;
  description?: string;
}

export default function HeaderSection({
  title,
  description,
}: HeaderSectionProps) {
  return (
    <div className={cn("w-full", "px-6 lg:px-8", "py-24 sm:py-32")}>
      <div className="mx-auto w-full max-w-2xl text-center">
        <h2 className="text-base-content text-5xl font-semibold tracking-tight sm:text-7xl">
          {title}
        </h2>
        <p className="text-base-content/40 mt-8 text-lg font-medium text-pretty sm:text-xl/8">
          {description}
        </p>
      </div>
    </div>
  );
}

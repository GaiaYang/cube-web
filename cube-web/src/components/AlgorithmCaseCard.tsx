import React from "react";

import cn from "@/utils/cn";

export interface AlgorithmCaseCardProps {
  name?: string | null;
  /** 標籤 */
  tag?: string | null;
}

export default function AlgorithmCaseCard({
  name,
  tag,
  children,
}: React.PropsWithChildren<AlgorithmCaseCardProps>) {
  return (
    <div className={cn("card", "border-base-300 border", "dark:bg-base-200")}>
      <figure className="aspect-square w-full p-4">
        {children ?? <div aria-hidden className="skeleton h-full w-full" />}
      </figure>
      <div className="card-body items-center text-center">
        {_renderTitle(name)}
        {_renderBadge(tag)}
      </div>
    </div>
  );
}

function _renderTitle(param: AlgorithmCaseCardProps["name"]) {
  if (param === undefined) {
    return <div aria-hidden className="skeleton h-[18px] w-full" />;
  }

  if (param === null) {
    return null;
  }

  return <h3 className="card-title">{param}</h3>;
}

function _renderBadge(param?: AlgorithmCaseCardProps["tag"]) {
  if (param === undefined) {
    return <div aria-hidden className="skeleton h-7 w-full" />;
  }

  if (param === null) {
    return null;
  }

  return <p className="badge badge-soft badge-primary badge-lg">{param}</p>;
}

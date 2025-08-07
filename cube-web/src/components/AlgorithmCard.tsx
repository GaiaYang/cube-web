import React from "react";

export interface AlgorithmCardProps {
  name?: string;
  category?: string;
}

export default function AlgorithmCard({
  name,
  category,
  children,
}: React.PropsWithChildren<AlgorithmCardProps>) {
  return (
    <div className="card">
      <div className="card-body items-center text-center">
        <figure className="aspect-square w-full">
          {children ?? <div aria-hidden className="skeleton h-full w-full" />}
        </figure>
        {name ? (
          <h3 className="card-title">{name}</h3>
        ) : (
          <div aria-hidden className="skeleton h-[18px] w-full" />
        )}
        {category ? (
          <p className="badge badge-soft badge-primary badge-lg">{category}</p>
        ) : (
          <div aria-hidden className="skeleton h-7 w-full" />
        )}
      </div>
    </div>
  );
}

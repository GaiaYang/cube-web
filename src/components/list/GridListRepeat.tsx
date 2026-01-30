"use client";

import { useMemo } from "react";

import GridList, { type GridListProps } from "./GridList";

export interface GridListRepeatProps extends Omit<
  GridListProps<{ id: number }>,
  "data"
> {
  count: number;
}

export default function GridListRepeat({
  count,
  ...props
}: GridListRepeatProps) {
  const data = useMemo(
    () => Array.from({ length: count }).map((_, index) => ({ id: index + 1 })),
    [count],
  );
  return <GridList {...props} data={data} />;
}

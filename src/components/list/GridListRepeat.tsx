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
  const data = Array.from({ length: count }).map((_, index) => ({
    id: index + 1,
  }));
  return <GridList {...props} data={data} />;
}

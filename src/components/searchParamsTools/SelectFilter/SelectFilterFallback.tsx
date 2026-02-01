import cn from "@/utils/cn";

export type SelectFilterFallbackProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function SelectFilterFallback(props: SelectFilterFallbackProps) {
  return (
    <div
      {...props}
      className={cn("inline-flex items-stretch", props.className)}
      aria-busy="true"
    >
      <div
        className={cn(
          "skeleton inline-flex h-10 shrink",
          "w-[calc(clamp(3rem,20rem,100%)+(var(--spacing)*10))]",
        )}
      />
    </div>
  );
}

import cn from "@/utils/cn";

export type SelectFilterFallbackProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function SelectFilterFallback(props: SelectFilterFallbackProps) {
  return (
    <div
      {...props}
      className={cn("skeleton", props.className)}
      aria-busy="true"
    >
      <div className="h-10 w-[clamp(3rem,20rem,100%)]" />
      <div className="w-10" />
    </div>
  );
}

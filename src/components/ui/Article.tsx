import cn from "@/utils/cn";

export type ArticleProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export default function Article({
  children,
  className,
  ...props
}: ArticleProps) {
  return (
    <article
      {...props}
      className={cn(
        "prose prose-sm md:prose-base",
        "dark:prose-invert max-w-none grow",
        className,
      )}
    >
      {children}
    </article>
  );
}

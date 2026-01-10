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
        "prose dark:prose-invert",
        "w-full max-w-none grow",
        "px-6 py-12",
        className,
      )}
    >
      {children}
    </article>
  );
}

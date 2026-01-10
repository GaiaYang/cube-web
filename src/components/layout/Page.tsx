import cn from "@/utils/cn";

/** 頁面佈局
 *
 * > 使用 `<main />`
 */
export default function PageLayout({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <main {...props} className={cn("px-4 sm:px-6 lg:px-8", "py-10", className)}>
      {children}
    </main>
  );
}

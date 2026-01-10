import cn from "@/utils/cn";

import Card from "@/components/ui/Card";

export interface AlgorithmCaseCardProps {
  /** 公式圖案 */
  renderDiagram?: React.ReactNode;
  /** 名稱 */
  name?: string | null;
  /** 標籤 */
  tag?: string | null;
}

export default function AlgorithmCaseCard({
  name,
  tag,
  renderDiagram,
}: AlgorithmCaseCardProps) {
  return (
    <Card className="card-sm md:card-md">
      <div className={cn("px-4 md:px-6", "pt-4 md:pt-6")}>
        <figure className="aspect-square w-full">
          {renderDiagram ?? (
            <div aria-hidden className="skeleton h-full w-full" />
          )}
        </figure>
      </div>
      <div className="card-body items-center text-center">
        {_renderTitle(name)}
        {_renderBadge(tag)}
      </div>
    </Card>
  );
}

function _renderTitle(param: AlgorithmCaseCardProps["name"]) {
  if (param === undefined) {
    return <div aria-hidden className="skeleton h-4.5 w-full" />;
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

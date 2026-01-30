import Card from "@/components/ui/Card";

export interface AlgorithmCaseCardProps {
  isLoading?: boolean;
  /** 公式圖案 */
  renderDiagram?: React.ReactNode;
  /** 名稱 */
  name?: string | null;
  /** 標籤 */
  tag?: string | null;
}

export default function AlgorithmCaseCard({
  isLoading,
  name,
  tag,
  renderDiagram,
}: AlgorithmCaseCardProps) {
  return (
    <Card>
      <div className="px-4 pt-4">
        <figure className="aspect-square w-full">
          {_renderDiagram(renderDiagram, isLoading)}
        </figure>
      </div>
      <div className="card-body items-center text-center">
        {_renderTitle(name, isLoading)}
        {_renderBadge(tag, isLoading)}
      </div>
    </Card>
  );
}

function _renderDiagram(
  param?: AlgorithmCaseCardProps["renderDiagram"],
  isLoading?: boolean,
) {
  if (isLoading || param === undefined) {
    return <div aria-hidden className="skeleton h-full w-full" />;
  }

  if (param === null) {
    return null;
  }

  return param;
}

function _renderTitle(
  param: AlgorithmCaseCardProps["name"],
  isLoading?: boolean,
) {
  if (isLoading || param === undefined) {
    return <div aria-hidden className="skeleton h-4.5 w-full" />;
  }

  if (param === null) {
    return null;
  }

  return <h3 className="card-title">{param}</h3>;
}

function _renderBadge(
  param?: AlgorithmCaseCardProps["tag"],
  isLoading?: boolean,
) {
  if (isLoading || param === undefined) {
    return <div aria-hidden className="skeleton h-7 w-full" />;
  }

  if (param === null) {
    return null;
  }

  return <p className="badge badge-soft badge-primary badge-lg">{param}</p>;
}

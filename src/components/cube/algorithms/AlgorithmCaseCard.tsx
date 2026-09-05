import { Badge } from "@/components/daisy-ui/badge";
import {
  Card,
  CardBody,
  CardFigure,
  CardTitle,
} from "@/components/daisy-ui/card";
import { Skeleton } from "@/components/daisy-ui/skeleton";

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
        <CardFigure className="aspect-square w-full">
          {_renderDiagram(renderDiagram, isLoading)}
        </CardFigure>
      </div>
      <CardBody className="items-center text-center">
        {_renderTitle(name, isLoading)}
        {_renderBadge(tag, isLoading)}
      </CardBody>
    </Card>
  );
}

function _renderDiagram(
  param?: AlgorithmCaseCardProps["renderDiagram"],
  isLoading?: boolean,
) {
  if (isLoading || param === undefined) {
    return <Skeleton aria-hidden className="h-full w-full" />;
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
    return <Skeleton aria-hidden className="h-4.5 w-full" />;
  }

  if (param === null) {
    return null;
  }

  return <CardTitle>{param}</CardTitle>;
}

function _renderBadge(
  param?: AlgorithmCaseCardProps["tag"],
  isLoading?: boolean,
) {
  if (isLoading || param === undefined) {
    return <Skeleton aria-hidden className="h-7 w-full" />;
  }

  if (param === null) {
    return null;
  }

  return (
    <Badge variant="soft" color="primary" size="lg">
      {param}
    </Badge>
  );
}

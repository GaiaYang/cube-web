import type { OLLCaseId } from "@/types/cube/333";

import LastLayerDiagram, {
  type LastLayerDiagramProps,
} from "@/components/cube/333/diagram/LastLayerDiagram";
import AlgorithmDisplay from "@/components/cube/AlgorithmDisplay";
import ExternalLink from "@/components/ExternalLink";

export interface AlgorithmTableRow {
  colorMap: LastLayerDiagramProps["colorMap"];
  caseId: OLLCaseId;
  algorithm: string | string[];
  description?: string;
}

interface AlgorithmsTableProps {
  algorithms: AlgorithmTableRow[];
  getOriginalAlgorithmUrl?: (params: AlgorithmTableRow) => string;
}

export default function AlgorithmsTable({
  algorithms,
  getOriginalAlgorithmUrl,
}: AlgorithmsTableProps) {
  function _renderItem(item: AlgorithmTableRow, index: number) {
    const href = getOriginalAlgorithmUrl?.(item);

    return (
      <tr key={index}>
        <td>
          <LastLayerDiagram colorMap={item.colorMap} size={128} />
        </td>
        <td className="w-full">
          <div className="not-prose mb-4 flex flex-col items-start gap-2">
            {Array.isArray(item.algorithm)
              ? item.algorithm.map(_renderAlgorithm)
              : _renderAlgorithm(item.algorithm)}
          </div>
          {item.description}
        </td>
        <td className="text-nowrap">
          {href ? (
            <ExternalLink href={href} className="link link-primary">
              原始公式
            </ExternalLink>
          ) : (
            <span>無</span>
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="not-prose overflow-x-auto">
      <table className="table min-w-(--container-2xl)">
        <thead>
          <tr>
            <th className="text-center">情況</th>
            <th>公式</th>
            <th className="text-center">原始案例</th>
          </tr>
        </thead>
        <tbody>{algorithms.map(_renderItem)}</tbody>
      </table>
    </div>
  );
}

function _renderAlgorithm(item: string) {
  return <AlgorithmDisplay algorithm={item} key={item} />;
}

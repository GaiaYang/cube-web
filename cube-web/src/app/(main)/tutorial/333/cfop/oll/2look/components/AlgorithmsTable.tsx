import React from "react";

import AlgorithmDisplay from "@/components/cube/AlgorithmDisplay";
import NewTabLink from "@/components/NewTabLink";

export interface AlgorithmTableRow<TPattern, TCaseId extends string> {
  pattern: TPattern;
  caseId: TCaseId;
  algorithms: string | string[];
  description?: string;
}

interface AlgorithmsTableProps<TPattern, TCaseId extends string> {
  cases: AlgorithmTableRow<TPattern, TCaseId>[];
  renderPattern?: (
    params: AlgorithmTableRow<TPattern, TCaseId>,
  ) => React.ReactNode;
  getOriginalAlgorithmUrl?: (
    params: AlgorithmTableRow<TPattern, TCaseId>,
  ) => string;
}

export default function AlgorithmsTable<TPattern, TCaseId extends string>({
  cases,
  renderPattern,
  getOriginalAlgorithmUrl,
}: AlgorithmsTableProps<TPattern, TCaseId>) {
  function _renderItem(
    item: AlgorithmTableRow<TPattern, TCaseId>,
    index: number,
  ) {
    const href = getOriginalAlgorithmUrl?.(item);

    return (
      <tr key={index}>
        <td>{renderPattern?.(item)}</td>
        <td className="w-full">
          <div className="not-prose mb-4 flex flex-col items-start gap-2">
            {Array.isArray(item.algorithms)
              ? item.algorithms.map(_renderAlgorithm)
              : _renderAlgorithm(item.algorithms)}
          </div>
          {item.description}
        </td>
        <td className="text-nowrap">
          {href ? (
            <NewTabLink href={href}>原始公式</NewTabLink>
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
        <tbody>{cases.map(_renderItem)}</tbody>
      </table>
    </div>
  );
}

function _renderAlgorithm(item: string) {
  return <AlgorithmDisplay algorithm={item} key={item} />;
}

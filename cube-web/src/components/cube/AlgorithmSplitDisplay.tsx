import { Fragment } from "react";

import cn from "@/utils/cn";
import AlgorithmDisplay from "./AlgorithmDisplay";

export interface AlgorithmSplitDisplayProps {
  /** 所有公式段落文字 */
  algorithm?: string[];
  /**
   * 每個群組的索引範圍
   * 例如 [[0,2],[3]] → 第一群組 0~2，第二群組 3~最後
   */
  groups?: number[][];
  placeholder?: string;
  className?: string;
}

export default function AlgorithmSplitDisplay({
  algorithm,
  groups,
  placeholder,
  className,
}: AlgorithmSplitDisplayProps) {
  if (!algorithm || algorithm.length === 0) {
    return <AlgorithmDisplay placeholder={placeholder} className={className} />;
  }

  if (!groups || groups.length === 0) {
    // 沒有群組就直接用 + 連接全部段落
    return (
      <GroupContainer className={className}>
        {algorithm.map(_renderCell)}
      </GroupContainer>
    );
  }

  return (
    <GroupContainer className={className}>
      {groups.map((item, index, array) => {
        // 計算群組內 index 範圍
        const start = item[0];
        const end = item.length > 1 ? item[1] : algorithm.length - 1;
        const groupSegments = algorithm.slice(start, end + 1);

        return (
          <Fragment key={index}>
            <GroupContainer>
              {/* 群組括號 */}
              <SymbolElement type="left_bracket" />
              {groupSegments.map(_renderCell)}
              <SymbolElement type="right_bracket" />
            </GroupContainer>
            {/* 群組之間 + */}
            {_renderPlusSymbol(index, array)}
          </Fragment>
        );
      })}
    </GroupContainer>
  );
}

function SymbolElement({
  type,
}: {
  type: "left_bracket" | "right_bracket" | "plus";
}) {
  let mark = "";
  switch (type) {
    case "left_bracket":
      mark = "(";
      break;
    case "right_bracket":
      mark = ")";
      break;
    case "plus":
      mark = "+";
      break;
    default:
      break;
  }

  return (
    <span aria-hidden="true" className="font-mono text-sm select-none">
      {mark}
    </span>
  );
}

function GroupContainer({
  children,
  className,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn("not-prose flex flex-wrap items-center gap-1", className)}
    >
      {children}
    </div>
  );
}

function _renderPlusSymbol(index: number, array: unknown[]) {
  if (index < array.length - 1) return <SymbolElement type="plus" />;
  return null;
}

function _renderCell(item: string, index: number, array: string[]) {
  return (
    <Fragment key={index}>
      <AlgorithmDisplay algorithm={item} />
      {_renderPlusSymbol(index, array)}
    </Fragment>
  );
}

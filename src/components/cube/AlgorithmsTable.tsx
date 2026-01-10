import AlgorithmDisplay from "./AlgorithmDisplay";
import NewTabLink from "@/components/NewTabLink";

export interface AlgorithmTableRow<TPattern, TCaseId extends string> {
  pattern: TPattern;
  caseId: TCaseId;
  algorithms: string | string[];
  description?: string;
}

interface AlgorithmsTableProps<TPattern, TCaseId extends string> {
  rows: AlgorithmTableRow<TPattern, TCaseId>[];
  renderPattern?: (
    params: AlgorithmTableRow<TPattern, TCaseId>,
  ) => React.ReactNode;
  getOriginalUrl?: (params: AlgorithmTableRow<TPattern, TCaseId>) => string;
}

/** 公式表格 */
export default function AlgorithmsTable<TPattern, TCaseId extends string>({
  rows,
  renderPattern,
  getOriginalUrl,
}: AlgorithmsTableProps<TPattern, TCaseId>) {
  return (
    <TableContainer>
      <Table>
        <TableHead />
        <TableBody>
          {rows.map((item, index) => (
            <TableRow
              key={index}
              renderPattern={renderPattern?.(item)}
              renderContent={
                <>
                  <div className="mb-4 flex flex-col items-start gap-2">
                    {(Array.isArray(item.algorithms)
                      ? item.algorithms
                      : [item.algorithms]
                    ).map(_renderAlgorithm)}
                  </div>
                  {item.description}
                </>
              }
              href={getOriginalUrl?.(item)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function _renderAlgorithm(item: string) {
  return <AlgorithmDisplay algorithm={item} key={item} />;
}

export function TableContainer({ children }: React.PropsWithChildren) {
  return <div className="not-prose overflow-x-auto">{children}</div>;
}

export function Table({ children }: React.PropsWithChildren) {
  return <table className="table min-w-2xl">{children}</table>;
}

export function TableBody(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >,
) {
  return <tbody {...props} />;
}

export function TableHead() {
  return (
    <thead>
      <tr>
        <th className="text-center">情況</th>
        <th className="w-full">公式</th>
        <th className="text-center">原始案例</th>
      </tr>
    </thead>
  );
}

export interface TableRowProps {
  href?: string;
  renderPattern?: React.ReactNode;
  renderContent?: React.ReactNode;
}

export function TableRow({
  href,
  renderPattern,
  renderContent,
}: TableRowProps) {
  return (
    <tr>
      <td>{renderPattern}</td>
      <td>{renderContent}</td>
      <td className="text-nowrap">
        {href ? <NewTabLink href={href}>原始公式</NewTabLink> : <span>無</span>}
      </td>
    </tr>
  );
}

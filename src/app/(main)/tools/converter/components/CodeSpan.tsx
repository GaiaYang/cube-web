export interface CodeSpanProps {
  codes: string[];
}

/** 代號文字 */
export default function CodeSpan({ codes = [] }: CodeSpanProps) {
  return <span>{codes.map(_renderCodeItem)}</span>;
}

function _renderCodeItem(code: string) {
  return <code key={code}>{code}</code>;
}

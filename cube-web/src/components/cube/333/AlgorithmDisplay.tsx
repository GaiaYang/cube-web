export interface AlgorithmDisplayProps {
  /** 轉動公式 */
  algorithm: string;
}

export default function AlgorithmDisplay({ algorithm }: AlgorithmDisplayProps) {
  return (
    <code className="font-mono text-base">
      <span>{algorithm}</span>
    </code>
  );
}

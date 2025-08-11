export interface CubeAlgorithmDisplayProps {
  /** 轉動公式 */
  algorithm: string;
}

export default function CubeAlgorithmDisplay({
  algorithm,
}: CubeAlgorithmDisplayProps) {
  return (
    <code className="font-mono text-base">
      <span>{algorithm}</span>
    </code>
  );
}

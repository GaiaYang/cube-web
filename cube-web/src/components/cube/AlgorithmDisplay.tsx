import cn from "@/utils/cn";

export interface AlgorithmDisplayProps {
  /** 轉動公式 */
  algorithm: string;
}

export default function AlgorithmDisplay({ algorithm }: AlgorithmDisplayProps) {
  return (
    <code
      className={cn(
        "font-mono text-base",
        "bg-base-200 rounded-selector border-base-300 border px-2",
      )}
    >
      {algorithm}
    </code>
  );
}

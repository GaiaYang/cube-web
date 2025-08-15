import cn from "@/utils/cn";

export interface AlgorithmDisplayProps {
  /** 轉動公式 */
  algorithm: string;
  /** 預設顯示文字 */
  placeholder?: string;
  className?: string;
}

export default function AlgorithmDisplay({
  algorithm,
  placeholder,
  className,
}: AlgorithmDisplayProps) {
  return (
    <code
      className={cn(
        "font-mono text-sm",
        "flex items-center",
        "bg-base-200 border-base-300 rounded border px-2 py-1.5",
        className,
      )}
    >
      {algorithm || placeholder || "\u00A0"}
    </code>
  );
}

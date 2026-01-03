import cn from "@/utils/cn";

export interface AlgorithmDisplayProps {
  /** 轉動公式 */
  algorithm?: string;
  /** 預設顯示文字 */
  placeholder?: string;
  className?: string;
}

/** 公式顯示 */
export default function AlgorithmDisplay({
  algorithm,
  placeholder,
  className,
}: AlgorithmDisplayProps) {
  return (
    <code
      className={cn(
        "not-prose rounded-box font-mono text-sm",
        "flex min-h-10 items-center px-3!",
        "hover:bg-base-300!",
        className,
      )}
    >
      {algorithm || placeholder || "\u00A0"}
    </code>
  );
}

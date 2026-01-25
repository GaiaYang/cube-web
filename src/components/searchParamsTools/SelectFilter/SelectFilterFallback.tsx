import cn from "@/utils/cn";

export interface SelectFilterFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 下拉選單的 placeholder */
  placeholder?: string;
}

export default function SelectFilterFallback({
  placeholder,
  ...props
}: SelectFilterFallbackProps) {
  return (
    <div {...props} className={cn("join", props.className)} aria-busy="true">
      <select className="select join-item" disabled aria-hidden="true">
        <option>{placeholder}</option>
      </select>
      <button
        type="button"
        disabled
        aria-label="載入中"
        className="join-item btn btn-error btn-square btn-soft"
      >
        <span className="loading loading-dots" />
      </button>
    </div>
  );
}

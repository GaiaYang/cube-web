"use client";

import { RotateCcwIcon } from "lucide-react";

import type { Option } from "@/data/options/types";
import cn from "@/utils/cn";

export interface SelectFilterProps<T extends string>
  extends React.ComponentProps<"div"> {
  /** 選擇器選項 */
  options: Option<T>[];
  /** 目前選取值；`null` 表示未選 */
  value: T | null;
  /** 更新選取值 */
  onValueChange: (value: T | null) => void;
  /** 用於 id 的穩定鍵 */
  idKey: string;
  /** 下拉選單的 placeholder */
  placeholder?: string;
  /** 重設按鈕的 title / aria-label */
  resetLabel?: string;
  /** 選擇器的 aria-label */
  ariaLabel?: string;
}

export default function SelectFilter<T extends string>({
  options,
  value,
  onValueChange,
  idKey,
  placeholder = "請選擇",
  resetLabel = "清除選項",
  ariaLabel = "選擇選項",
  ...props
}: SelectFilterProps<T>) {
  return (
    <div {...props} className={cn("join", props.className)}>
      <select
        id={`select-filter-${idKey}`}
        aria-label={ariaLabel}
        value={value ?? ""}
        onChange={(event) => {
          const next = event.target.value;
          onValueChange(next === "" ? null : (next as T));
        }}
        className="select focus:select-primary join-item"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(_renderOption)}
      </select>
      <button
        type="button"
        onClick={() => {
          onValueChange(null);
        }}
        title={resetLabel}
        className="join-item btn btn-error btn-square btn-soft"
      >
        <span className="sr-only">{resetLabel}</span>
        <RotateCcwIcon />
      </button>
    </div>
  );
}

function _renderOption<T extends string>(item: Option<T>) {
  return (
    <option key={item.id} value={item.value}>
      {item.label}
    </option>
  );
}

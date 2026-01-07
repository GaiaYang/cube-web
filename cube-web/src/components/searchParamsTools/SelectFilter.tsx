"use client";

import { RotateCcwIcon } from "lucide-react";

import type { Option } from "@/options/types";

import cn from "@/utils/cn";
import useSearchParamSelect from "@/hooks/useSearchParamSelect";

export interface SelectFilterProps<
  TEnum extends Record<string, string>,
> extends React.HTMLAttributes<HTMLDivElement> {
  /** 選擇器選項 */
  options: Option<TEnum[keyof TEnum]>[];
  /** Enum 物件 */
  enumMap: TEnum;
  /** URL 查詢參數名稱 */
  paramKey: string;
  /** 下拉選單的 placeholder */
  placeholder?: string;
  /** 重設按鈕的 title / aria-label */
  resetLabel?: string;
  /** 選擇器的 aria-label */
  ariaLabel?: string;
}

export default function SelectFilter<TEnum extends Record<string, string>>({
  options,
  enumMap,
  paramKey,
  placeholder = "請選擇",
  resetLabel = "清除選項",
  ariaLabel = "選擇選項",
  ...props
}: SelectFilterProps<TEnum>) {
  const { value, onChange, reset } = useSearchParamSelect(enumMap, paramKey);

  return (
    <div {...props} className={cn("join", props.className)}>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        className="select focus:select-primary join-item"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(_renderOption)}
      </select>
      <button
        type="button"
        onClick={reset}
        title={resetLabel}
        className="join-item btn btn-error btn-square btn-soft"
      >
        <span className="sr-only">{resetLabel}</span>
        <RotateCcwIcon />
      </button>
    </div>
  );
}

function _renderOption<TEnum extends Record<string, string>>(
  item: Option<TEnum[keyof TEnum]>,
) {
  return (
    <option key={item.id} value={item.value}>
      {item.label}
    </option>
  );
}

export interface SelectFilterFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 下拉選單的 placeholder */
  placeholder?: string;
}

export function SelectFilterFallback({
  placeholder,
  ...props
}: SelectFilterFallbackProps) {
  return (
    <div {...props} className={cn("join", props.className)}>
      <select className="select join-item" disabled>
        <option>{placeholder}</option>
      </select>
      <button
        type="button"
        disabled
        className="join-item btn btn-error btn-square btn-soft"
      >
        <span className="loading loading-dots" />
      </button>
    </div>
  );
}

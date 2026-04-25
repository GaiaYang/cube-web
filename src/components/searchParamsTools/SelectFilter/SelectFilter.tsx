"use client";

import { RotateCcwIcon } from "lucide-react";
import { parseAsStringEnum, useQueryState } from "nuqs";

import type { Option } from "@/data/options/types";
import cn from "@/utils/cn";

type EnumLike = Record<string, string>;
type EnumValue<E extends EnumLike> = E[keyof E];

export interface SelectFilterProps<
  E extends EnumLike,
> extends React.ComponentProps<"div"> {
  /** 選擇器選項 */
  options: Option<EnumValue<E>>[];
  /** Enum 物件 */
  enumObject: E;
  /** URL 查詢參數名稱 */
  queryKey: string;
  /** 下拉選單的 placeholder */
  placeholder?: string;
  /** 重設按鈕的 title / aria-label */
  resetLabel?: string;
  /** 選擇器的 aria-label */
  ariaLabel?: string;
}

export default function SelectFilter<E extends EnumLike>({
  options,
  enumObject,
  queryKey,
  placeholder = "請選擇",
  resetLabel = "清除選項",
  ariaLabel = "選擇選項",
  ...props
}: SelectFilterProps<E>) {
  const [value, setValue] = useQueryState(
    queryKey,
    parseAsStringEnum<EnumValue<E> | "">(
      Object.values(enumObject) as EnumValue<E>[],
    )
      .withOptions({
        shallow: true,
        history: "push",
      })
      .withDefault(""),
  );

  return (
    <div {...props} className={cn("join", props.className)}>
      <select
        id={`select-filter-${queryKey}`}
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => {
          setValue(event.target.value as EnumValue<E>);
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
          setValue(null);
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

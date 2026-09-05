"use client";

import { RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/daisy-ui/button";
import { Join } from "@/components/daisy-ui/join";
import { Select, SelectOption } from "@/components/daisy-ui/select";
import type { Option } from "@/data/options/types";

export interface SelectFilterProps<
  T extends string,
> extends React.ComponentProps<"div"> {
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
  className,
  ...props
}: SelectFilterProps<T>) {
  return (
    <Join {...props} className={className}>
      <Select
        id={`select-filter-${idKey}`}
        aria-label={ariaLabel}
        value={value ?? ""}
        onChange={(event) => {
          const next = event.target.value;
          onValueChange(next === "" ? null : (next as T));
        }}
        joinItem
        className="focus:select-primary"
      >
        <SelectOption value="" disabled>
          {placeholder}
        </SelectOption>
        {options.map(_renderOption)}
      </Select>
      <Button
        type="button"
        onClick={() => {
          onValueChange(null);
        }}
        title={resetLabel}
        joinItem
        color="error"
        shape="square"
        variant="soft"
      >
        <span className="sr-only">{resetLabel}</span>
        <RotateCcwIcon />
      </Button>
    </Join>
  );
}

function _renderOption<T extends string>(item: Option<T>) {
  return (
    <SelectOption key={item.id} value={item.value}>
      {item.label}
    </SelectOption>
  );
}

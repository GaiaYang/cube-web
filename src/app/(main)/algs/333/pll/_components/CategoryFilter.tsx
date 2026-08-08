"use client";

import SelectFilter from "@/components/searchParamsTools/SelectFilter";
import { options } from "@/data/cube/333/pll";
import { usePllCategory } from "@/hooks/useCube333Category";

/** PLL 分類篩選 */
export default function CategoryFilter() {
  const [value, setValue] = usePllCategory();

  return (
    <SelectFilter
      idKey="category"
      ariaLabel="選擇分類"
      placeholder="請選擇分類"
      resetLabel="清除分類"
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
}

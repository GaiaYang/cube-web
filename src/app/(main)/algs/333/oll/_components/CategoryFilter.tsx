"use client";

import SelectFilter from "@/components/searchParamsTools/SelectFilter";
import { options } from "@/data/cube/333/oll";
import { useOllCategory } from "@/hooks/useCube333Category";

/** OLL 分類篩選 */
export default function CategoryFilter() {
  const [value, setValue] = useOllCategory();

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

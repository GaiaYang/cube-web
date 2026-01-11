import { Suspense } from "react";

import SelectFilter, {
  type SelectFilterProps,
  SelectFilterFallback,
} from "@/components/searchParamsTools/SelectFilter";

/**
 * 公式列表篩選面板
 *
 * > 已包含 `<Suspense />`
 * */
export default function AlgorithmsFilterPanel<
  TEnum extends Record<string, string>,
>({ options, enumMap }: Pick<SelectFilterProps<TEnum>, "options" | "enumMap">) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Suspense fallback={<SelectFilterFallback placeholder="請選擇分類" />}>
        <SelectFilter
          ariaLabel="選擇分類"
          placeholder="請選擇分類"
          resetLabel="清除分類"
          paramKey="category"
          options={options}
          enumMap={enumMap}
        />
      </Suspense>
    </div>
  );
}

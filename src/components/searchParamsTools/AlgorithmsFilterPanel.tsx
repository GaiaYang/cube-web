import SelectFilter, { type SelectFilterProps } from "./SelectFilter";

/**
 * 公式列表篩選面板
 *
 * > 已包含 `<Suspense />`
 * */
export default function AlgorithmsFilterPanel<
  TEnum extends Record<string, string>,
>({
  options,
  valueMap,
}: Pick<SelectFilterProps<TEnum>, "options" | "valueMap">) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SelectFilter
        ariaLabel="選擇分類"
        placeholder="請選擇分類"
        resetLabel="清除分類"
        queryKey="category"
        options={options}
        valueMap={valueMap}
      />
    </div>
  );
}

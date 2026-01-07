import SelectFilter, {
  type SelectFilterProps,
  SelectFilterFallback,
} from "@/components/searchParamsTools/SelectFilter";

/** 公式列表篩選面板 */
export default function AlgorithmsFilterPanel<
  TEnum extends Record<string, string>,
>({ options, enumMap }: Pick<SelectFilterProps<TEnum>, "options" | "enumMap">) {
  return (
    <Container>
      <SelectFilter
        ariaLabel="選擇分類"
        placeholder="請選擇分類"
        resetLabel="清除分類"
        paramKey="category"
        options={options}
        enumMap={enumMap}
      />
    </Container>
  );
}

export function AlgorithmsFilterPanelFallback() {
  return (
    <Container>
      <SelectFilterFallback placeholder="請選擇分類" />
    </Container>
  );
}

function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  );
}

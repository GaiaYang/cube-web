import { options as ollOptions } from "@/options/cube/333/ollCategory";
import { OLLCategory } from "@/enums/cube/333";

import SelectFilter from "@/components/searchParamsTools/SelectFilter";

export default function FilterPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SelectFilter
        ariaLabel="選擇分類"
        placeholder="請選擇分類"
        resetLabel="清除分類"
        paramKey="category"
        options={ollOptions}
        enumMap={OLLCategory}
      />
    </div>
  );
}

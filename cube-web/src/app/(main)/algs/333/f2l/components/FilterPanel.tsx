import React from "react";

import { options as f2lOptions } from "@/options/cube/333/f2lCategory";
import { F2LCategory } from "@/enums/cube/333";

import SelectFilter from "@/components/searchParamsTools/SelectFilter";

export default function FilterPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SelectFilter
        ariaLabel="選擇分類"
        placeholder="請選擇分類"
        resetLabel="清除分類"
        paramKey="category"
        options={f2lOptions}
        enumMap={F2LCategory}
      />
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { options as ollOptions } from "@/options/cube/333/ollCategory";
import { OLLCategory } from "@/enums/cube/333";
import searchParamToEnum from "@/utils/searchParamToEnum";
import updateSearchParams from "@/utils/updateSearchParams";

export default function FilterPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <CategoryFilter />
    </div>
  );
}

function CategoryFilter() {
  const searchParams = useSearchParams();
  const category = searchParamToEnum(OLLCategory, searchParams.get("category"));
  const value = category || "";

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    updateSearchParams(searchParams.toString(), {
      category: event.target.value,
    });
  };

  return (
    <select
      value={value}
      onChange={onChange}
      className="select focus:select-primary"
    >
      <option value="">{value ? "全部" : "請選擇分類"}</option>
      {ollOptions.map((item) => (
        <option key={item.id} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

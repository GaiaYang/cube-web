"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { RotateCcwIcon } from "lucide-react";

import { options as pllOptions } from "@/options/cube/333/pllCategory";
import { PLLCategory } from "@/enums/cube/333";
import searchParamToEnum from "@/utils/searchParamToEnum";
import updateSearchParams from "@/utils/updateSearchParams";

export default function FilterPanel() {
  return (
    <section
      aria-label="搜尋列"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <CategoryFilter />
    </section>
  );
}

function CategoryFilter() {
  const searchParams = useSearchParams();
  const category =
    searchParamToEnum(PLLCategory, searchParams.get("category")) || "";

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    updateSearchParams(searchParams.toString(), {
      category: event.target.value,
    });
  };

  const resetCategory: React.MouseEventHandler<HTMLButtonElement> = () => {
    updateSearchParams(searchParams.toString(), {
      category: undefined,
    });
  };

  return (
    <div className="join">
      <select
        aria-label="選擇分類"
        value={category}
        onChange={onChange}
        className="select focus:select-primary join-item"
      >
        <option value="" disabled>
          請選擇分類
        </option>
        {pllOptions.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={resetCategory}
        title="清除分類"
        className="join-item btn btn-error btn-square"
      >
        <span className="sr-only">清除分類</span>
        <RotateCcwIcon />
      </button>
    </div>
  );
}

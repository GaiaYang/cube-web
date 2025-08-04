"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { options as pllOptions } from "@/options/cube/333/pllCategory";

export default function FilterPanel() {
  return (
    <div className="grid gap-4">
      <CategoryFilter />
    </div>
  );
}

function CategoryFilter() {
  const search = useSearchParams();
  const category = search.get("category") || "";

  return <div></div>;
}

"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

import { F2LCategory, OLLCategory, PLLCategory } from "@/enums/cube/333";

const QUERY_KEY = "category";
const ollCategoryParser = parseAsStringLiteral(Object.values(OLLCategory));
const pllCategoryParser = parseAsStringLiteral(Object.values(PLLCategory));
const f2lCategoryParser = parseAsStringLiteral(Object.values(F2LCategory));

/** OLL 公式列表的 category 篩選 */
export function useOllCategory() {
  return useQueryState(QUERY_KEY, ollCategoryParser);
}

/** PLL 公式列表的 category 篩選 */
export function usePllCategory() {
  return useQueryState(QUERY_KEY, pllCategoryParser);
}

/** F2L 公式列表的 category 篩選 */
export function useF2lCategory() {
  return useQueryState(QUERY_KEY, f2lCategoryParser);
}

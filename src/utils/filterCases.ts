/** 依 category 篩選公式案例；未指定則回傳原陣列 */
export default function filterCases<D extends { category: string }>(
  definitions: D[],
  category?: string | null,
): D[] {
  return category
    ? definitions.filter((item) => item.category === category)
    : definitions;
}

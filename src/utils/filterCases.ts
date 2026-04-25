/** 篩選公式案例 */
export default function filterCases<D extends { category: string }>(
  definitions: D[],
  category?: string | null,
) {
  return category
    ? definitions.filter((item) => item.category === category)
    : definitions;
}

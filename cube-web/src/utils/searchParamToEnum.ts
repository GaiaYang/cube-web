/**
 * 將 URL 的搜尋參數轉換回 enum 的值
 *
 * @param enumObject - enum 物件
 * @param searchParam - URL 的搜尋參數
 * @returns enum 的值，若搜尋參數不存在於 enum 中，則回傳 `undefined`
 * @example
 * ```ts
 * const category = searchParamToEnum(Category, searchParams.get("category"));
 * ```
 */
export default function searchParamToEnum<TEnum>(
  enumObject: TEnum,
  searchParam?: string | null,
) {
  return searchParam ? enumObject[searchParam as keyof TEnum] : undefined;
}

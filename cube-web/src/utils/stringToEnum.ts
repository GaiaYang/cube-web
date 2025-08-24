/**
 * 將字串轉換為 enum 的值
 *
 * @param enumMap - 目標 enum
 * @param value - 欲轉換的字串
 * @returns enum 的值，若字串不在 enum 中則回傳 `undefined`
 */
export default function stringToEnum<TEnum>(
  enumMap: TEnum,
  value?: string | null,
) {
  return value ? enumMap[value as keyof TEnum] : undefined;
}

/**
 * 從物件中安全取得值，若鍵為 `undefined`/`null` 或鍵不存在，則返回預設鍵的值
 * @param obj 包含值的物件，必須至少有 `defaultKey` 指定的鍵
 * @param defaultKey 預設退回的鍵名稱
 * @param key 要取得的鍵（可選）
 * @returns 物件指定值
 */
export default function getValueWithFallback<
  T extends Record<string, V>,
  V,
  K extends keyof T,
>(obj: T, defaultKey: keyof T, key?: K | null): T[keyof T] {
  return obj[key ?? defaultKey] ?? obj[defaultKey];
}

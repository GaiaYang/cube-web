/**
 * 從物件取值；鍵缺失或值為 `null`/`undefined` 時退回 `defaultKey` 的值
 */
export default function getOrDefault<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T,
>(obj: T, defaultKey: K, key?: K | null): T[K] {
  return (key != null ? obj[key] : undefined) ?? obj[defaultKey];
}

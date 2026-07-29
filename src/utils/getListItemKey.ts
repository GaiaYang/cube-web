import { isPlainObject } from "es-toolkit";

/**
 * 從列表項目取得 React key（優先 `id`，其次 `key`）
 */
export default function getListItemKey(item: unknown): string | undefined {
  if (!isPlainObject(item)) return undefined;

  const value = "id" in item ? item.id : "key" in item ? item.key : undefined;
  return typeof value === "string" && value !== "" ? value : undefined;
}

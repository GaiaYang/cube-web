import { isPlainObject } from "es-toolkit";

/**
 * 取得列表物件的 key
 *
 * 優先取得 id > key
 * @param item 要尋找的物件
 */
export default function getListItemKey(item: unknown): string | undefined {
  if (!isPlainObject(item)) {
    return undefined;
  }

  let result;

  if ("id" in item) {
    result = item.id;
  } else if ("key" in item) {
    result = item.key;
  }

  if (typeof result === "string" && result !== "") {
    return result;
  }

  return undefined;
}

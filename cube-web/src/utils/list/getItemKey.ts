import { isPlainObject } from "es-toolkit";

/**
 * 取得物件的 key
 *
 * 優先取得 id > key
 * @param item 要尋找的物件
 */
export default function getItemKey(item: unknown): string | undefined {
  if (isPlainObject(item)) {
    if ("id" in item) {
      return item.id;
    }

    if ("key" in item) {
      return item.key;
    }
  }

  return undefined;
}

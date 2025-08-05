import { isPlainObject } from "es-toolkit";

/**
 * 更新當前網址的搜尋參數
 * @param paramsStr 搜尋參數轉化的字串
 * @param object 要寫入的物件
 */
export default function updateSearchParams(
  paramsStr: string,
  object: Record<string, string | null | undefined>,
) {
  const newParams = new URLSearchParams(paramsStr);

  if (isPlainObject(object)) {
    for (const [name, value] of Object.entries(object)) {
      if (value) {
        newParams.set(name, value);
      } else {
        newParams.delete(name);
      }
    }

    window.history.pushState(null, "", "?" + newParams.toString());
  }
}

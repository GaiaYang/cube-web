import { isNotNil, isPlainObject } from "es-toolkit";
import { type ReadonlyURLSearchParams } from "next/navigation";

export type SearchParamsInput =
  | string
  | URLSearchParams
  | ReadonlyURLSearchParams;

/**
 * 更新當前網址的搜尋參數
 * @param source 搜尋參數來源
 * @param object 要寫入的物件
 */
export default function updateSearchParams(
  source: SearchParamsInput,
  updates: Record<string, string | null | undefined>,
) {
  const params = new URLSearchParams(
    typeof source === "string" ? source : source.toString(),
  );

  if (!isPlainObject(updates)) {
    return;
  }

  for (const [name, value] of Object.entries(updates)) {
    if (isNotNil(value) && value !== "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
  }

  const newSearch = params.toString();
  const currentSearch = new URLSearchParams(window.location.search).toString();

  // 確認網址不同才更新
  if (newSearch !== currentSearch) {
    window.history.pushState(null, "", "?" + newSearch);
  }
}

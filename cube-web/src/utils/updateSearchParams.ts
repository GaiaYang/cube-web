import { isNotNil } from "es-toolkit";
import { type ReadonlyURLSearchParams } from "next/navigation";

export type SearchParamsInput =
  | string
  | URLSearchParams
  | ReadonlyURLSearchParams;

/**
 * 更新當前網址的搜尋參數
 *
 * @param input - 搜尋參數來源 (string / URLSearchParams / ReadonlyURLSearchParams)
 * @param changes - 要更新的 key/value 物件，值為 null 或 undefined 表示刪除
 */
export default function updateSearchParams(
  input: SearchParamsInput,
  changes: Record<string, string | null | undefined>,
) {
  if (typeof window === "undefined") return; // SSR 安全

  const params = new URLSearchParams(
    typeof input === "string" ? input : input.toString(),
  );

  // 更新或刪除 key
  for (const [key, value] of Object.entries(changes)) {
    if (isNotNil(value) && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  const newSearch = params.toString();
  const currentSearch = new URLSearchParams(window.location.search).toString();

  // 確認網址不同才更新
  if (newSearch !== currentSearch) {
    window.history.pushState(
      null,
      "",
      newSearch ? `?${newSearch}` : window.location.pathname,
    );
  }
}

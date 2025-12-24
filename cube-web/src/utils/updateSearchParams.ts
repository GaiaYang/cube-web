export type SearchParamsInput =
  | string
  | URLSearchParams
  | string[][]
  | Record<string, string>;

/**
 * 更新當前網址的搜尋參數
 *
 * @param input - 搜尋參數來源
 * @param changes - 要更新的物件，值為 `null` 或 `undefined` 表示刪除
 */
export default function updateSearchParams(
  input: SearchParamsInput,
  changes: Record<string, string | null | undefined>,
) {
  if (typeof window === "undefined") return; // SSR 安全

  const params = new URLSearchParams(input);

  // 更新或刪除 key
  for (const [key, value] of Object.entries(changes)) {
    if (typeof value === "string" && value !== "") {
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

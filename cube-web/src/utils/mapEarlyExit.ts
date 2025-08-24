import { isNil } from "es-toolkit";

/**
 * 將陣列中的元素轉換為另一個陣列，不合法的情況提前退出
 *
 * @param items 要轉換的陣列
 * @param transform 轉換函式
 * @param validate 檢查元素合法性
 * @param fallback 轉換失敗時的回傳值
 * */
export default function mapEarlyExit<T, U>(
  items: T[],
  transform: (item: T, index: number) => U | null | undefined,
  validate?: (item: U) => unknown,
  fallback: U[] = [],
): U[] {
  const result: U[] = [];
  for (let i = 0, len = items.length; i < len; i++) {
    const value = transform(items[i], i);
    // 轉換失敗
    if (isNil(value)) return fallback;
    // 驗證不合法
    if (validate && !validate(value)) return fallback;
    result.push(value);
  }
  return result;
}

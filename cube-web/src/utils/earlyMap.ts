import { isNil } from "es-toolkit";

/**
 * 對陣列中的每個元素依序呼叫一次已定義的回呼函式，並回傳一個由回呼結果組成的新陣列。
 *
 * 若在處理過程中有任一元素為 `null` 、 `undefined` 或驗證不通過，則會立即中斷並回傳空陣列。
 *
 * @param array 要處理的陣列
 * @param callbackfn 會依序作用於每個元素的函式
 * @param validator 對轉換後的元素進行驗證的函式
 * @returns 包含所有成功轉換元素的新陣列或者空陣列
 */
export default function earlyMap<T, U>(
  array: T[],
  callbackfn: (item: T, index: number, array: T[]) => U | null | undefined,
  validator?: (item: U) => unknown,
): U[] {
  const result: U[] = [];
  for (let i = 0, len = array.length; i < len; i++) {
    const value = callbackfn(array[i], i, array);
    if (isNil(value)) return [];
    if (validator && !validator(value)) return [];
    result.push(value);
  }
  return result;
}

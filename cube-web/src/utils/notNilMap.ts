import { isNotNil } from "es-toolkit";

/**
 * 映射陣列並收集非 `null`、`undefined` 的回傳值。
 *
 * 若任一項的回呼函式回傳 `null`、`undefined`，
 * 或不符合可選的驗證函式 `validator`，則整個函式將立即回傳空陣列。
 *
 * @template T 原始陣列元素類型
 * @template R 回呼函式的回傳類型
 * @param array 要處理的原始陣列
 * @param callbackfn 作用於每個元素的映射函式
 * @param validator （可選）額外的驗證函式，用於篩選回傳值
 * @returns 若所有項目皆通過檢查，則回傳映射後的陣列；否則回傳空陣列
 */
export default function notNilMap<T, R>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => R | null | undefined,
  validator?: (item: R) => unknown,
): R[] {
  const result: R[] = [];

  for (let i = 0; i < array.length; i++) {
    const mapped = callbackfn(array[i], i, array);

    // 若為 null 或 undefined，直接回傳空陣列
    if (!isNotNil(mapped)) return [];

    // 若有 validator 且不通過，也直接回傳空陣列
    if (validator && !validator(mapped)) return [];

    result.push(mapped);
  }

  return result;
}

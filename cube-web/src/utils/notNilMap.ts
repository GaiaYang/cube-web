import { isNotNil } from "es-toolkit";

/**
 * 將陣列映射至新陣列，但僅包含回呼函式返回的值。
 *
 * 若回呼函式返回 `null` 或 `undefined`，此函式將返回空陣列。
 *
 * @param array 要映射的陣列
 * @param callbackfn 用於映射陣列的回呼函式。它會接收`value`、`index`和`array`作為參數。
 * @returns 回傳不包含 `null` 或 `undefined` 的新陣列
 */
export default function notNilMap<T, R>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => R | null | undefined,
): R[] {
  const result: R[] = [];
  for (let index = 0, len = array.length; index < len; index++) {
    const value = callbackfn(array[index], index, array);
    if (isNotNil(value)) {
      result.push(value);
    } else {
      return [];
    }
  }
  return result;
}

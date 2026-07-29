import { isNil } from "es-toolkit";

/**
 * 嚴格映射：全部成功才回傳結果，任一項失敗則回傳 `[]`。
 *
 * 失敗條件：callback 回傳 `null`/`undefined`，或未通過可選的 `validator`。
 * 適合「整段公式要嘛全對、要嘛整段作廢」這類語意。
 */
export default function notNilMap<T, R>(
  array: readonly T[],
  callbackfn: (
    value: T,
    index: number,
    array: readonly T[],
  ) => R | null | undefined,
  validator?: (item: R) => unknown,
): R[] {
  const result: R[] = [];

  for (let i = 0; i < array.length; i++) {
    const mapped = callbackfn(array[i], i, array);

    if (isNil(mapped)) return [];
    if (validator && !validator(mapped)) return [];

    result.push(mapped);
  }

  return result;
}

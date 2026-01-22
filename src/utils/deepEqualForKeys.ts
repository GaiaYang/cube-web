import { deepEqual } from "fast-equals";

/**
 * 指定 key 做深層比較，其餘照預設 memo 比較
 * @param deepKeys 需要深層比較的 props key 陣列
 * @param deepEqualFn 深層比較函式，預設使用 `fast-equals` 比較
 */
export default function deepEqualForKeys<T extends object>(
  deepKeys: (keyof T)[],
) {
  const deepKeySet = new Set(deepKeys);

  return function propsAreEqual(
    prevProps: Readonly<T>,
    nextProps: Readonly<T>,
  ): boolean {
    const keys = Object.keys(prevProps) as (keyof T)[];

    for (const key of keys) {
      const prevValue = prevProps[key];
      const nextValue = nextProps[key];

      if (deepKeySet.has(key)) {
        // 深層比較
        if (!deepEqual(prevValue, nextValue)) {
          return false;
        }
      } else {
        // 淺層比較
        if (!Object.is(prevValue, nextValue)) {
          return false;
        }
      }
    }

    return true;
  };
}

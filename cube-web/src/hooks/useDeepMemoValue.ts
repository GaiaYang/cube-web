"use client";

import { deepEqual } from "fast-equals";
import { useRef } from "react";

/** 深層比較變數，並依情況回傳變動值 */
export default function useDeepMemoValue<V>(value: V): V {
  const cache = useRef<V>(value);

  if (!deepEqual(value, cache.current)) {
    cache.current = value;
  }

  return cache.current;
}

import type { Ref, RefCallback } from "react";

/**
 * 賦值給 ref
 * @returns React 19 callback ref 的清理函式（若有）
 */
export function assignRef<T>(
  ref: Ref<T> | undefined | null,
  value: T | null,
): ReturnType<RefCallback<T>> {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

/** 將多個 ref 合併為一個（支援 React 19 cleanup） */
export default function mergeRefs<T>(
  refs: (Ref<T> | undefined | null)[],
): RefCallback<T> {
  return (value) => {
    const cleanups: (() => void)[] = [];

    for (const ref of refs) {
      const cleanup = assignRef(ref, value);
      cleanups.push(
        typeof cleanup === "function" ? cleanup : () => assignRef(ref, null),
      );
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  };
}

import { Ref, RefCallback, version } from "react";

/**
 * 賦值給 ref
 * @param ref 用於賦值的 ref
 * @param value 要賦予 ref 的值
 * @returns 如果存在清理函式(React 19 以後)則回傳該函式
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

function mergeRefsReact16<T>(refs: (Ref<T> | undefined)[]): Ref<T> {
  return (value: T | null) => {
    for (const ref of refs) assignRef(ref, value);
  };
}

function mergeRefsReact19<T>(refs: (Ref<T> | undefined)[]): Ref<T> {
  return (value: T | null) => {
    const cleanups: (() => void)[] = [];

    for (const ref of refs) {
      const cleanup = assignRef(ref, value);
      const isCleanup = typeof cleanup === "function";
      cleanups.push(isCleanup ? cleanup : () => assignRef(ref, null));
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  };
}

/**
 * 將多個 ref 合併為一個
 * @param refs 待合併的 ref 清單
 * @returns 合併後的 ref
 */
export const mergeRefs =
  parseInt(version.split(".")[0]!, 10) >= 19
    ? mergeRefsReact19
    : mergeRefsReact16;

import { useEffect, useState } from "react";

export type UseScrolledTarget =
  | (() => HTMLElement | null)
  | React.RefObject<HTMLElement>
  | string;

/**
 * 判斷指定目標是否滾動超過給定閾值
 *
 * @param threshold 觸發滾動的數值，預設為 `0`
 * @param target 可指定目標：
 *  - `string`: 對應元素 id
 *  - `ref`: React Ref
 *  - `() => HTMLElement`: 回傳元素的函式
 *
 * 若未提供目標，預設監聽 `window`
 *
 * @returns 是否已超過閾值
 */
export default function useScrolled(
  threshold: number = 0,
  target?: UseScrolledTarget,
): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = getScrollTarget(target);
    if (!element) return;
    const updateScrollState = () => {
      const scrollTop =
        element instanceof Window ? element.scrollY : element.scrollTop;

      setIsScrolled(scrollTop > threshold);
    };

    updateScrollState(); // 初始化先判斷一次

    element.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      element.removeEventListener("scroll", updateScrollState);
    };
  }, [target, threshold]);

  return isScrolled;
}

/**
 * 解析目標，取得實際要監聽的元素
 * 若沒有指定，預設回傳 `window`
 */
function getScrollTarget(
  target?: UseScrolledTarget,
): HTMLElement | Window | null {
  switch (typeof target) {
    case "function":
      return target();
    case "string":
      return document.getElementById(target);
    default:
      if (target?.current) return target.current;
  }
  return window;
}

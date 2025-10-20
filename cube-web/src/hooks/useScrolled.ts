import { useEffect, useState } from "react";

/**
 * 判斷滾動是否超過閾值
 * @param threshold 閾值 px
 * @param target 可選，延遲取得 DOM 的函式，預設為 `window`
 */
export default function useScrolled(
  threshold: number = 0,
  target?: (() => HTMLElement | null) | React.RefObject<HTMLElement>,
) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let element: HTMLElement | Window | null = null;

    if (typeof target === "function") {
      element = target() ?? null;
    } else if (target?.current) {
      element = target.current;
    } else {
      element = window;
    }

    if (!element) return;

    const onScroll = () => {
      setScrolled(
        (element instanceof Window ? element.scrollY : element.scrollTop) >
          threshold,
      );
    };

    onScroll(); // 初始判斷一次
    element.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", onScroll);
    };
  }, [threshold, target]); // target 是函式，每次 render 都會呼叫最新 target

  return scrolled;
}

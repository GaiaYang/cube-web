import { useEffect, useState, useEffectEvent } from "react";

export default function useScrolled(
  threshold: number = 0,
  target?: (() => HTMLElement | null) | React.RefObject<HTMLElement>,
) {
  const [scrolled, setScrolled] = useState(false);

  // 最新 handler
  const handleScroll = useEffectEvent(() => {
    const element = resolveTarget(target);

    if (!element) return;

    const value =
      element instanceof Window ? element.scrollY : element.scrollTop;

    setScrolled(value > threshold);
  });

  useEffect(() => {
    const element = resolveTarget(target);

    if (!element) return;

    handleScroll(); // 初始判斷一次
    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [target]);

  return scrolled;
}

function resolveTarget(
  target?: (() => HTMLElement | null) | React.RefObject<HTMLElement>,
): HTMLElement | Window | null {
  if (typeof target === "function") {
    return target() ?? null;
  } else if (target?.current) {
    return target.current;
  } else {
    return window;
  }
}

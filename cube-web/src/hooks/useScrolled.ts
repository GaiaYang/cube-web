import { useEffect, useState } from "react";

/** 監聽是否滾動超過閾值 */
export default function useScrolled(threshold: number = 0) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return scrolled;
}

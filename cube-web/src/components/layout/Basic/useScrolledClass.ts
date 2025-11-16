import cn from "@/utils/cn";

import { SCROLL_THRESHOLD } from "./config";
import useScrolled, { type UseScrolledTarget } from "@/hooks/useScrolled";

export default function useScrolledClass(getElement?: UseScrolledTarget) {
  const scrolled = useScrolled(SCROLL_THRESHOLD, getElement);

  return cn(
    "sticky top-0 z-30 w-full print:hidden",
    "bg-base-100/90 backdrop-blur transition-shadow",
    "[transform:translate3d(0,0,0)] duration-100",
    { "shadow-xs": scrolled },
  );
}

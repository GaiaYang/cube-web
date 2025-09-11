import cn from "@/utils/cn";
import useScrolled from "@/hooks/useScrolled";
import { SCROLL_THRESHOLD } from "./config";

export default function useScrolledClass() {
  const scrolled = useScrolled(SCROLL_THRESHOLD);
  return cn(
    "sticky top-0 z-30 w-full print:hidden",
    "bg-base-100/90 backdrop-blur transition-shadow",
    "[transform:translate3d(0,0,0)] duration-100",
    { "shadow-xs": scrolled },
  );
}

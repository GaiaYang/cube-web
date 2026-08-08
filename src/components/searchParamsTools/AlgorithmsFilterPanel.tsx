import { Suspense } from "react";

import SelectFilterFallback from "./SelectFilter/SelectFilterFallback";

/**
 * 公式列表篩選面板
 *
 * > Server Component：以 Suspense 包住各階自己的 client 篩選器
 * */
export default function AlgorithmsFilterPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Suspense fallback={<SelectFilterFallback />}>{children}</Suspense>
    </div>
  );
}

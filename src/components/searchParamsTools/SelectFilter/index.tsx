import { Suspense } from "react";

import SelectFilter, { type SelectFilterProps } from "./SelectFilter";
import SelectFilterFallback from "./SelectFilterFallback";

export type { SelectFilterProps };

export default function Components<TEnum extends Record<string, string>>(
  props: SelectFilterProps<TEnum>,
) {
  return (
    <Suspense fallback={<SelectFilterFallback />}>
      <SelectFilter {...props} />
    </Suspense>
  );
}

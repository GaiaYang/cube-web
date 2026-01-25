import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

import stringToEnum from "@/utils/stringToEnum";
import updateSearchParams from "@/utils/updateSearchParams";

/**
 * 用於將 select 的值與 URL search param 同步的 Hook。
 * @param valueMap Enum 物件，用於轉換字串為 enum 值
 * @param queryKey URL 查詢參數名稱
 */
export default function useSearchParamSelect<TEnum>(
  valueMap: TEnum,
  queryKey: string,
) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const value = stringToEnum(valueMap, searchParams.get(queryKey)) || "";

  const onChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      if (queryKey) {
        updateSearchParams(searchParamsString, {
          [queryKey]: event.target.value,
        });
      }
    },
    [queryKey, searchParamsString],
  );

  const reset = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    if (queryKey) {
      updateSearchParams(searchParamsString, {
        [queryKey]: undefined,
      });
    }
  }, [queryKey, searchParamsString]);

  return {
    value,
    onChange,
    reset,
  };
}

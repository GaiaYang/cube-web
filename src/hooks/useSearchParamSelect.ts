import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

import stringToEnum from "@/utils/stringToEnum";
import updateSearchParams from "@/utils/updateSearchParams";

/**
 * 用於將 select 的值與 URL search param 同步的 Hook。
 * @param enumMap Enum 物件，用於轉換字串為 enum 值
 * @param paramKey URL 查詢參數名稱
 */
export default function useSearchParamSelect<TEnum>(
  enumMap: TEnum,
  paramKey: string,
) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const value = stringToEnum(enumMap, searchParams.get(paramKey)) || "";

  const onChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      if (paramKey) {
        updateSearchParams(searchParamsString, {
          [paramKey]: event.target.value,
        });
      }
    },
    [paramKey, searchParamsString],
  );

  const reset = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    if (paramKey) {
      updateSearchParams(searchParamsString, {
        [paramKey]: undefined,
      });
    }
  }, [paramKey, searchParamsString]);

  return {
    value,
    onChange,
    reset,
  };
}

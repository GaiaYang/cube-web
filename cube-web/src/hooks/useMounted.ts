import { useEffect, useState } from "react";

/**
 * 判斷載入情況
 *
 * @returns 是否已經載入組件
 * */
export default function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

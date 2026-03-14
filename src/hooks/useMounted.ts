import { useEffect, useState } from "react";

/** 判斷是否已經載入組件 */
export default function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
}

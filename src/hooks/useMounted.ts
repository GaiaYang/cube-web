import { useSyncExternalStore } from "react";

/** 判斷是否已經載入組件 */
export default function useMounted(): boolean {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}

const store = {
  getSnapshot: () => true,
  getServerSnapshot: () => false,
  subscribe: () => () => {},
};

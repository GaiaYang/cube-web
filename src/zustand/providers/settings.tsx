"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";

import {
  createSettingsStore,
  type SettingsStore,
} from "@/zustand/stores/settings";

export type SettingsStoreApi = ReturnType<typeof createSettingsStore>;

export const SettingsStoreContext = createContext<SettingsStoreApi | undefined>(
  undefined,
);

export function SettingsStoreProvider({ children }: React.PropsWithChildren) {
  const [store] = useState(() => createSettingsStore());
  return (
    <SettingsStoreContext.Provider value={store}>
      {children}
    </SettingsStoreContext.Provider>
  );
}

export function useSettingsStore<T>(selector: (store: SettingsStore) => T): T {
  const settingsStoreContext = useContext(SettingsStoreContext);
  if (!settingsStoreContext) {
    throw new Error(
      `useSettingsStore must be used within SettingsStoreProvider`,
    );
  }

  return useStore(settingsStoreContext, selector);
}

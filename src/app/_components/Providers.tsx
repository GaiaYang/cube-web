"use client";

import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { SettingsStoreProvider } from "@/zustand/providers/settings";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <SettingsStoreProvider>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </SettingsStoreProvider>
    </NuqsAdapter>
  );
}

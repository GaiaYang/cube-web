import { ThemeProvider } from "@wrksz/themes/next";
import { Provider as JotaiProvider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { SettingsStoreProvider } from "@/zustand/providers/settings";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <ThemeProvider
        attribute="data-theme"
        storage="hybrid"
        defaultTheme="system"
      >
        <SettingsStoreProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </SettingsStoreProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
}

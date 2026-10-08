import { ClientThemeProvider } from "@wrksz/themes/client";
import { Provider as JotaiProvider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { SettingsStoreProvider } from "@/zustand/providers/settings";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <ClientThemeProvider
        attribute="data-theme"
        storage="hybrid"
        defaultTheme="system"
      >
        <SettingsStoreProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </SettingsStoreProvider>
      </ClientThemeProvider>
    </NuqsAdapter>
  );
}

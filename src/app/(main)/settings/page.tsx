import { type Metadata } from "next";

import ThemeToggle from "./components/ThemeToggle";
import SwitchCubeFaceColor from "./components/SwitchCubeFaceColor";

export const metadata: Metadata = {
  title: "網站設定",
  description: "本網站的一些設定項目。",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="prose mb-8">
        <h1>網站設定</h1>
        <p>本網站的一些設定項目。</p>
      </div>
      <div className="grid gap-6">
        <ThemeToggle />
        <SwitchCubeFaceColor />
      </div>
    </div>
  );
}

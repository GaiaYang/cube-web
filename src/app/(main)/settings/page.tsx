import { type Metadata } from "next";

import ThemeToggle from "./components/ThemeToggle";
import SwitchCubeFaceColor from "./components/SwitchCubeFaceColor";
import Article from "@/components/ui/Article";

export const metadata: Metadata = {
  title: "網站設定",
  description: "本網站的一些設定項目。",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <Article>
        <h1>網站設定</h1>
        <p>本網站的一些設定項目。</p>
      </Article>
      <section className="grid gap-6">
        <ThemeToggle />
        <SwitchCubeFaceColor />
      </section>
    </div>
  );
}

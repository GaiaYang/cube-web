import { type Metadata } from "next";

import Article from "@/components/Article";
import Notices from "@/components/Notices";
import NewTabLink from "@/components/NewTabLink";

export const metadata: Metadata = {
  title: "PLL",
  description:
    "PLL（Permutation of the Last Layer）是 CFOP 的最後一步，目標是排列最後一層的所有方塊，使整個魔術方塊復原。",
  alternates: { canonical: "/tutorial/333/cfop/pll" },
};

export default function Page() {
  return (
    <Article>
      <h1>PLL</h1>
      <p>
        PLL（Permutation of the Last Layer）是 CFOP 的第四步，也是最後一步。
        <br />
        它的目標是排列最後一層的所有方塊，完成整個魔術方塊的復原。
      </p>
      <Notices type="under-construction" />
      <p>
        PLL 有 21 種公式，是 CFOP 中公式數量最少的步驟，
        我們可以透過分類來方便記憶。
        <br />
        由於作者偏好左右手操作，因此本頁會用到大量鏡像公式，
        並挑選易操作的公式直接鏡像到另一隻手。
      </p>
      <blockquote>
        如果覺得21條公式太多想先跳過，可以使用{" "}
        <NewTabLink href="pll/2look">兩段式PLL</NewTabLink>{" "}
        ，用極少量的公式且速度不會太慢的情況做完OLL
      </blockquote>
    </Article>
  );
}

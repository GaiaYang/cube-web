import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

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
      <p>
        PLL 有 21 種公式，是 CFOP 中公式數量最少的步驟，
        我們可以透過分類來方便記憶。
        <br />
        由於作者偏好左右手操作，因此本頁會用到大量鏡像公式，
        並挑選易操作的公式直接鏡像到另一隻手。
      </p>
    </Article>
  );
}

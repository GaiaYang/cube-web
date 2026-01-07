import { type Metadata } from "next";

import Article from "@/components/Article";
import Notices from "@/components/Notices";
import NewTabLink from "@/components/ui/NewTabLink";

export const metadata: Metadata = {
  title: "OLL",
  description:
    "OLL（Orientation of the Last Layer）是CFOP的第三步，目標是將頂層方塊朝向正確方向。",
};

export default function Page() {
  return (
    <Article>
      <h1>OLL</h1>
      <p>
        OLL（Orientation of the Last Layer）是CFOP的第三個步驟，
        目標是將頂層方塊朝向正確方向。
      </p>
      <Notices type="under-construction" />
      <p>
        OLL有57種公式，是CFOP中公式數量最多的步驟，不過我們可以透過分類來方便記憶。
        <br />
        由於作者偏好左右手操作，因此本頁會用到大量鏡像公式，並挑選易操作的公式直接鏡像到另一隻手。
      </p>
      <blockquote>
        如果覺得57條公式太多想先跳過，可以使用{" "}
        <NewTabLink href="oll/2look">兩段式OLL</NewTabLink>{" "}
        ，用極少量的公式且速度不會太慢的情況做完OLL
      </blockquote>
      <h2>十字</h2>
      <p>對於兩段式OLL，十字的情況是最先學習的公式，復原簡單且順手。</p>
      <blockquote>
        衍生出進階公式子集 <NewTabLink href="/algs/333/zbll">ZBLL</NewTabLink>{" "}
        ，不過只有極少數人使用，一般玩家沒必要學。
        <br />
        如果你使用 <NewTabLink href="/tutorial/333/zz">
          ZZ Method
        </NewTabLink>{" "}
        ，則最後一層必定形成十字。
      </blockquote>
    </Article>
  );
}

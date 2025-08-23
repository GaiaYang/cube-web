import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import { Notices } from "@/components/notices/Notices";

export const metadata: Metadata = {
  title: "轉動代號說明",
  description:
    "完整解說魔術方塊公式中的字母與數字代表的轉動方式，讓你輕鬆理解每個步驟。",
  alternates: { canonical: "/tutorial/notation" },
};

export default function Page() {
  return (
    <Article>
      <h1>轉動代號說明</h1>
      <p>
        這篇文章是幫助你了解魔術方塊公式中，字母與數字代表的轉動方式。
      </p>
      {/* 插入基本圖案的說明圖片 - 基本六面的示意圖 */}
      <Notices type="underConstruction" />
      <h2>基本符號</h2>
      <p className="flex gap-2">
        <code key="R">R</code>
        <code key="L">L</code>
        <code key="U">U</code>
        <code key="D">D</code>
        <code key="F">F</code>
        <code key="B">B</code>
      </p>
      <p>
        這六個英文字，對應到的是魔術方塊的六個面，每個字母都是意指特定方向順時針轉動90度。
        <br />
        手中拿著方塊的時候，對著自己的那面是F(Front)，以此類推，背對自己的那面是B(Back)。
        <br />
        右手邊的那面是R(Right)，左手邊的那面就是L(Left)。向著天花板的是U(Up)，對著地板的就是D(Down)囉。
      </p>
      <h3>基本符號速記表</h3>
      <ul>
        <li>
          <code>R</code> (Right)：右面順時針轉動90度
        </li>
        <li>
          <code>L</code> (Left)：左面轉動90度
        </li>
        <li>
          <code>U</code> (Up)：上面順時針轉動90度
        </li>
        <li>
          <code>D</code> (Down)：下面順時針轉動90度
        </li>
        <li>
          <code>F</code> (Front)：前面順時針轉動90度
        </li>
        <li>
          <code>B</code> (Back)：後面順時針轉動90度
        </li>
      </ul>
      <strong>注意：</strong>所有轉動都是從該面的角度觀察的順時針方向。
      <h2>標準多層</h2>
      {/* 插入標準多層的說明圖片 - 多層轉動的動畫或分解圖 */}
      <p className="flex gap-2">
        <code key="Rw">Rw</code>
        <code key="Lw">Lw</code>
        <code key="Uw">Uw</code>
        <code key="Dw">Dw</code>
        <code key="Fw">Fw</code>
        <code key="Bw">Bw</code>
      </p>
      <p>
        接續上面的基本六個代號，當他們跟著一個w，那又是什麼意思？其實 w
        可以想成是「寬」（wide）的意思，在魔術方塊上表示可以轉動更多層數。
        <br />
        以3x3魔術方塊為例子，<code key="Rw">Rw</code>
        代表右面的那層與中間一起轉動90度。
        <br />
        簡單來說：
      </p>
      <ul>
        <li>
          <code>R</code> = 只轉右面那一層
        </li>
        <li>
          <code>Rw</code> = 右面那層和中間層2層一起轉
        </li>
      </ul>
      <blockquote>
        對初學者來說，用「右邊」、「中間」、「左邊」來記憶 3×3
        魔術方塊的轉動是很好的入門方式，因為這樣直觀且容易理解。
        <br />
        但當過渡到 4×4 或更高階的魔術方塊（如 5×5、6×6
        等）時，這種描述方式會變得不夠精確，要注意一下。
      </blockquote>
      <h3>標準多層速記表</h3>
      <ul>
        <li>
          <code>Rw</code>：右面那層和中間層一起順時鐘轉90度
        </li>
        <li>
          <code>Lw</code>：左面那層和中間層一起順時鐘轉90度
        </li>
        <li>
          <code>Uw</code>：上面那層和中間層一起順時鐘轉90度
        </li>
        <li>
          <code>Dw</code>：下面那層和中間層一起順時鐘轉90度
        </li>
        <li>
          <code>Fw</code>：前面那層和中間層一起順時鐘轉90度
        </li>
        <li>
          <code>Bw</code>：後面那層和中間層一起順時鐘轉90度
        </li>
      </ul>
      <h2>轉體</h2>
      {/* 插入轉體的說明圖片 - 轉體xyz軸的3D示意圖 */}
      <p className="flex gap-2">
        <code key="x">x</code>
        <code key="y">y</code>
        <code key="z">z</code>
      </p>
      <p>
        這三個字母是指三維空間方向轉動的軸，預設也是順時針，也許數學課有認真唸書跟做3D建模的人們應該很容易理解。
        <br />
        這些符號主要出現在一些特定的進階公式中。如果你也是初學者，可能暫時不需要太擔心這部分，等到遇到包含這些符號的公式時再回來查看就好。
        <span className="text-white/0">
          OS:我不是站長本人，小的我只是來打雜的，也不知道為什麼要轉體，但總是要先寫好幫助大家看懂代號的文章，而且你看不見我，所以就先碎念一下帶過。
        </span>
      </p>
      <h2>逆時針轉動</h2>
      <p className="flex gap-2">
        <code key="'">'</code>
      </p>
      <p>
        在任何基本符號後面加上單引號 <code>'</code>，表示該面逆時針轉動90度。
      </p>
      <h3>逆時針轉動速記表</h3>
      <ul>
        <li>
          <code>R'</code> = 右面逆時針轉動90度
        </li>
        <li>
          <code>L'</code> = 左面逆時針轉動90度
        </li>
        <li>
          <code>U'</code> = 上面逆時針轉動90度
        </li>
        <li>
          <code>D'</code> = 下面逆時針轉動90度
        </li>
        <li>
          <code>F'</code> = 前面逆時針轉動90度
        </li>
        <li>
          <code>B'</code> = 後面逆時針轉動90度
        </li>
      </ul>
      <h2>三階非官方符號及特殊功能轉換</h2>
      {/* 插入數字詞綴的說明圖片 */}
      <h3>數字詞綴</h3>
      <p className="flex gap-2">
        <code key="2">2</code>
        <code key="3">3</code>
      </p>
      <p>
        在基本符號後面加上數字 <code>2</code>
        ，表示該面轉動轉兩次90度，也就是180度。
      </p>
      <p>
        例如：<code>R2</code> = 右面轉動180度，<code>U2</code> = 上面轉動180度
      </p>
      <p>在基本符號後面加上數字，表示重複轉動的次數：</p>
      <ul>
        <li>
          <code>R2</code> = 右面轉動180度（轉兩次90度）
        </li>
        <li>
          <code>R3</code> = 右面轉動270度，等同於 <code>R'</code>
        </li>
      </ul>
      <blockquote>
        所以<code>3</code> 通常會用 <code>'</code> 取代，不大會使用到。
      </blockquote>
      <h3>中間層</h3>
      {/* 插入中間層的說明圖片 - MSE中間層的切面圖 */}
      <p className="flex gap-2">
        <code key="M">M</code>
        <code key="S">S</code>
        <code key="E">E</code>
      </p>
      <p>
        其中 <code>E</code>
        （水平中間層）比較容易理解，就像把魔術方塊橫切後轉動中間那一圈，當在腦海中建模方塊的時候，第一個能夠清晰看到的就是這一個，像是疊三個盤子轉動中間的那個一樣。
        <br />
        <code>M</code> 和 <code>S</code>{" "}
        需要一點時間才能想像出來，好理解到底是怎麼轉動的。
        <br />
        <code>M</code>{" "}
        要想像從左右切開，轉動中間那片，就像把方塊垂直切成三片，轉動中間那一片。
        <br />
        {/* <code>M</code>要想像從左右切開，轉動中間那片，好像恐怖漫畫裡面的情節才會出現的切法，會從中間裂開然後噴血從並從切面往左右兩個方向倒。 */}
        最難的是
        <code>S</code>
        ，要前後切轉那一層，轉起來像是那種健身用的輪子，好像是叫做健腹輪（Ab
        wheel），所以<code>S</code> 層可以想像成健腹輪的滾動方式 ——
        沿著前後方向轉動中間那一層。
      </p>
      <ul>
        <li>
          <code>M</code> (Middle) = 中間垂直層，方向與L相同
        </li>
        <li>
          <code>S</code> (Standing) = 中間前後層，方向與F相同
        </li>
        <li>
          <code>E</code> (Equatorial) = 中間水平層，方向與D相同
        </li>
      </ul>
      <h3>非標準多層</h3>
      <p className="flex gap-2">
        <code key="r">r</code>
        <code key="l">l</code>
        <code key="u">u</code>
        <code key="d">d</code>
        <code key="f">f</code>
        <code key="b">b</code>
      </p>
      <p>這是非官方用法，這種小寫字母通常表示內層轉動，等同於相應的中間層加上外層的組合轉動，用在玩家與玩家之間的溝通。</p>
      <ul>
        <li>
          <code>r</code> = M' + R (右內層)
        </li>
        <li>
          <code>l</code> = M + L (左內層)
        </li>
        <li>
          <code>u</code> = E' + U (上內層)
        </li>
        <li>
          <code>d</code> = E + D (下內層)
        </li>
        <li>
          <code>f</code> = S + F (前內層)
        </li>
        <li>
          <code>b</code> = S' + B (後內層)
        </li>
      </ul>
      <h2>總結</h2>
      <p>
        恭喜！🍾您現在已經能解讀魔術方塊公式的「密碼」了。雖然一開始看到{" "}
        <code>R U R' U'</code>{" "}
        這樣的公式會看不懂，
        <br />
        也許已經讀完文章的你已經知道，這只是「右面轉、上面轉、右面逆轉、上面逆轉」。
        <br />
        接下來可以開始學習基礎解法，將這些符號應用到實際的還原步驟中。
      </p>
    </Article>
  );
}

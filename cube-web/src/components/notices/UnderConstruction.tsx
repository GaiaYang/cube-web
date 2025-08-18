import React from "react";
import { ConstructionIcon } from "lucide-react";

/** 施工中提示 */
export default function UnderConstruction() {
  return (
    <section role="alert" className="not-prose alert alert-warning alert-soft">
      <ConstructionIcon />
      <p>本頁面正在施工中，內容未完成，敬請期待後續更新。</p>
    </section>
  );
}

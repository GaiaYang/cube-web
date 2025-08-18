import React from "react";
import { InfoIcon } from "lucide-react";

/** 單純提及的頁面 */
export default function Mention() {
  return (
    <section role="alert" className="not-prose alert alert-soft">
      <InfoIcon />
      <p>
        本內容僅為附帶說明，作者未使用或未深入探討，僅在教學過程中作參考提及。
      </p>
    </section>
  );
}

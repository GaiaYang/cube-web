import { ConstructionIcon, InfoIcon, PickaxeIcon } from "lucide-react";

export interface NoticesProps {
  type?: "in-progress" | "under-construction" | "mention";
}

export default function Notices({ type }: NoticesProps) {
  switch (type) {
    case "in-progress":
      return (
        <section role="alert" className="not-prose alert alert-info alert-soft">
          <PickaxeIcon />
          <p>
            本頁面內容仍在完善中，資訊可能不完整，會持續更新，敬請留意後續版本。
          </p>
        </section>
      );
    case "under-construction":
      return (
        <section
          role="alert"
          className="not-prose alert alert-warning alert-soft"
        >
          <ConstructionIcon />
          <p>本頁面正在施工中，內容未完成，敬請期待後續更新。</p>
        </section>
      );
    case "mention":
      return (
        <section role="alert" className="not-prose alert alert-soft">
          <InfoIcon />
          <p>
            本內容僅為附帶說明，作者未使用或未深入探討，僅在教學過程中作參考提及。
          </p>
        </section>
      );
    default:
      break;
  }
}

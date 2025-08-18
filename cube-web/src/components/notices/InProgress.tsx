import React from "react";
import { PickaxeIcon } from "lucide-react";

export default function InProgress() {
  return (
    <section role="alert" className="not-prose alert alert-info alert-soft">
      <PickaxeIcon />
      <p>
        本頁面內容仍在完善中，資訊可能不完整，會持續更新，敬請留意後續版本。
      </p>
    </section>
  );
}

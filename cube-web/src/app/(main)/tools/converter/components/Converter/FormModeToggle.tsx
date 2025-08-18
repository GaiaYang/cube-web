import { useAtom } from "jotai";
import React from "react";

import { formLayoutAtom } from "./jotai";

export default function FormModeToggle() {
  const [formType, setFormType] = useAtom(formLayoutAtom);

  return (
    <label className="label">
      <input
        type="checkbox"
        className="toggle checked:toggle-primary"
        checked={formType === "in-place"}
        onChange={(e) => setFormType(e.target.checked ? "in-place" : "stand")}
      />
      是否為原地複寫模式
    </label>
  );
}

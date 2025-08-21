import { useAtom } from "jotai";
import React, { useCallback } from "react";

import { conversionFormLayoutAtom } from "./jotai";

export default function FormModeToggle() {
  const [formType, setFormType] = useAtom(conversionFormLayoutAtom);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFormType(e.target.checked ? "in-place" : "stand");
    },
    [setFormType],
  );

  return (
    <label className="label">
      <input
        type="checkbox"
        className="toggle checked:toggle-primary"
        checked={formType === "in-place"}
        onChange={onChange}
      />
      是否為原地複寫模式
    </label>
  );
}

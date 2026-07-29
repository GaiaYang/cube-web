"use client";

import { Provider, useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";

import CodeSpan from "../CodeSpan";

import BorderTabs from "./BorderTabs";
import { convertTabs, modeTabs } from "./config";
import { cubeOrderAtom, formModeAtom } from "./jotai";

const StandForm = dynamic(() => import("./StandForm"));
const InPlaceForm = dynamic(() => import("./InPlaceForm"));

export default function Converter() {
  return (
    <Provider>
      <section>
        <Toolbar />
        <SwitchContent />
      </section>
    </Provider>
  );
}

function Toolbar() {
  const [formMode, setFormMode] = useAtom(formModeAtom);
  const [cubeOrder, setCubeOrder] = useAtom(cubeOrderAtom);

  return (
    <div className="not-prose grid gap-4">
      <BorderTabs items={modeTabs} value={formMode} onChange={setFormMode} />
      <BorderTabs
        items={convertTabs}
        value={cubeOrder}
        onChange={setCubeOrder}
      />
    </div>
  );
}

function SwitchContent() {
  const cubeOrder = useAtomValue(cubeOrderAtom);

  if (cubeOrder === "333") {
    return (
      <>
        <h3>三階額外符號</h3>
        <ul className="[&>li>span]:flex [&>li>span]:gap-2">
          <li>
            <span>中間層</span>
            <CodeSpan codes={["M", "S", "E"]} />
          </li>
          <li>
            <span>非標準多層</span>
            <CodeSpan codes={["r", "l", "u", "d", "f", "b"]} />
          </li>
        </ul>
        <p>該區塊的轉換器額外支援三階非官方符號及特殊功能轉換</p>
        <FormEntry />
      </>
    );
  }

  return <FormEntry />;
}

function FormEntry() {
  const formMode = useAtomValue(formModeAtom);
  const cubeOrder = useAtomValue(cubeOrderAtom);

  // cubeOrder 變更時 remount，避免 RHF resolver / 輸入狀態殘留
  switch (formMode) {
    case "stand":
      return <StandForm key={`${cubeOrder}-stand`} />;
    case "in-place":
      return <InPlaceForm key={`${cubeOrder}-in-place`} />;
  }
}

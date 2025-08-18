import React from "react";
import dynamic from "next/dynamic";
import { useAtomValue } from "jotai";

import type { CommonFormProps } from "./types";
import { formLayoutAtom } from "./jotai";

const StandForm = dynamic(() => import("./StandForm"));
const InPlaceForm = dynamic(() => import("./InPlaceForm"));

export default function FormEntry(props: CommonFormProps) {
  const formType = useAtomValue(formLayoutAtom);

  switch (formType) {
    case "stand":
      return <StandForm {...props} />;
    case "in-place":
      return <InPlaceForm {...props} />;
    default:
      return null;
  }
}

import React from "react";
import ProportionChart from "@/components/charts/ProportionChart";

export default function Chart() {
  return (
    <ProportionChart
      name="公式佔比"
      maxValue={57}
      data={[
        { value: 3, name: "第一階段" },
        { value: 7, name: "第二階段" },
      ]}
    />
  );
}

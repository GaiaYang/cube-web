import React from "react";
import ProportionChart from "@/components/charts/ProportionChart";

export default function Chart() {
  return (
    <ProportionChart
      name="公式量"
      maxValue={21}
      data={[
        { value: 2, name: "第一階段" },
        { value: 4, name: "第二階段" },
      ]}
    />
  );
}

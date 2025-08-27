"use client";

import React from "react";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { useTheme } from "next-themes";

import chartTheme from "./utils/theme";

export interface ProportionChartProps {
  name: string;
  data?: { name: string; value: number }[];
  maxValue: number;
}

export default function ProportionChart({
  data = [],
  name,
  maxValue,
}: ProportionChartProps) {
  const { resolvedTheme } = useTheme();

  return (
    <section className="not-prose h-80 w-full">
      <ResponsiveRadialBar
        theme={
          chartTheme[(resolvedTheme as "light" | "dark" | undefined) ?? "light"]
        }
        data={[
          {
            id: name,
            data: data.map((item) => ({ x: item.name, y: item.value })),
          },
        ]}
        maxValue={maxValue}
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 36, right: 36, bottom: 36, left: 36 }}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
      />
    </section>
  );
}

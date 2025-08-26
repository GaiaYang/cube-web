"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useDaisyTheme from "@/hooks/useDaisyTheme";

export interface ProportionChartProps {
  name: string;
  data?: { name: string; value: number }[];
  maxValue: number;
  restLabel?: string;
}

const COLORS = [
  "rgb(232, 193, 160)",
  "rgb(244, 117, 96)",
  "rgb(241, 225, 91)",
  "rgb(232, 168, 56)",
  "rgb(97, 205, 187)",
  "rgb(151, 227, 213)",
];

export default function ProportionChart({
  data = [],
  name,
  maxValue,
  restLabel,
}: ProportionChartProps) {
  const { isDark } = useDaisyTheme();

  const totalUsed = data.reduce((sum, item) => sum + item.value, 0);
  const chartData = [
    ...data,
    ...(totalUsed < maxValue
      ? [{ name: restLabel ?? "其餘", value: maxValue - totalUsed }]
      : []),
  ];

  return (
    <ResponsiveContainer width="100%" height={480}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius="50%"
          outerRadius="70%"
          startAngle={90}
          endAngle={-180}
          labelLine={false}
          label={({ name }) => name}
          isAnimationActive={true}
        >
          {chartData.map((entry, index, array) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [
            `${value} / ${maxValue}`,
            name,
          ]}
        />
        <Legend verticalAlign="top" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
}

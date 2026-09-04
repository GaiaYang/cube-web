"use client";

import { Label, Legend, Pie, PieChart, Tooltip } from "recharts";

export type ProportionDatum = { name: string; value: number };

export type ProportionSlice = ProportionDatum & { fill: string };

export interface ProportionChartProps {
  name: string;
  data?: ProportionDatum[];
  maxValue: number;
}

const SLICE_FILLS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
  "var(--color-info)",
  "var(--color-success)",
  "var(--color-warning)",
];

const REST_FILL = "var(--color-base-300)";
const REST_LABEL = "其餘";

function formatPercentOfMax(value: number, maxValue: number): string {
  if (maxValue <= 0) return "0%";
  return `${((value / maxValue) * 100).toFixed(0)}%`;
}

/** 把各階段與未使用的剩餘量組成對齊 maxValue 的切片 */
export function buildProportionSlices(
  data: readonly ProportionDatum[],
  maxValue: number,
): { used: number; rest: number; slices: ProportionSlice[] } {
  const used = data.reduce((sum, item) => sum + item.value, 0);
  const rest = Math.max(0, maxValue - used);
  const slices: ProportionSlice[] = data.map((item, index) => ({
    ...item,
    fill: SLICE_FILLS[index % SLICE_FILLS.length],
  }));
  if (rest > 0) {
    slices.push({ name: REST_LABEL, value: rest, fill: REST_FILL });
  }
  return { used, rest, slices };
}

/** 顯示佔比的圖表 */
export default function ProportionChart({
  data = [],
  name,
  maxValue,
}: ProportionChartProps) {
  const { used, rest, slices } = buildProportionSlices(data, maxValue);

  return (
    <section
      className="not-prose h-80 w-full"
      aria-label={`${name}：已用 ${used} / ${maxValue}，其餘 ${rest}（${formatPercentOfMax(rest, maxValue)}）`}
    >
      <PieChart width="100%" height="100%" responsive>
        <Pie
          data={slices}
          dataKey="value"
          nameKey="name"
          innerRadius="52%"
          outerRadius="78%"
          startAngle={90}
          endAngle={-270}
          paddingAngle={1}
          stroke="none"
        >
          <Label
            position="center"
            value={`${used}/${maxValue}`}
            className="fill-base-content text-xl font-semibold"
          />
        </Pie>
        <Tooltip
          formatter={(value) =>
            `${Number(value)} / ${maxValue}（${formatPercentOfMax(Number(value), maxValue)}）`
          }
          contentStyle={{
            backgroundColor: "var(--color-base-200)",
            border: "none",
            color: "var(--color-base-content)",
          }}
          itemStyle={{ color: "var(--color-base-content)" }}
        />
        <Legend
          position="bottom"
          itemSorter={null}
          labelStyle={{ color: "var(--color-base-content)" }}
          formatter={(legendName, entry) => {
            const value = Number(
              (entry.payload as ProportionDatum | undefined)?.value ?? 0,
            );
            return `${legendName} ${value}（${formatPercentOfMax(value, maxValue)}）`;
          }}
        />
      </PieChart>
    </section>
  );
}

"use client";

import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";

import useDaisyTheme from "@/hooks/useDaisyTheme";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  LabelLayout,
  SVGRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

export interface ProportionChartProps extends Pick<PieSeriesOption, "name"> {
  data?: { name: string; value: number }[];
  /** 資料最大值 */
  maxValue: number;
  /** 剩餘資料的名稱 */
  restLabel?: string;
}

export default function ProportionChart({
  data = [],
  name,
  maxValue,
  restLabel,
}: ProportionChartProps) {
  const { isDark } = useDaisyTheme();

  const totalUsed = data.reduce((sum, item) => sum + item.value, 0);
  const chartData: PieSeriesOption["data"] = [
    ...data,
    ...(totalUsed < maxValue
      ? [{ name: restLabel ?? "其餘", value: maxValue - totalUsed }]
      : []),
  ];

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      formatter: `{b} {c} / ${maxValue ?? 0}`,
    },
    legend: {
      top: "5%",
      left: "center",
      selectedMode: false,
    },
    series: [
      {
        name,
        type: "pie",
        bottom: "-10%",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      theme={isDark ? "dark" : "light"}
      className="rounded-box !h-[400px] overflow-hidden"
      opts={{ renderer: "svg" }}
    />
  );
}

import cn from "@/utils/cn";
import Link from "next/link";
import React from "react";

export default function CTASection() {
  return (
    <ul className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      {ctas.map(_renderCta)}
    </ul>
  );
}

interface CTAItem {
  title: string;
  content: string;
}

function _renderCta(item: CTAItem, index: number) {
  return (
    <li key={index} className="relative lg:row-span-2">
      <div
        className={cn(
          "card cursor-pointer",
          "hover:bg-primary bg-base-100 hover:text-primary-content",
          "ring-base-content/5 shadow-sm ring-1",
          (function () {
            switch (index) {
              case 0:
                return [
                  "rounded-lg",
                  "rounded-t-3xl md:rounded-t-lg",
                  "md:rounded-tl-3xl",
                  "lg:rounded-l-3xl",
                ];
              case 1:
                return ["rounded-lg", "md:rounded-tr-3xl", "lg:rounded-tr-lg"];
              case 2:
                return ["rounded-lg", "md:rounded-bl-3xl", "lg:rounded-bl-lg"];
              case 3:
                return [
                  "rounded-lg",
                  "rounded-b-3xl md:rounded-b-lg",
                  "md:rounded-br-3xl",
                  "lg:rounded-r-3xl",
                ];
              default:
                return "rounded-lg";
            }
          })(),
        )}
      >
        <Link href="/" className="absolute inset-0 z-1">
          <span className="sr-only">{item.title}</span>
        </Link>
        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>
          <p>{item.content}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </li>
  );
}

const ctas: CTAItem[] = [
  { title: "Cross", content: "十字" },
  { title: "F2L", content: "前兩層" },
  { title: "OLL", content: "頂層方向" },
  { title: "PLL", content: "頂層位置" },
];

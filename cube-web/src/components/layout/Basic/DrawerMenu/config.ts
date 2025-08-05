import type { MenuOption } from "./types";

export const options: MenuOption[] = [
  {
    label: "公式表",
    href: "/algs",
    submenu: [
      {
        label: "三階公式表",
        submenu: [
          { label: "總覽", href: "/algs/333" },
          { label: "OLL", href: "/algs/333/oll" },
          { label: "PLL", href: "/algs/333/pll" },
        ],
      },
    ],
  },
];

import type { MenuOption } from "../types";

export const options: MenuOption[] = [
  {
    label: "公式表",
    href: "/algs",
    submenu: [
      {
        label: "三階公式表",
        // href: "/event/333/algs",
        submenu: [
          { label: "總覽", href: "/event/333/algs" },
          { label: "OLL", href: "/event/333/algs/oll" },
          { label: "PLL", href: "/event/333/algs/pll" },
        ],
      },
    ],
  },
];

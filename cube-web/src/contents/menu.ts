import createMenuOptions from "@/utils/createMenuOptions";

/** 抽屜菜單(側邊欄) */
export const drawerMenu = createMenuOptions([
  {
    id: "/tutorial",
    title: "教學",
    submenu: [
      {
        id: "/tutorial/notation",
        title: "轉動代號說明",
        href: "/tutorial/notation",
      },
      {
        id: "/tutorial/333",
        title: "三階教學",
        submenu: [
          {
            id: "/tutorial/333/cfop",
            title: "CFOP",
            href: "/tutorial/333/cfop",
            submenu: [
              {
                id: "/tutorial/333/cfop/cross",
                title: "Cross",
                href: "/tutorial/333/cfop/cross",
              },
              {
                id: "/tutorial/333/cfop/f2l",
                title: "F2L",
                href: "/tutorial/333/cfop/f2l",
              },
              {
                id: "/tutorial/333/cfop/oll",
                title: "OLL",
                href: "/tutorial/333/cfop/oll",
                submenu: [
                  {
                    id: "/tutorial/333/cfop/oll/2look",
                    title: "兩段式OLL",
                    href: "/tutorial/333/cfop/oll/2look",
                  },
                ],
              },
              {
                id: "/tutorial/333/cfop/pll",
                title: "PLL",
                href: "/tutorial/333/cfop/pll",
                submenu: [
                  {
                    id: "/tutorial/333/cfop/pll/2look",
                    title: "兩段式PLL",
                    href: "/tutorial/333/cfop/pll/2look",
                  },
                ],
              },
            ],
          },
          {
            id: "/tutorial/333/zz",
            title: "ZZ",
            href: "/tutorial/333/zz",
            submenu: [
              {
                id: "/tutorial/333/zz/eo-line",
                title: "EO Line",
                href: "/tutorial/333/zz/eo-line",
              },
            ],
          },
        ],
        asTitle: true,
      },
    ],
    collapsible: true,
  },
  {
    id: "/algs",
    title: "公式表",
    submenu: [
      {
        id: "/algs/333",
        title: "三階公式表",
        asTitle: true,
        submenu: [
          { id: "/algs/333/f2l", title: "F2L", href: "/algs/333/f2l" },
          { id: "/algs/333/oll", title: "OLL", href: "/algs/333/oll" },
          { id: "/algs/333/pll", title: "PLL", href: "/algs/333/pll" },
          {
            title: "進階公式子集",
            asTitle: true,
            submenu: [
              { id: "/algs/333/zbll", title: "ZBLL", href: "/algs/333/zbll" },
              { id: "/algs/333/zbls", title: "ZBLS", href: "/algs/333/zbls" },
            ],
          },
        ],
      },
    ],
    collapsible: true,
  },
  {
    id: "/tools",
    title: "工具",
    submenu: [
      { id: "/tools/converter", title: "公式轉換", href: "/tools/converter" },
    ],
    collapsible: true,
  },
]);

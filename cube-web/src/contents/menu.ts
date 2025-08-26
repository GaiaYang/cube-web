import createMenuOptions from "@/utils/createMenuOptions";

/** 抽屜菜單(側邊欄) */
export const drawerMenu = createMenuOptions([
  {
    title: "教學",
    submenu: [
      {
        title: "轉動代號說明",
        href: "/tutorial/notation",
      },
      {
        title: "三階教學",
        submenu: [
          {
            title: "CFOP",
            href: "/tutorial/333/cfop",
            submenu: [
              {
                title: "Cross",
                href: "/tutorial/333/cfop/cross",
              },
              {
                title: "F2L",
                href: "/tutorial/333/cfop/f2l",
              },
              {
                title: "OLL",
                href: "/tutorial/333/cfop/oll",
                submenu: [
                  {
                    title: "兩段式OLL",
                    href: "/tutorial/333/cfop/oll/2look",
                  },
                ],
              },
              {
                title: "PLL",
                href: "/tutorial/333/cfop/pll",
                submenu: [
                  {
                    title: "兩段式PLL",
                    href: "/tutorial/333/cfop/pll/2look",
                  },
                ],
              },
            ],
          },
          {
            title: "ZZ",
            href: "/tutorial/333/zz",
            submenu: [
              {
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
    title: "公式表",
    submenu: [
      {
        title: "三階公式表",
        asTitle: true,
        submenu: [
          { title: "F2L", href: "/algs/333/f2l" },
          { title: "OLL", href: "/algs/333/oll" },
          { title: "PLL", href: "/algs/333/pll" },
          {
            title: "進階公式子集",
            asTitle: true,
            submenu: [
              { title: "ZBLL", href: "/algs/333/zbll" },
              { title: "ZBLS", href: "/algs/333/zbls" },
            ],
          },
        ],
      },
    ],
    collapsible: true,
  },
  {
    title: "工具",
    submenu: [{ title: "公式轉換", href: "/tools/converter" }],
    collapsible: true,
  },
]);

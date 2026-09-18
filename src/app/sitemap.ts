import type { MetadataRoute } from "next";

import { definitions as f2l } from "@/data/cube/333/f2l";
import { definitions as oll } from "@/data/cube/333/oll";
import { definitions as pll } from "@/data/cube/333/pll";
import { SITE_URL } from "@/lib/config";

const staticPaths = [
  "/",
  "/tutorial",
  "/tutorial/notation",
  "/tutorial/333",
  "/tutorial/333/cfop",
  "/tutorial/333/cfop/cross",
  "/tutorial/333/cfop/f2l",
  "/tutorial/333/cfop/oll",
  "/tutorial/333/cfop/oll/2look",
  "/tutorial/333/cfop/pll",
  "/tutorial/333/cfop/pll/2look",
  "/tutorial/333/zz",
  "/tutorial/333/zz/eo-line",
  "/tools",
  "/tools/converter",
  "/algs",
  "/algs/333",
  "/algs/333/f2l",
  "/algs/333/oll",
  "/algs/333/pll",
  "/algs/333/zbls",
  "/algs/333/zbll",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const casePaths = [
    ...f2l.map((item) => `/algs/333/f2l/${item.id}`),
    ...oll.map((item) => `/algs/333/oll/${item.id}`),
    ...pll.map((item) => `/algs/333/pll/${item.id}`),
  ];

  return [...staticPaths, ...casePaths].map((path) => ({
    url: new URL(path, SITE_URL).href,
  }));
}

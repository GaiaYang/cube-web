import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools/converter`,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tutorial/333/cross`,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tutorial/333/f2l`,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tutorial/333/oll`,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tutorial/333/pll`,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/algs/333/f2l`,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/algs/333/oll`,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/algs/333/pll`,
      priority: 0.7,
    },
  ];
}

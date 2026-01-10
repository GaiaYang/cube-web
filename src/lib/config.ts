export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://void-cube.vercel.app"
    : "http://localhost:3000";

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://voidling-cube.vercel.app/"
    : "http://localhost:3000";

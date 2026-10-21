import { BASE } from "./paths";

// Set this to the public production origin when deploying to another domain.
export const SITE_URL = (process.env.SITE_URL || "https://speakguru.net").replace(/\/$/, "");
export const siteUrl = (path: string) => `${SITE_URL}${BASE}${path}`;

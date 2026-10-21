import { ARTICLES_PER_PAGE, articleListPath, getArticlePage } from "@/lib/articles";
import { siteUrl } from "@/lib/site";
import { xmlEscape, xmlResponse, sitemapUnavailable } from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { total } = await getArticlePage(1, 1, 300);
    const pages = Math.ceil(total / ARTICLES_PER_PAGE);
    const urls = ["/", "/business", "/news", ...Array.from({ length: Math.max(0, pages - 1) }, (_, i) => articleListPath(i + 2))];
    return xmlResponse(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path => `<url><loc>${xmlEscape(siteUrl(path))}</loc></url>`).join("")}</urlset>`);
  } catch (error) { console.error("Failed to load site sitemap", error); return sitemapUnavailable(); }
}

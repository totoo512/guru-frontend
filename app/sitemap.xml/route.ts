import { getArticlePage, SITEMAP_PAGE_SIZE } from "@/lib/articles";
import { siteUrl } from "@/lib/site";
import { xmlEscape, xmlResponse, sitemapUnavailable } from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { total } = await getArticlePage(1, 1, 300);
    const pages = Math.ceil(total / SITEMAP_PAGE_SIZE);
    const urls = [siteUrl("/sitemaps/site.xml"), ...Array.from({ length: pages }, (_, i) => siteUrl(`/sitemaps/${i + 1}.xml`))];
    return xmlResponse(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<sitemap><loc>${xmlEscape(url)}</loc></sitemap>`).join("")}</sitemapindex>`);
  } catch (error) { console.error("Failed to load sitemap index", error); return sitemapUnavailable(); }
}

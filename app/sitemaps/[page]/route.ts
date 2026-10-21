import { getArticlePage, SITEMAP_PAGE_SIZE } from "@/lib/articles";
import { siteUrl } from "@/lib/site";
import { xmlEscape, xmlResponse, sitemapUnavailable } from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export async function GET(_: Request, { params }: { params: { page: string } }) {
  const match = /^([1-9]\d*)\.xml$/.exec(params.page);
  const page = match ? Number(match[1]) : 0;
  if (!Number.isSafeInteger(page) || page < 1) return new Response("Not found", { status: 404 });
  try {
    // Reject unknown shards before sending an arbitrarily large offset to the upstream API.
    const { total } = await getArticlePage(1, 1, 300);
    if (page > Math.ceil(total / SITEMAP_PAGE_SIZE)) return new Response("Not found", { status: 404 });
    const { articles } = await getArticlePage(page, SITEMAP_PAGE_SIZE, 300);
    return xmlResponse(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${articles.map(article => `<url><loc>${xmlEscape(siteUrl(`/news/${article.slug}`))}</loc>${article.updatedAt ? `<lastmod>${xmlEscape(article.updatedAt)}</lastmod>` : ""}</url>`).join("")}</urlset>`);
  } catch (error) { console.error("Failed to load article sitemap", error); return sitemapUnavailable(); }
}

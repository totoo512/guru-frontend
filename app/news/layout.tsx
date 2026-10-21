import SiteFooter from "@/components/SiteFooter";
import NewsHeader from "@/components/news/NewsHeader";
import "./news.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <div className="keraft news-shell">
    <NewsHeader />
    <main>{children}</main>
    <SiteFooter />
  </div>;
}

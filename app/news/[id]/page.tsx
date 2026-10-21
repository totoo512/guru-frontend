import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatArticleDate, getArticle, getArticlePage } from "@/lib/articles";
import { jsonLd } from "@/lib/article-html";
import { siteUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getArticle(params.id);
  if (!article) notFound();
  return {
    title: `${article.title} | 咕噜口语`, description: article.summary,
    alternates: { canonical: siteUrl(`/news/${article.slug}`) },
    openGraph: { title: article.title, description: article.summary, url: siteUrl(`/news/${article.slug}`), type: "article", locale: "zh_CN", publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author] },
    twitter: { card: "summary", title: article.title, description: article.summary },
  };
}
export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  if (!article) notFound();
  const others = (await getArticlePage().catch(() => ({ articles: [], total: 0 }))).articles.filter(item => item.slug !== article.slug);
  const related = [...others.filter(item => item.topic === article.topic).slice(0, 3), ...others.filter(item => item.topic !== article.topic).slice(0, 3)].slice(0, 3);
  const url = siteUrl(`/news/${article.slug}`);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.summary, datePublished: article.publishedAt || undefined, dateModified: article.updatedAt || undefined, author: { "@type": "Organization", name: article.author }, publisher: { "@type": "Organization", name: "咕噜口语", url: siteUrl("/") }, mainEntityOfPage: url, url }) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首页", item: siteUrl("/") }, { "@type": "ListItem", position: 2, name: "资讯", item: siteUrl("/news") }, { "@type": "ListItem", position: 3, name: article.title, item: url }] }) }} />
    <div className="wrap news-detail-wrap">
      <nav className="news-breadcrumb" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><Link href="/news">资讯</Link><span>/</span><span>正文</span></nav>
      <div className="news-detail-grid"><article className="news-article">
        <header className="news-article-header"><Link className="news-back" href="/news">← 返回资讯</Link><h1>{article.title}</h1><p className="news-article-summary">{article.summary}</p><div className="news-article-meta"><span>{article.author}</span><span>·</span><time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time><span>·</span><span>{article.readingMinutes} 分钟阅读</span></div>{article.updatedAt !== article.publishedAt && <p className="news-updated">更新于 <time dateTime={article.updatedAt}>{formatArticleDate(article.updatedAt)}</time></p>}</header>
        <div className="news-prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        <div className="news-article-end"><span>把方法，变成下一次开口的底气。</span><Link href="/news">继续探索资讯 →</Link></div>
      </article><aside className="news-sidebar"><div className="news-side-promo"><h2>学到的，<br />开口就用。</h2><p>从真实场景出发，和你的 AI 英语教练练习自然表达。</p><Link className="btn btn-primary" href="/#final-cta">体验咕噜口语 ↗</Link></div>{related.length > 0 && <div className="news-related"><h2>继续阅读</h2>{related.map(item => <Link key={item.slug} href={`/news/${item.slug}`} prefetch={false}><h3>{item.title}</h3><time dateTime={item.publishedAt}>{formatArticleDate(item.publishedAt)}</time></Link>)}</div>}</aside></div>
    </div>
  </>;
}

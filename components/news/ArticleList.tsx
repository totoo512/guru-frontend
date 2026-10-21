import Link from "next/link";
import { ARTICLES_PER_PAGE, articleListPath, formatArticleDate, type Article } from "@/lib/articles";

export default function ArticleList({ articles, total, page = 1 }: { articles: Article[]; total: number; page?: number }) {
  const totalPages = Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));
  const pageNumbers = [...new Set([1, page - 1, page, page + 1, totalPages])].filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  return <>
    <section className="news-hero"><div className="wrap">
      <nav className="news-breadcrumb" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><span>资讯</span></nav>
      
      <h1>从读懂，到<span>自信开口。</span></h1>
      <p>探索英语学习方法、真实交流场景与 AI 口语新知。<br className="news-desktop-break" />让好方法，成为每一天的小进步。</p>
      <div className="news-hero-meta"><span className="news-live-dot" />英语学习 · 实用指南 · 产品洞察</div>
    </div></section>
    <section className="news-feed wrap" aria-labelledby="news-feed-title">
      <div className="news-feed-heading"><div><h2 id="news-feed-title">{page === 1 ? "最新资讯" : `资讯 · 第 ${page} 页`}</h2></div><p>{total.toLocaleString("zh-CN")} 篇内容，陪你持续进步</p></div>
      {articles.length ? <div className="news-grid">{articles.map((article, i) => <article key={article.slug} className={`news-card ${page === 1 && i === 0 ? "news-card--featured" : ""}`}>
        <h3><Link href={`/news/${article.slug}`} prefetch={false}>{article.title}</Link></h3>
        <p className="news-card-summary">{article.summary}</p>
        <div className="news-card-bottom"><span><time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time><span className="news-meta-dot">·</span>{article.readingMinutes} 分钟阅读</span><Link href={`/news/${article.slug}`} prefetch={false} aria-label={`阅读全文：${article.title}`} className="news-read-arrow">↗</Link></div>
      </article>)}</div> : <div className="news-empty"><h3>好内容，正在准备中</h3><p>关于英语学习与自信表达的新分享，即将与你见面。</p><Link className="btn" href="/">先去了解咕噜口语 →</Link></div>}
      {totalPages > 1 && <nav className="news-pagination" aria-label="文章分页">
        {page > 1 && <Link href={articleListPath(page - 1)}>← 上一页</Link>}
        {pageNumbers.map((p, i) => <span key={p}>{i > 0 && p - pageNumbers[i - 1] > 1 && <span className="news-page-gap">…</span>}<Link href={articleListPath(p)} aria-current={p === page ? "page" : undefined}>{p}</Link></span>)}
        {page < totalPages && <Link href={articleListPath(page + 1)}>下一页 →</Link>}
      </nav>}
    </section>
    <section className="news-bottom-cta wrap"><div><h2>读到的好方法，开口试一试。</h2><p>和咕噜口语一起，把学习变成真实的表达。</p></div><Link className="btn btn-primary" href="/#final-cta">开始练习 →</Link></section>
  </>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleList from "@/components/news/ArticleList";
import { ARTICLES_PER_PAGE, articleListPath, getArticlePage } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

export function generateMetadata({ params }: { params: { page: string } }): Metadata {
  return { title: `英语学习资讯 · 第 ${params.page} 页 | 咕噜口语`, alternates: { canonical: siteUrl(articleListPath(Number(params.page))) } };
}
export default async function NewsPage({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  if (!/^[1-9]\d*$/.test(params.page) || !Number.isSafeInteger(page) || page < 2) notFound();
  const { articles, total } = await getArticlePage(page);
  if (page > Math.ceil(total / ARTICLES_PER_PAGE)) notFound();
  return <ArticleList articles={articles} total={total} page={page} />;
}

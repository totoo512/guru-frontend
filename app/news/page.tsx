import type { Metadata } from "next";
import ArticleList from "@/components/news/ArticleList";
import { getArticlePage } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "英语学习资讯与口语指南 | 咕噜口语 SpeakGuru",
  description: "探索英语口语学习方法、真实交流场景与 AI 口语新知，和咕噜口语一起自信开口。",
  alternates: { canonical: siteUrl("/news") },
  openGraph: { title: "英语学习资讯与口语指南 | 咕噜口语", description: "英语学习方法、实用指南与 AI 口语新知。", url: siteUrl("/news"), type: "website", locale: "zh_CN" },
};

export default async function NewsPage() {
  const { articles, total } = await getArticlePage();
  return <ArticleList articles={articles} total={total} />;
}

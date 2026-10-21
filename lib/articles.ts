import { cache } from "react";
import { articleHtml, plainText } from "./article-html";

export const ARTICLES_PER_PAGE = 9;
export const SITEMAP_PAGE_SIZE = 100;
export const articleListPath = (page: number) => page === 1 ? "/news" : `/news/page/${page}`;
const API = "https://admin.huoideas.com/api/seo/article";

export interface Article {
  slug: string;
  title: string;
  summary: string;
  html: string;
  publishedAt: string;
  updatedAt: string;
  topic: string;
  author: string;
  readingMinutes: number;
}
export interface ArticlePage { articles: Article[]; total: number; }

function dateValue(value: unknown): string {
  if (!value) return "";
  const input = String(value);
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(input) ? `${input}T00:00:00+08:00`
    : /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2})?$/.test(input) ? `${input.replace(" ", "T")}+08:00` : input;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function normalizeArticle(value: unknown): Article {
  if (!value || typeof value !== "object") throw new Error("文章接口返回了无效文章");
  const data = value as Record<string, unknown>;
  const slug = String(data.id ?? "");
  const title = plainText(String(data.title ?? ""));
  if (!/^[1-9]\d*$/.test(slug) || !title || typeof data.content !== "string") throw new Error("文章接口缺少 ID、标题或正文");
  const html = articleHtml(data.content);
  const text = plainText(html);
  const publishedAt = dateValue(data.createTime);
  return {
    slug, title, html, publishedAt,
    updatedAt: dateValue(data.updateTime) || publishedAt,
    summary: plainText(String(data.summary || text)).slice(0, 180),
    topic: plainText(String(data.topic || "英语学习")),
    author: plainText(String(data.createBy || "咕噜口语")),
    readingMinutes: Math.max(1, Math.ceil(text.length / 400)),
  };
}

async function requestArticleApi(path: string, cacheSeconds: number): Promise<unknown> {
  const response = await fetch(`${API}${path}`, {
    ...(cacheSeconds > 0 ? { next: { revalidate: cacheSeconds } } : { cache: "no-store" as const }),
    signal: AbortSignal.timeout(15000),
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`文章服务请求失败：HTTP ${response.status}`);
  const result = await response.json();
  if (!result || result.code !== 0) throw new Error("文章服务返回失败状态");
  return result.data;
}

// React cache only deduplicates within a render; visitor requests always fetch fresh content.
export const getArticlePage = cache(async (page = 1, pageSize = ARTICLES_PER_PAGE, cacheSeconds = 0): Promise<ArticlePage> => {
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(pageSize) || pageSize < 1) throw new Error("文章分页参数无效");
  const value = await requestArticleApi(`/page?pageNum=${page}&pageSize=${pageSize}`, cacheSeconds);
  if (!value || typeof value !== "object") throw new Error("文章列表接口格式异常");
  const data = value as Record<string, unknown>;
  const total = data.total;
  if (!Array.isArray(data.list) || typeof total !== "number" || !Number.isSafeInteger(total) || total < 0) throw new Error("文章列表接口格式异常");
  return { articles: data.list.map(normalizeArticle), total };
});

export const getArticle = cache(async (id: string): Promise<Article | undefined> => {
  if (!/^[1-9]\d*$/.test(id)) return undefined;
  const value = await requestArticleApi(`/one?articleId=${encodeURIComponent(id)}`, 0);
  if (value == null) return undefined;
  const article = normalizeArticle(value);
  if (article.slug !== id) throw new Error("文章详情接口返回的 ID 不匹配");
  return article;
});

export function formatArticleDate(iso: string) {
  return iso ? new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Shanghai" }).format(new Date(iso)) : "日期未提供";
}

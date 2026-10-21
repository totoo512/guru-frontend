"use client";

import { useRouter } from "next/navigation";

export default function NewsError({ reset }: { reset: () => void }) {
  const router = useRouter();
  return <section className="wrap section news-empty" role="alert">
    <h1>资讯暂时无法加载</h1>
    <p>文章服务暂时不可用，请稍后重试。</p>
    <button className="btn" onClick={() => { router.refresh(); reset(); }}>重新加载</button>
  </section>;
}

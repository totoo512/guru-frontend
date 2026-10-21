import { BASE } from "@/lib/paths";

export default function SiteFooter({ home = false }: { home?: boolean }) {
  const homeLink = (section: string) => home ? `#${section}` : `${BASE}/#${section}`;
  return <footer className="site-footer">
    <div className="wrap">
      <div className="foot-grid">
        <div className="foot-brand"><h4>咕噜口语</h4><p className="small">你的场景化 AI 英语口语教练<br />帮中国人真正开口说英语</p></div>
        <div><h4>产品</h4><div className="stack"><a href={homeLink("how")}>如何开口</a><a href={homeLink("capabilities")}>核心功能</a><a href={homeLink("scenes")}>练习场景</a></div></div>
        <div><h4>服务</h4><div className="stack"><a href={`${BASE}/business`}>企业版</a><a href={`${BASE}/news`}>资讯</a><a href={homeLink("faq")}>常见问题</a></div></div>
        <div><h4>法律</h4><div className="stack"><a href="#">用户协议</a><a href="#">隐私政策</a></div></div>
      </div>
      <div className="foot-meta"><div>© 2026 北京火山创想科技有限公司</div><div className="foot-meta-beian">京ICP备2023009050号-4</div></div>
    </div>
  </footer>;
}

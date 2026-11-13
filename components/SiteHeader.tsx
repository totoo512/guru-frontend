"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Popover } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { ASSETS as A, BASE } from "@/lib/paths";
import type { useSiteTheme } from "@/lib/useSiteTheme";

export default function SiteHeader({ theme, onDownload, home = false }: {
  theme: ReturnType<typeof useSiteTheme>;
  onDownload: () => void;
  home?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { mode, changeMode, themePanel } = theme;
  const homeLink = (section: string) => home ? `#${section}` : `${BASE}/#${section}`;
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prevRootOverflow = root.style.overflow;
    const prevRootScrollBehavior = root.style.scrollBehavior;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const prevBodyPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      root.style.overflow = prevRootOverflow;
      root.style.scrollBehavior = "auto";
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      body.style.paddingRight = prevBodyPadding;
      window.scrollTo(0, scrollY);
      root.style.scrollBehavior = prevRootScrollBehavior;
    };
  }, [menuOpen]);

  return (
      <header className={`site-header ${menuOpen ? "is-menu-open" : ""}`}>
        <div className="wrap nav-inner">
          <a className="logo" href={homeLink("top")}><img src={`${A}guru-icon.png`} alt="咕噜口语" /><span>咕噜口语</span></a>
          <nav id="site-navigation" aria-label="主导航" className={`nav-panel ${menuOpen ? "is-open" : ""}`}>
            <ul className="nav-links" onClick={() => setMenuOpen(false)}>
              <li className="dropdown"><a href={homeLink("top")} className="nav-link-dd">产品 <i className="nav-chevron" /></a><div className="dropdown-menu"><a href={homeLink("how")} className="dd-item"><span className="dd-ico">✦</span><span className="dd-text"><b>核心产品</b><small>场景学习 · AI 对话</small></span></a></div></li>
              <li><a href={homeLink("how")}>如何开口</a></li><li><a href={homeLink("capabilities")}>核心功能</a></li><li><a href={homeLink("scenes")}>场景</a></li><li><a href={`${BASE}/news`} aria-current={/^\/news(?:\/|$)/.test(pathname) ? "page" : undefined}>资讯</a></li><li><a href={`${BASE}/about`} aria-current={pathname === "/about" ? "page" : undefined}>公司介绍</a></li><li><a href={homeLink("faq")}>FAQ</a></li>
            </ul>
            <div className="nav-actions nav-actions--panel"><button className="btn" onClick={() => { setMenuOpen(false); onDownload(); }}>免费下载APP</button></div>
          </nav>
          <div className="nav-actions nav-actions--bar"><div className="theme-switch"><Popover content={themePanel} trigger="click" placement="bottomRight" arrow={false} rootClassName="theme-popover"><button type="button" className="theme-btn" aria-label="切换主题色"><span className="theme-dot" /></button></Popover><button type="button" className={`theme-btn mode-btn ${mode === "dark" ? "is-dark" : ""}`} aria-label={mode === "dark" ? "切换到白天模式" : "切换到夜间模式"} onClick={(e) => changeMode(mode === "dark" ? "light" : "dark", e)}><SunOutlined className="mode-sun" /><MoonOutlined className="mode-moon" /></button></div><a className="btn nav-biz" href={`${BASE}/business`}>了解企业版</a><button className="btn btn-primary" onClick={() => { setMenuOpen(false); onDownload(); }}>下载 APP</button></div>
          <button className="nav-toggle" aria-label={menuOpen ? "关闭菜单" : "打开菜单"} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}><span className="nav-burger"><i/><i/><i/></span></button>
        </div>
      </header>
  );
}

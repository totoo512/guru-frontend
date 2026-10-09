"use client";

import { Button, Dropdown, Space } from "antd";
import { DownloadOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const navItems = [
  {
    key: "product",
    label: "产品",
    children: [
      { key: "app", label: "口语匠 APP" },
      { key: "web", label: "网页版" },
    ],
  },
  {
    key: "how",
    label: "如何开口",
    children: [
      { key: "step1", label: "选定场景" },
      { key: "step2", label: "夯实词句" },
      { key: "step3", label: "实战对话" },
      { key: "step4", label: "进度追踪" },
    ],
  },
  {
    key: "feature",
    label: "核心功能",
    children: [
      { key: "cefr", label: "CEFR 测评" },
      { key: "ai", label: "AI 纠音" },
      { key: "radar", label: "能力雷达" },
    ],
  },
  {
    key: "scene",
    label: "使用场景",
    children: [
      { key: "daily", label: "日常口语" },
      { key: "work", label: "职场商务" },
      { key: "exam", label: "考试备考" },
      { key: "travel", label: "出行旅游" },
    ],
  },
  { key: "faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
        transition: "all 0.25s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <a
          href="#top"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg,#6366f1,#0ea5e9)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            O
          </div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>口语匠 OralCraft</span>
        </a>

        <nav className="desktop-nav" style={{ display: "flex", gap: 8 }}>
          {navItems.map((item) =>
            item.children ? (
              <Dropdown
                key={item.key}
                menu={{ items: item.children.map((c) => ({ key: c.key, label: c.label })) }}
                placement="bottom"
              >
                <Button type="text">
                  <Space size={4}>
                    {item.label}
                    <DownOutlined style={{ fontSize: 10 }} />
                  </Space>
                </Button>
              </Dropdown>
            ) : (
              <Button key={item.key} type="text" href={`#${item.key}`}>
                {item.label}
              </Button>
            )
          )}
        </nav>

        <Space>
          <Button type="text">企业版</Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            下载 APP
          </Button>
        </Space>
      </div>
    </header>
  );
}

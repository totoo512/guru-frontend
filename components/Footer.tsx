"use client";

import { Row, Col } from "antd";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
              <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>
                口语匠 OralCraft
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              帮中国人真正开口说英语。
              <br />
              你的场景化 AI 英语口语教练。
            </p>
            <p style={{ marginTop: 16, fontSize: 13 }}>
              合作邮箱: hello@oral-craft.com
            </p>
          </Col>
          <Col xs={12} md={4}>
            <h4>产品</h4>
            <a href="#">口语匠 APP</a>
            <a href="#">网页版</a>
            <a href="#">企业版</a>
            <a href="#">更新日志</a>
          </Col>
          <Col xs={12} md={4}>
            <h4>资源</h4>
            <a href="#">学习方法</a>
            <a href="#">口语测评</a>
            <a href="#">社区</a>
            <a href="#">博客</a>
          </Col>
          <Col xs={12} md={4}>
            <h4>公司</h4>
            <a href="#">关于我们</a>
            <a href="#">加入我们</a>
            <a href="#">媒体资料</a>
            <a href="#">联系我们</a>
          </Col>
          <Col xs={12} md={4}>
            <h4>法律</h4>
            <a href="#">用户协议</a>
            <a href="#">隐私政策</a>
            <a href="#">儿童保护</a>
            <a href="#">合规声明</a>
          </Col>
        </Row>
        <div className="footer-bottom">
          © 2026 OralCraft Inc. 口语匠科技有限公司 保留所有权利 ·
          沪ICP备 2024000000 号 · 沪公网安备 31010000000000 号 · 本页面为原型 Demo
        </div>
      </div>
    </footer>
  );
}

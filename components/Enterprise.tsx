"use client";

import { Button, Row, Col, Space, Tag } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const points = [
  "统一管理团队账号与权限",
  "按部门/岗位下发学习任务",
  "可视化学习数据看板",
  "定制企业专属场景内容",
];

export default function Enterprise() {
  return (
    <section
      className="section"
      style={{
        background:
          "linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#4338ca 100%)",
        color: "#fff",
      }}
    >
      <div className="container">
        <Row gutter={[48, 32]} align="middle">
          <Col xs={24} md={12}>
            <Tag color="blue" style={{ borderRadius: 999 }}>
              企业版
            </Tag>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 800,
                marginTop: 16,
                marginBottom: 20,
                color: "#fff",
              }}
            >
              为你的团队,
              <br />
              定制一位 AI 口语教练
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              已服务华为、字节跳动、新东方等 100+ 企业与教育机构,
              帮助十万级员工高效提升英语口语能力。
            </p>
            <div style={{ marginBottom: 32 }}>
              {points.map((p) => (
                <div key={p} style={{ marginBottom: 12, display: "flex", gap: 10 }}>
                  <CheckCircleFilled style={{ color: "#60a5fa", fontSize: 18 }} />
                  <span style={{ color: "#e2e8f0" }}>{p}</span>
                </div>
              ))}
            </div>
            <Space>
              <Button type="primary" size="large">
                立即咨询
              </Button>
              <Button
                size="large"
                ghost
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
              >
                查看方案
              </Button>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: 28,
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ fontSize: 13, color: "#93c5fd", marginBottom: 8 }}>
                企业管理后台 · 预览
              </div>
              <h3 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
                团队本月学习情况
              </h3>
              {[
                { l: "活跃学员", v: "238 / 260", c: "#60a5fa" },
                { l: "总练习时长", v: "1,842 小时", c: "#34d399" },
                { l: "平均口语分数", v: "78.6", c: "#fbbf24" },
                { l: "完成任务数", v: "4,529", c: "#f472b6" },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{ color: "#cbd5e1" }}>{s.l}</span>
                  <span style={{ color: s.c, fontWeight: 600 }}>{s.v}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

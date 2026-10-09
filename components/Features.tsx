"use client";

import { Row, Col, Progress } from "antd";
import {
  AudioOutlined,
  RadarChartOutlined,
  BookOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const features = [
  {
    icon: <AudioOutlined />,
    title: "AI 实时纠音",
    desc: "音素级别发音打分，精准定位连读、重音问题。",
    color: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  },
  {
    icon: <RadarChartOutlined />,
    title: "CEFR 能力雷达",
    desc: "五维口语画像，对标欧洲语言框架。",
    color: "linear-gradient(135deg,#0ea5e9,#06b6d4)",
  },
  {
    icon: <BookOutlined />,
    title: "场景化内容库",
    desc: "500+ 真实场景，覆盖生活、职场、考试全领域。",
    color: "linear-gradient(135deg,#10b981,#059669)",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "多轮智能对话",
    desc: "AI Tutor 会追问与引导，模拟真人交流。",
    color: "linear-gradient(135deg,#f59e0b,#f97316)",
  },
  {
    icon: <TrophyOutlined />,
    title: "打卡与挑战",
    desc: "每日任务 + 排行榜，让坚持变简单。",
    color: "linear-gradient(135deg,#ec4899,#f43f5e)",
  },
  {
    icon: <TeamOutlined />,
    title: "企业版管理",
    desc: "后台任务下发、学习数据看板，为团队赋能。",
    color: "linear-gradient(135deg,#64748b,#475569)",
  },
];

export default function Features() {
  return (
    <section className="section" style={{ background: "#f8fafc" }} id="feature">
      <div className="container">
        <div className="section-title">
          <h2>核心能力矩阵</h2>
          <p>每一项都是开口的核心驱动力</p>
        </div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 20,
                padding: 32,
                background: "linear-gradient(135deg,#0f172a,#1e293b)",
                color: "#fff",
                height: "100%",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
                你的口语能力画像
              </h3>
              <p style={{ color: "#94a3b8", marginBottom: 28 }}>
                基于 CEFR 国际标准动态更新
              </p>
              {[
                { label: "发音 Pronunciation", v: 86 },
                { label: "流利度 Fluency", v: 72 },
                { label: "语法 Grammar", v: 80 },
                { label: "词汇 Vocabulary", v: 68 },
                { label: "表达 Expression", v: 75 },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span>{item.label}</span>
                    <span style={{ color: "#60a5fa" }}>{item.v}</span>
                  </div>
                  <Progress
                    percent={item.v}
                    showInfo={false}
                    strokeColor={{ from: "#6366f1", to: "#0ea5e9" }}
                    trailColor="#334155"
                  />
                </div>
              ))}
            </div>
          </Col>
          <Col xs={24} md={14}>
            <Row gutter={[16, 16]}>
              {features.map((f) => (
                <Col xs={24} sm={12} key={f.title}>
                  <div className="feature-card">
                    <div className="icon-wrap" style={{ background: f.color }}>
                      {f.icon}
                    </div>
                    <h4 style={{ fontSize: 18, marginBottom: 8 }}>{f.title}</h4>
                    <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>
                      {f.desc}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
}

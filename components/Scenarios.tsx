"use client";

import { Row, Col, Tabs } from "antd";
import { useState } from "react";

const scenes: Record<
  string,
  { label: string; items: { title: string; tag: string; bg: string }[] }
> = {
  daily: {
    label: "日常口语",
    items: [
      { title: "咖啡厅点单", tag: "初级 · 3 min", bg: "linear-gradient(135deg,#f59e0b,#ef4444)" },
      { title: "超市购物", tag: "初级 · 5 min", bg: "linear-gradient(135deg,#10b981,#0ea5e9)" },
      { title: "家庭聚会聊天", tag: "中级 · 8 min", bg: "linear-gradient(135deg,#8b5cf6,#ec4899)" },
    ],
  },
  work: {
    label: "职场商务",
    items: [
      { title: "英文面试", tag: "中级 · 10 min", bg: "linear-gradient(135deg,#0f172a,#334155)" },
      { title: "跨国会议发言", tag: "高级 · 15 min", bg: "linear-gradient(135deg,#1e40af,#0ea5e9)" },
      { title: "客户邮件沟通", tag: "中级 · 8 min", bg: "linear-gradient(135deg,#065f46,#10b981)" },
    ],
  },
  exam: {
    label: "考试备考",
    items: [
      { title: "雅思口语 Part 2", tag: "高级 · 10 min", bg: "linear-gradient(135deg,#dc2626,#f59e0b)" },
      { title: "托福独立口语", tag: "高级 · 12 min", bg: "linear-gradient(135deg,#7c3aed,#6366f1)" },
      { title: "四六级口试", tag: "中级 · 8 min", bg: "linear-gradient(135deg,#0369a1,#06b6d4)" },
    ],
  },
  travel: {
    label: "出行旅游",
    items: [
      { title: "机场出入境", tag: "初级 · 5 min", bg: "linear-gradient(135deg,#0e7490,#22d3ee)" },
      { title: "酒店 Check-in", tag: "初级 · 4 min", bg: "linear-gradient(135deg,#be123c,#f43f5e)" },
      { title: "问路与观光", tag: "中级 · 6 min", bg: "linear-gradient(135deg,#15803d,#84cc16)" },
    ],
  },
};

export default function Scenarios() {
  const [key, setKey] = useState("daily");
  const cur = scenes[key];

  return (
    <section className="section" id="scene">
      <div className="container">
        <div className="section-title">
          <h2>覆盖你人生的每一个开口瞬间</h2>
          <p>从早晨咖啡到跨国路演，总有一个场景贴近你</p>
        </div>
        <Tabs
          activeKey={key}
          onChange={setKey}
          centered
          size="large"
          items={Object.entries(scenes).map(([k, v]) => ({ key: k, label: v.label }))}
        />
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {cur.items.map((it) => (
            <Col xs={24} md={8} key={it.title}>
              <div className="scenario-card" style={{ background: it.bg }}>
                <span className="tag">{it.tag}</span>
                <h3 style={{ color: "#fff", fontSize: 22, marginBottom: 12 }}>
                  {it.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.7 }}>
                  真实对话样本 + AI 分角色扮演，让你反复打磨直到脱口而出。
                </p>
                <div
                  style={{
                    position: "absolute",
                    right: -30,
                    bottom: -30,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

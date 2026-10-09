"use client";

import { Row, Col, Card } from "antd";
import {
  FrownOutlined,
  QuestionCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const pains = [
  {
    icon: <FrownOutlined />,
    title: "开不了口",
    desc: "单词能背下来，一到真实场景就卡壳、怕说错。",
    color: "#f43f5e",
  },
  {
    icon: <QuestionCircleOutlined />,
    title: "练不对方法",
    desc: "跟读、背课文效率低，缺少反馈无法形成肌肉记忆。",
    color: "#f59e0b",
  },
  {
    icon: <ClockCircleOutlined />,
    title: "坚持不下来",
    desc: "没有计划、没有陪练、看不到进步，热情很快熄火。",
    color: "#6366f1",
  },
];

export default function PainPoints() {
  return (
    <section className="section" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div className="section-title">
          <h2>不是不够努力，而是练法不对</h2>
          <p>95% 的中国英语学习者，正卡在这三道坎前</p>
        </div>
        <Row gutter={[24, 24]}>
          {pains.map((p) => (
            <Col xs={24} md={8} key={p.title}>
              <Card bordered={false} style={{ height: "100%", borderRadius: 20 }}>
                <div
                  className="icon-wrap"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`,
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 26,
                    marginBottom: 16,
                  }}
                >
                  {p.icon}
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.7 }}>{p.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

"use client";

import { Row, Col } from "antd";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "选定场景", desc: "从 500+ 真实场景任选，匹配你的目标。" },
  { num: "02", title: "夯实词句", desc: "AI 精选关键词句，刻意练习达到脱口而出。" },
  { num: "03", title: "实战对话", desc: "与 AI Tutor 多轮对话，覆盖所有可能分支。" },
  { num: "04", title: "进度追踪", desc: "能力雷达动态更新，查看每日提升曲线。" },
];

export default function Steps() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>四步，让你真正开口</h2>
          <p>科学方法 + AI 陪练，形成完整学习闭环</p>
        </div>
        <Row gutter={[24, 24]}>
          {steps.map((s, i) => (
            <Col xs={24} sm={12} md={6} key={s.num}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: 28,
                  borderRadius: 20,
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  height: "100%",
                }}
              >
                <div className="step-badge">{s.num}</div>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

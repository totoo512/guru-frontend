"use client";

import { Button, Space, Tag } from "antd";
import {
  AppleFilled,
  AndroidFilled,
  PlayCircleFilled,
  AudioOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const stats = [
  { num: "10 min", label: "每日练习即可" },
  { num: "99%", label: "AI 高精度纠音" },
  { num: "4.9★", label: "App Store 评分" },
  { num: "1000W+", label: "累计学习用户" },
];

export default function Hero() {
  return (
    <section id="top" className="hero-gradient" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 48,
          alignItems: "center",
          minHeight: 560,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tag color="geekblue" style={{ padding: "4px 12px", borderRadius: 999 }}>
            🚀 全新上线 · AI 对话 2.0
          </Tag>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.15,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            你的
            <span className="gradient-text">场景化 AI</span>
            <br />
            英语口语教练
          </h1>
          <p style={{ fontSize: 18, color: "#475569", marginBottom: 32, lineHeight: 1.7 }}>
            帮中国人真正开口说英语。个性化场景 · 实时纠音 · 口语能力雷达，
            <br />
            每天 10 分钟，让你的英语像母语一样自然。
          </p>

          <Space size={12} wrap>
            <Button type="primary" size="large" icon={<AppleFilled />}>
              iOS 下载
            </Button>
            <Button size="large" icon={<AndroidFilled />}>
              Android 下载
            </Button>
            <Button size="large" type="text" icon={<PlayCircleFilled />}>
              观看演示
            </Button>
          </Space>

          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 16,
            }}
          >
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="phone-mock float-anim">
            <div className="notch" />
            <div className="screen" style={{ padding: 24, paddingTop: 60 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  marginBottom: 8,
                }}
              >
                场景 · 咖啡厅点单
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 10,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  fontSize: 13,
                }}
              >
                <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>
                  AI Tutor
                </div>
                Hi! What would you like to order today?
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg,#6366f1,#0ea5e9)",
                  color: "#fff",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 10,
                  fontSize: 13,
                }}
              >
                I'd like a <u>large</u> latte, please.
                <div
                  style={{
                    fontSize: 11,
                    marginTop: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    opacity: 0.9,
                  }}
                >
                  <CheckCircleFilled /> 发音准确度 96 分
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 14,
                  fontSize: 13,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>
                  AI Tutor
                </div>
                Great! Hot or iced?
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 28,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#0ea5e9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 28,
                  boxShadow: "0 10px 24px rgba(99,102,241,0.4)",
                }}
              >
                <AudioOutlined />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

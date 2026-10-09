"use client";

import { Collapse } from "antd";

const faqs = [
  {
    q: "零基础能用口语匠吗?",
    a: "可以。App 内会先做一次 CEFR 口语测评,然后基于你的实际水平动态调整内容难度。从单词、短句到长对话逐步递进,零基础用户也能找到匹配自己起点的练习路径。",
  },
  {
    q: "AI 的纠音和真人老师相比准确吗?",
    a: "我们的发音评测模型基于 100 万小时真人发音数据训练,音素级识别准确率超过 99%。相比真人老师,AI 可以 24 小时随叫随到,反馈即时且不带情绪,更适合高频密集练习。",
  },
  {
    q: "有没有防刷分、保证真实练习的机制?",
    a: "有。我们会检测语音时长、口型停顿、语调自然度等多维信号,机械跟读或背诵记录不会被计入有效练习时长,排行榜与证书也会同步校验。",
  },
  {
    q: "我的练习录音会被用于训练吗?隐私怎么保证?",
    a: "默认情况下语音仅用于当次评测,不进入训练集。你可以在设置里关闭匿名化改进计划。我们已通过 ISO 27001 与国内等保三级认证,严格遵循隐私合规要求。",
  },
  {
    q: "支持哪些设备和平台?",
    a: "iOS 13+、Android 8+、以及网页版 (Chrome / Safari / Edge)。多端数据实时同步,你可以在手机上练习、在电脑上查看能力雷达报告。",
  },
];

export default function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-title">
          <h2>常见问题</h2>
          <p>关于口语匠,你可能想了解的一切</p>
        </div>
        <Collapse
          accordion
          size="large"
          bordered={false}
          style={{ background: "transparent" }}
          items={faqs.map((f, i) => ({
            key: String(i),
            label: <span style={{ fontWeight: 600, fontSize: 16 }}>{f.q}</span>,
            children: (
              <p style={{ color: "#475569", lineHeight: 1.8, fontSize: 15 }}>{f.a}</p>
            ),
            style: {
              background: "#f8fafc",
              borderRadius: 14,
              marginBottom: 12,
              border: "1px solid #e2e8f0",
            },
          }))}
        />
      </div>
    </section>
  );
}

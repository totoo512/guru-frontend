"use client";

import { Carousel, Row, Col, Avatar } from "antd";
import { StarFilled } from "@ant-design/icons";

const reviews = [
  {
    name: "@Vivian",
    role: "外企产品经理",
    text: "跟 AI Tutor 对话完全没压力,被纠音了也不觉得尴尬。两个月之后,英文周会我真的敢开口了。",
  },
  {
    name: "@Leo",
    role: "雅思备考学生",
    text: "场景覆盖非常全,我专门练了 Part 2 的 10 个高频话题,从 5.5 冲到了 7。",
  },
  {
    name: "@Sophie",
    role: "大学教师",
    text: "作为老师最看中内容质量,句子表达都很地道,学生用了都说不像课本英语。",
  },
  {
    name: "@Mark",
    role: "出海创业者",
    text: "出差前临时练习机场、酒店场景非常好用,到现场基本就是复现 app 里的对话。",
  },
  {
    name: "@Nancy",
    role: "全职妈妈",
    text: "每天利用做家务的 15 分钟练习,一年后能辅导孩子做英语作业了。",
  },
  {
    name: "@Jerry",
    role: "初级工程师",
    text: "code review 时能用英语讨论问题了,外籍同事的反馈特别正向。",
  },
];

export default function Testimonials() {
  const groups: typeof reviews[] = [];
  for (let i = 0; i < reviews.length; i += 3) groups.push(reviews.slice(i, i + 3));

  return (
    <section className="section" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div className="section-title">
          <h2>千万用户正在用口语匠开口</h2>
          <p>来自 App Store 与社交媒体的真实反馈</p>
        </div>
        <Carousel autoplay dots>
          {groups.map((g, idx) => (
            <div key={idx}>
              <Row gutter={[24, 24]}>
                {g.map((r) => (
                  <Col xs={24} md={8} key={r.name}>
                    <div className="testimonial-card">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarFilled key={i} />
                        ))}
                      </div>
                      <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: 20 }}>
                        “{r.text}”
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar
                          style={{
                            background: "linear-gradient(135deg,#6366f1,#0ea5e9)",
                          }}
                        >
                          {r.name[1]}
                        </Avatar>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>{r.role}</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

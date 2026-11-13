import type { Metadata } from "next";
import NewsHeader from "@/components/news/NewsHeader";
import SiteFooter from "@/components/SiteFooter";
import { ASSETS, BASE } from "@/lib/paths";
import { siteUrl } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "公司介绍 - 火山创想 · 咕噜口语 SpeakGuru",
  description: "了解杭州火山创想科技有限公司与咕噜口语 SpeakGuru，探索 AI 技术如何让英语口语学习更自然、更有温度。",
  alternates: { canonical: siteUrl("/about") },
};

const values = [
  { number: "01", title: "让对话更自然", text: "围绕真实交流打磨 AI 对话体验，让练习从单向跟读走向有来有回的沟通，帮助学习者逐步建立开口的信心。" },
  { number: "02", title: "让学习更贴近生活", text: "把日常生活、职场沟通、旅行和考试面试融入口语练习，让学到的表达有机会在真实场景中用起来。" },
  { number: "03", title: "让进步有迹可循", text: "通过发音、语法与表达反馈，帮助学习者发现薄弱环节，让每一次练习都有方向，让持续开口成为习惯。" },
];

export default function AboutPage() {
  return (
    <div className="keraft">
      <NewsHeader />
      <main>
        <section className={styles.hero}>
          <div className={`wrap ${styles.heroGrid}`}>
            <div>
              <p className={styles.eyebrow}>关于火山创想 · ABOUT US</p>
              <h1>用 AI 的力量，<br />让每个人<span>自信开口</span></h1>
              <p className={styles.intro}>我们是火山创想，咕噜口语 SpeakGuru 背后的团队。我们持续探索人工智能与语言学习的结合，让英语口语练习更自然、更有温度。</p>
              <a className="btn btn-primary btn-lg" href={`${BASE}/#how`}>认识咕噜口语 →</a>
            </div>
            <div className={styles.brandCard}>
              <img src={`${ASSETS}guru-icon.png`} alt="咕噜口语品牌标志" width={88} height={88} />
              <strong>咕噜口语 <span>SpeakGuru</span></strong>
              <p>有温度的 AI 口语伙伴</p>
              <div className={styles.tags}><span>真实对话</span><span>场景练习</span><span>个性化反馈</span></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className={`wrap ${styles.story}`}>
            <div><p className={styles.eyebrow}>我们是谁</p><h2>专注 AI，<br />也专注每一次开口</h2></div>
            <div className={styles.prose}>
              <p>杭州火山创想科技有限公司专注于人工智能在语言学习场景中的应用，以咕噜口语（SpeakGuru）为核心产品，为学习者提供 AI 英语口语练习体验。</p>
              <p>咕噜口语由清华背景团队研发，从自然对话、沉浸式场景练习到发音纠正与表达优化，把 AI 技术融入日常学习，帮助用户从“知道怎么说”走向“真正说出来”。</p>
              <p>我们相信，语言学习的价值在于沟通。让学习者愿意开口、喜欢开口，并在持续练习中积累信心，是我们打磨产品的出发点。</p>
            </div>
          </div>
        </section>

        <section className="section section--soft">
          <div className="wrap">
            <div className="section-head"><p className={styles.eyebrow}>我们在做什么</p><h2>把技术变成触手可及的学习体验</h2></div>
            <div className={styles.values}>{values.map(value => <article className={styles.value} key={value.number}><span>{value.number}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className={styles.contact}>
              <div><p className={styles.eyebrow}>与我们同行</p><h2>让更多人，自信与世界对话</h2><p>无论是个人练习，还是企业与院校的团队学习，我们希望让每一次英语沟通都更从容。</p></div>
              <a className="btn btn-primary" href={`${BASE}/business`}>了解企业合作 →</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

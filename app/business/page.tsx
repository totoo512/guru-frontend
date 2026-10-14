"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import {
  CheckCircleFilled,
  CheckOutlined,
  DashboardOutlined,
  DownloadOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  MenuOutlined,
  MoonOutlined,
  RiseOutlined,
  SafetyCertificateOutlined,
  SunOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Collapse, ConfigProvider, Drawer, Popover, Segmented, theme as antdTheme } from "antd";
import AnimatedModal from "../../components/AnimatedModal";
import { ASSETS as A } from "../../lib/paths";
import styles from "./business.module.css";

const palettes = [
  ["guru", "云朵蓝粉", "linear-gradient(135deg,#8fc6ff,#b8b5ff 50%,#ffacd8)", "#89a9f8"],
  ["mint", "薄荷青紫", "linear-gradient(135deg,#88ded0,#a9d5ec 52%,#c8b5f7)", "#73cbbd"],
  ["violet", "雾霭丁香", "linear-gradient(135deg,#b9acf8,#d1baf2 50%,#edbadf)", "#a296eb"],
  ["sunset", "蜜桃奶杏", "linear-gradient(135deg,#ffd19f,#ffb9b8 52%,#f7a9c9)", "#eeae82"],
  ["aurora", "极光蓝粉", "linear-gradient(135deg,#5b7cff,#9b7bfb 50%,#ec4fd6)", "#5b7cff"],
  ["jade", "翡翠薄荷", "linear-gradient(135deg,#0a9a74,#0ebd8d 50%,#3dd4c4)", "#0ebd8d"],
  ["nebula", "星云紫", "linear-gradient(135deg,#7c5cff,#a66bff 50%,#ff6fb5)", "#7c5cff"],
  ["ember", "活力橙", "linear-gradient(135deg,#ff5e62,#ff7a45 50%,#ffb020)", "#ff7a45"],
] as const;

type Palette = (typeof palettes)[number][0];
type Mode = "light" | "dark";
type ContactType = "trial" | "consult" | null;
type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

const customers: Array<{ name: string; logo?: string }> = [
  { name: "宁德时代", logo: "https://cdn.oral-craft.com/web/_next/static/media/宁德时代.a547f16f.png" },
  { name: "三星", logo: "https://cdn.oral-craft.com/web/_next/static/media/三星.46d9df6f.jpeg" },
  { name: "惠普", logo: "https://cdn.oral-craft.com/web/_next/static/media/惠普.20a14e3a.jpeg" },
  { name: "海信集团", logo: "https://cdn.oral-craft.com/web/_next/static/media/海信集团.e65657c9.png" },
  { name: "中航工业", logo: "https://cdn.oral-craft.com/web/_next/static/media/中航工业.d80e0e13.png" },
  { name: "雪花啤酒", logo: "https://cdn.oral-craft.com/web/_next/static/media/雪花啤酒.54936a2c.gif" },
  { name: "喜临门", logo: "https://cdn.oral-craft.com/web/_next/static/media/喜临门.5d5fd739.jpeg" },
  { name: "苏美达", logo: "https://cdn.oral-craft.com/web/_next/static/media/苏美达.fa57ddf7.jpeg" },
  { name: "中铁装备", logo: "https://cdn.oral-craft.com/web/_next/static/media/中铁装备.068a16b9.png" },
  { name: "思源电气", logo: "https://cdn.oral-craft.com/web/_next/static/media/思源电气.5e7d0e1a.png" },
  { name: "天正电气", logo: "https://cdn.oral-craft.com/web/_next/static/media/天正电气.068d0a80.png" },
  { name: "网宿科技", logo: "https://cdn.oral-craft.com/web/_next/static/media/网宿科技.e6879ae3.png" },
  { name: "群创光电", logo: "https://cdn.oral-craft.com/web/_next/static/media/群创光电.d572cf78.jpeg" },
  { name: "景旺电子", logo: "https://cdn.oral-craft.com/web/_next/static/media/景旺电子.e1fbf082.jpg" },
  { name: "德国科世达", logo: "https://cdn.oral-craft.com/web/_next/static/media/德国科世达.b6d73487.jpeg" },
  { name: "明珞装备", logo: "https://cdn.oral-craft.com/web/_next/static/media/明珞装备.22586868.jpeg" },
  { name: "锦江航运", logo: "https://cdn.oral-craft.com/web/_next/static/media/锦江航运.d53b7719.png" },
  { name: "中圣集团", logo: "https://cdn.oral-craft.com/web/_next/static/media/中圣集团.347eda55.jpg" },
  { name: "三峰环境", logo: "https://cdn.oral-craft.com/web/_next/static/media/三峰环境.0566503b.jpg" },
  { name: "三峰卡万塔", logo: "https://cdn.oral-craft.com/web/_next/static/media/三峰卡万塔.d823f3aa.jpg" },
  { name: "鉴衡认证" },
  { name: "亨利式" },
  { name: "山东农业大学" },
  { name: "河北农业大学" },
  { name: "海南师范大学" },
];

const adminFeatures = [
  "支持自定义组织架构、自定义角色权限（超管、普通管理员、领导等）",
  "支持批量导入成员、批量分配席位",
  "支持分配课程任务、定制打卡规则、配置排行榜",
  "清晰的数据看板，可一键导出数据",
];

const learnerFeatures = [
  "账号数据与个人版 APP 同步",
  "随时查看学习排行榜",
  "学习数据自动回传企业后台",
  "接收任务、练习提醒",
];

const outcomes = [
  {
    title: "使用时长",
    description: "人均与团队练习时长可追踪，真实投入一目了然。",
    image: "business-outcome-1.png",
    icon: FieldTimeOutlined,
    stat: "练习投入",
  },
  {
    title: "打卡完成率",
    description: "任务下达后的完成进度实时更新，及时跟进异常情况。",
    image: "business-outcome-2.png",
    icon: CheckCircleFilled,
    stat: "执行过程",
  },
  {
    title: "能力变化趋势",
    description: "发音、流利度、词汇与表达画像随练习动态更新。",
    image: "business-outcome-3.png",
    icon: LineChartOutlined,
    stat: "学习效果",
  },
];

const faqs = [
  ["我们的行业比较小众，有没有对应的学习内容？", "有。咕噜口语按国民经济行业分类为各行业定制 AI 英语课程，覆盖数万种行业高频场景，也支持按岗位和业务目标配置专属内容。"],
  ["AI 反馈准吗？和真人外教相比怎样？", "AI 反馈即时、成本低、可高频开口，适合日常操练与任务型训练；复杂表达、深度纠偏与陪伴式教学，可与真人外教课互补使用。"],
  ["能否布置任务、定制打卡并查看学习统计？", "可以。企业管理后台支持组织与成员管理、课程任务、打卡规则、学习排行和数据报表，过程与结果均可量化、可汇报。"],
  ["员工能否互相看到学习排名？", "管理员可开启并配置学习排行榜，并选择是否同步到学员 APP，帮助团队形成持续学习的正向氛围。"],
  ["员工离职后，账号和席位怎么办？", "企业采购的是会员席位，权限与席位绑定而非绑定个人账号。管理员可随时回收席位并重新分配。"],
  ["怎么下单采购？能否开发票？", "支持开具增值税专用发票与普通发票。合同、对公付款和下单流程由企业顾问一对一协助。"],
];

export default function BusinessPage() {
  const [palette, setPalette] = useState<Palette>("aurora");
  const [mode, setMode] = useState<Mode>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contact, setContact] = useState<ContactType>(null);
  const [outcome, setOutcome] = useState(0);
  const current = palettes.find(([key]) => key === palette) ?? palettes[0];

  useEffect(() => {
    const root = document.documentElement;
    const savedPalette = root.dataset.theme as Palette;
    if (palettes.some(([key]) => key === savedPalette)) setPalette(savedPalette);
    setMode(root.dataset.mode === "dark" ? "dark" : "light");
  }, []);

  const changePalette = (next: Palette) => {
    setPalette(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("guru-theme", next);
  };

  const changeMode = (next: Mode, e?: MouseEvent) => {
    if (next === mode) return;
    const root = document.documentElement;
    const apply = () => {
      flushSync(() => setMode(next));
      root.dataset.mode = next;
      localStorage.setItem("guru-mode", next);
    };
    const doc = document as ViewTransitionDoc;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    const x = e?.clientX ?? window.innerWidth - 40;
    const y = e?.clientY ?? 34;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const closeMenu = () => setMenuOpen(false);

  const themePanel = (
    <div className="theme-pop">
      <p className="theme-pop-title">主题色</p>
      <div className="theme-swatches">
        {palettes.map(([key, name, gradient]) => (
          <button key={key} type="button" className={`theme-swatch ${palette === key ? "is-active" : ""}`} onClick={() => changePalette(key)}>
            <i style={{ background: gradient }}>{palette === key && <CheckOutlined />}</i>
            <span>{name}</span>
          </button>
        ))}
      </div>
      <p className="theme-pop-title">显示模式</p>
      <Segmented<Mode>
        block
        value={mode}
        onChange={(value) => changeMode(value)}
        options={[
          { value: "light", label: <span className="theme-seg"><SunOutlined />白天</span> },
          { value: "dark", label: <span className="theme-seg"><MoonOutlined />夜间</span> },
        ]}
      />
    </div>
  );

  return (
    <ConfigProvider theme={{ algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm, token: { colorPrimary: current[3], borderRadius: 12, fontFamily: '"MiSans Normal","PingFang SC",-apple-system,system-ui,sans-serif' } }}>
      <main className={styles.page}>
        <header className="site-header">
          <div className="wrap nav-inner">
            <Link className="logo" href="/">
              <img src={`${A}guru-icon.png`} alt="咕噜口语" />
              <span>咕噜口语</span><small className={styles.businessBadge}>企业版</small>
            </Link>
            <nav className={styles.desktopNav}>
              <a href="#top">首页</a>
              <a href="#platform">平台能力</a>
              <a href="#outcomes">学习效果</a>
              <a href="#service">服务流程</a>
              <a href="#faq">FAQ</a>
            </nav>
            <div className="nav-actions nav-actions--bar">
              <div className="theme-switch">
                <Popover content={themePanel} trigger="click" placement="bottomRight" arrow={false} rootClassName="theme-popover">
                  <button type="button" className="theme-btn" aria-label="切换主题色"><span className="theme-dot" /></button>
                </Popover>
                <button type="button" className={`theme-btn mode-btn ${mode === "dark" ? "is-dark" : ""}`} aria-label={mode === "dark" ? "切换到白天模式" : "切换到夜间模式"} onClick={(e) => changeMode(mode === "dark" ? "light" : "dark", e)}><SunOutlined className="mode-sun" /><MoonOutlined className="mode-moon" /></button>
              </div>
              <Link className="btn nav-biz" href="/">返回个人版</Link>
              <button className="btn btn-primary" onClick={() => setContact("trial")}>免费试用</button>
              <button className={styles.menuButton} aria-label="打开导航" onClick={() => setMenuOpen(true)}><MenuOutlined /></button>
            </div>
          </div>
        </header>

        <Drawer className={styles.mobileDrawer} title="咕噜口语企业版" placement="right" open={menuOpen} onClose={closeMenu}>
          <nav className={styles.mobileNav}>
            <a href="#top" onClick={closeMenu}>首页</a>
            <a href="#platform" onClick={closeMenu}>平台能力</a>
            <a href="#outcomes" onClick={closeMenu}>学习效果</a>
            <a href="#service" onClick={closeMenu}>服务流程</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <Link href="/">返回个人版</Link>
            <button onClick={() => { closeMenu(); setContact("trial"); }}>免费开通试用</button>
          </nav>
        </Drawer>

        <section className={styles.hero} id="top">
          <div className={styles.heroGlowA} />
          <div className={styles.heroGlowB} />
          <div className={styles.wrap}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}><SafetyCertificateOutlined /> 企业口语训练解决方案</span>
              <h1><span>咕噜口语</span>企业版</h1>
              <h2>让口语训练<br />可布置、可量化、可汇报</h2>
              <p>把真实业务场景、AI 口语练习与组织数据管理连接起来，让每一次开口都转化为团队能力。</p>
              <div className={styles.heroActions}>
                <button className={styles.primaryButton} onClick={() => setContact("trial")}>免费开通试用</button>
                <button className={styles.secondaryButton} onClick={() => setContact("consult")}>方案咨询 / 预约演示</button>
              </div>
              <div className={styles.heroProof}>
                <div><strong>1000+</strong><span>企业与院校信赖</span></div>
                <div><strong>30 席</strong><span>免费试用额度</span></div>
                <div><strong>全流程</strong><span>顾问陪伴落地</span></div>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.dashboardFrame}>
                <img src={`${A}business-hero.png`} alt="咕噜口语企业学习数据看板" />
              </div>
              <div className={`${styles.floatingMetric} ${styles.metricA}`}><DashboardOutlined /><span><b>92%</b>本月任务完成率</span></div>
              <div className={`${styles.floatingMetric} ${styles.metricB}`}><RiseOutlined /><span><b>+28%</b>团队开口时长</span></div>
            </div>
          </div>
        </section>

        <section className={styles.trust} aria-label="客户案例">
          <div className={styles.wrap}>
            <div className={styles.trustLead}>
              <h2>深受客户信赖</h2>
              <p>已服务 1000+ 企业与院校，陪伴不同行业的团队持续提升英语沟通能力。</p>
            </div>
            <div className={styles.logoWall}>
              {[customers.slice(0, 13), customers.slice(13)].map((row, rowIndex) => (
                <div className={styles.logoWallRow} key={rowIndex}>
                  <div className={`${styles.logoWallTrack} ${rowIndex === 1 ? styles.logoWallTrackReverse : ""}`}>
                    {[...row, ...row].map((customer, index) => (
                      <figure className={styles.logoChip} key={`${rowIndex}-${customer.name}-${index}`} aria-hidden={index >= row.length}>
                        <span className={styles.logoChipMedia}>
                          {customer.logo ? <img src={customer.logo} alt={customer.name} /> : <b>{customer.name}</b>}
                        </span>
                        <figcaption>{customer.name}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.platform} id="platform">
          <div className={styles.wrap}>
            <div className={styles.platformHead}>
              <h2>管理端与学员端一体</h2>
              <p>管理员布置任务、看数据；学员在熟悉的 APP 里练习，数据自动回传。</p>
            </div>

            <div className={styles.platformGrid}>
              <article className={styles.platformCard}>
                <div className={styles.platformCardHead}>
                  <h3>管理员后台</h3>
                  <span>Web</span>
                </div>
                <ul>
                  {adminFeatures.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className={styles.platformShot}>
                  <img src={`${A}business-admin.png`} alt="企业管理员后台" />
                </div>
              </article>

              <article className={styles.platformCard}>
                <div className={styles.platformCardHead}>
                  <h3>学员端</h3>
                  <span>APP</span>
                </div>
                <ul>
                  {learnerFeatures.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className={styles.platformShot}>
                  <img src={`${A}business-learner.png`} alt="企业学员端" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.outcomes} id="outcomes">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span>效果可视</span>
              <h2>每一分投入，都能形成清晰报告</h2>
              <p>不只统计登录次数，更关注有效练习、任务执行和真实能力变化。</p>
            </div>
            <div className={styles.outcomeLayout}>
              <div className={styles.outcomeTabs}>{outcomes.map((item, index) => {
                const Icon = item.icon;
                return <button className={outcome === index ? styles.outcomeActive : ""} key={item.title} onClick={() => setOutcome(index)}><Icon /><span><small>{item.stat}</small><b>{item.title}</b><em>{item.description}</em></span></button>;
              })}</div>
              <div className={styles.outcomeVisual} key={outcome}><img src={`${A}${outcomes[outcome].image}`} alt={outcomes[outcome].title} /></div>
            </div>
          </div>
        </section>

        <section className={styles.service} id="service">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span>陪伴式落地</span>
              <h2>从试用到复盘，企业顾问全程协助</h2>
              <p>以真实业务目标为起点，不做“一发账号就结束”的培训项目。</p>
            </div>
            <div className={styles.serviceGrid}>
              {[
                ["01", "需求诊断", "了解行业、岗位、人员规模与当前口语痛点，明确项目目标。"],
                ["02", "试用配置", "开通 30 个试用席位，配置组织、课程任务和打卡规则。"],
                ["03", "正式实施", "完成成员导入与启动宣导，顾问持续跟踪任务执行情况。"],
                ["04", "数据复盘", "输出团队练习与能力报告，针对薄弱环节优化下一阶段方案。"],
              ].map(([num, title, body]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className={styles.faq} id="faq">
          <div className={styles.wrap}>
            <div className={styles.faqLayout}>
              <div className={styles.faqLead}><span>常见问题</span><h2>采购前，你可能还想了解</h2><p>如果没有找到答案，企业顾问会根据你的团队情况提供一对一说明。</p><button className={styles.secondaryButton} onClick={() => setContact("consult")}>联系企业顾问</button></div>
              <Collapse className={styles.faqCollapse} accordion expandIconPosition="end" expandIcon={({ isActive }) => <span className={`${styles.faqIcon} ${isActive ? styles.faqIconActive : ""}`} aria-hidden="true" />} items={faqs.map(([label, answer], index) => ({ key: String(index), label, children: <p>{answer}</p> }))} />
            </div>
          </div>
        </section>

        <section className={`section center ${styles.finalCta}`} id="final-cta">
          <div className="wrap">
            <h2>一周内，看到第一份团队练习报告</h2>
            <p className="muted">可免费试用 30 个席位，无需复杂部署。</p>
            <div className="cta-row">
              <button className="btn btn-primary btn-lg" onClick={() => setContact("trial")}>免费开通试用</button>
              <button className="btn btn-lg" onClick={() => setContact("consult")}>预约方案演示</button>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.wrap}>
            <div className={styles.footerTop}><Link className={styles.logo} href="/"><img src={`${A}guru-icon.png`} alt="" /><span>咕噜口语<small>企业版</small></span></Link><p>让每个团队，都能自信开口连接世界。</p><div><a href="#platform">平台能力</a><a href="#outcomes">学习效果</a><a href="#faq">常见问题</a><Link href="/">个人版</Link></div></div>
            <div className={styles.footerMeta}><span>© 2026 北京火山创想科技有限公司</span><span>京ICP备2023009050号-4</span></div>
          </div>
        </footer>

        <AnimatedModal open={contact !== null} onClose={() => setContact(null)} className={styles.contactModal}>
          {contact && <div className={styles.modalBody}>
            <span className={styles.modalIcon}>{contact === "trial" ? <SafetyCertificateOutlined /> : <TeamOutlined />}</span>
            <h2>{contact === "trial" ? "免费开通企业试用" : "预约企业方案演示"}</h2>
            <p>{contact === "trial" ? "扫码联系企业顾问，免费开通 30 个试用席位。" : "扫码添加企业顾问，获取适合你团队的专属方案。"}</p>
            <img src={`${A}${contact === "trial" ? "business-trial.png" : "business-consult.png"}`} alt="联系企业顾问二维码" />
            <small>工作日 9:00–18:00，顾问将在 1 个工作日内联系你</small>
          </div>}
        </AnimatedModal>
      </main>
    </ConfigProvider>
  );
}

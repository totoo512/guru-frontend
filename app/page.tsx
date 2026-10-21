"use client";

import SiteFooter from "@/components/SiteFooter";

import { useEffect, useState } from "react";
import { Collapse, ConfigProvider, Space, theme as antdTheme } from "antd";
import SiteHeader from "@/components/SiteHeader";
import AppDownloadContent from "@/components/AppDownloadContent";
import { useSiteTheme } from "@/lib/useSiteTheme";
import AnimatedModal from "../components/AnimatedModal";
import { ASSETS as A, BASE } from "../lib/paths";

const awards = [
  { media: "award-certs.jpg", photo: true, issuer: "OPENAIGC 开发者大赛", title: "拯救姬 AI 创意赛第一名", desc: "第二届拯救者杯 OPENAIGC 开发者大赛，荣获拯救姬 AI 创意赛第一名", full: "award-certs.jpg" },
  { media: "award-suzhou-trophy.jpg", photo: true, issuer: "苏州全球科技创业大赛", title: "全球科技创业大赛奖", desc: "「赢在苏州 · 创赢未来」2024 全球科技创业大赛优胜奖", full: "award-suzhou-trophy.jpg" },
  { media: "award-haidian-trophy.jpg", photo: true, issuer: "海淀文化创意大赛", title: "海淀文创大赛二等奖", desc: "2024 海淀文化创意大赛 AI 海淀 & 文化强区赛道二等奖", full: "award-haidian-trophy.jpg" },
  { media: "award-certificate.jpg", photo: true, issuer: "AI 创新应用大赛", title: "AI 大赛多项荣誉", desc: "无锡国际人工智能创新应用大赛优胜奖、OPENAIGC 开发者大赛 AI 黑马奖", full: "award-certificate.jpg" },
  { media: "award-wuhu-certificate.jpg", photo: true, issuer: "长三角算力算法大赛", title: "算力算法大赛季军", desc: "2024 长三角（芜湖）算力算法创新应用大赛数据赛道季军", full: "award-wuhu-certificate.jpg" },
];

const heroStats = [
  { num: "10 min", label: "每日练习即可" },
  { num: "99%", label: "AI 高精度纠音" },
  { num: "4.9★", label: "App Store 评分" },
  { num: "1000W+", label: "累计学习用户" },
];

const steps = [
  {
    title: "选场景",
    image: "how-scene.png",
    short: "内容针对你的岗位与语境",
    heading: "选对场景，比多背一千个单词更重要",
    body: "不从「今日语法点」开始，而从你真实要开口的场合开始：项目汇报、客户对接、会议主持、面试应答……按行业与岗位组织内容，让每一句都指向「下次用得上」。",
    points: ["针对性强：情节、例句、词汇围绕同一沟通目标", "练完能用：练的是会话语境，不是教科书闲聊", "降低焦虑：先锁定场合，再进入学习"],
  },
  {
    title: "打基础",
    image: "how-foundation.png",
    short: "场景核心句与词，先吃透",
    heading: "先掌握关键表达，再进入实战",
    body: "围绕目标场景拆解核心词汇、地道表达和高频句型，通过听、读、说的短练习，让常用表达真正变成自己的语言。",
    points: ["重点突出：只学当前场景真正需要的表达", "记忆牢固：词句和语境绑定，不再孤立背诵", "随学随练：每个知识点都紧跟开口任务"],
  },
  {
    title: "实战对话",
    image: "how-practice.png",
    short: "目标导向通关 + 评分报告",
    heading: "像真实交流一样完成沟通目标",
    body: "AI 会根据你的回答继续追问，模拟真实对话的不确定性。完成沟通目标后即时生成评分和优化建议。",
    points: ["自由表达：不依赖固定台词", "即时反馈：发音、语法、表达同步分析", "反复挑战：同一场景可切换不同对话分支"],
  },
  {
    title: "进步追踪",
    image: "how-track.png",
    short: "专属能力画像，动态可见",
    heading: "每一次开口，都沉淀为看得见的进步",
    body: "基于 CEFR 标准持续更新你的口语能力画像，清晰呈现发音、流利度、词汇和表达等维度的变化。",
    points: ["能力可视：知道自己强在哪里、弱在哪里", "轨迹清晰：长期趋势不再凭感觉", "练习推荐：根据薄弱项自动调整内容"],
  },
];

const capabilities = [
  ["能力测评体系", "主动 CEFR 测评摸清起点，练习中自动追踪能力变化——解决「学完不知道有没有进步」。", "主动测评：按 CEFR 国际标准定位当前等级", "自动追踪：每次练习反哺画像，轨迹随表现更新", "cap-assess.png"],
  ["自由对话", "和 AI 外教展开自然的多轮交流，不背固定台词，真正练习临场表达。", "开放对话：根据你的回答实时追问", "随时开口：不受时间与地点限制", "cap-free-talk.png"],
  ["发音纠错", "从音素、重音和语调多维度识别发音问题，并给出清晰示范。", "即时纠错：说完马上知道问题在哪里", "标准示范：跟读对比，快速改善发音", "cap-pron.png"],
  ["语法润色", "在不打断表达的前提下发现语法问题，并给出更自然、更地道的说法。", "错误定位：清楚解释为什么不自然", "表达升级：同一意思学会更地道地说", "cap-grammar.png"],
  ["单词联想记忆", "把新词放回真实语境，通过联想、复现与开口运用形成长期记忆。", "语境记忆：不再孤立背单词", "主动复现：在后续对话中自然遇见", "cap-vocab.png"],
  ["连胜打卡", "把每天的小目标变成连续成长记录，用轻量正反馈帮助养成开口习惯。", "每日任务：5 分钟也能完成", "连续激励：让坚持更有成就感", "cap-streak.png"],
  ["学习排行榜", "和同伴比较有效练习时长与任务完成度，在良性竞争中持续进步。", "真实数据：只记录有效口语练习", "团队激励：个人与组织榜单同步展示", "cap-rank.png"],
];

const scenes = [
  ["scene-daily.png", "日常交流", "点餐 · 闲聊 · 电话"],
  ["scene-career.png", "职场商务", "开会 · 汇报 · 客户"],
  ["scene-exam.png", "考试面试", "求职 · 复试 · 留学"],
  ["scene-travel.png", "旅行出国", "机场 · 酒店 · 问路"],
];

type SceneIntent = { label: string; title: string; fear: string; ai: string; goals: string[]; sentences: string[]; vocab: string[] };
type SceneCategory = { name: string; intents: SceneIntent[] };

const sceneCategories: Record<string, SceneCategory> = {
  daily: { name: "日常交流", intents: [
    { label: "寒暄与闲聊", title: "寒暄闲聊", fear: "怕寒暄两句就没词", ai: "Hey! Long time no see. How have you been?", goals: ["回应寒暄", "抛一个话题", "自然收尾"], sentences: ["Pretty good, just busy with a new project.", "What about you? Anything exciting lately?"], vocab: ["lately", "pretty good", "catch up"] },
    { label: "打电话办小事", title: "生活电话", fear: "怕电话里反应慢", ai: "Hello, this is Riverside Clinic. How can I help?", goals: ["表明来意", "约定时间", "确认信息"], sentences: ["I'd like to make an appointment for Friday.", "Could you please repeat the address?"], vocab: ["appointment", "available", "confirm"] },
    { label: "表达观点与不同意", title: "表达观点", fear: "怕不同意时显得冲", ai: "I think remote work kills teamwork. What do you think?", goals: ["温和异议", "给出理由", "寻求共识"], sentences: ["I see your point, but I have a different view.", "Maybe a hybrid setup could work for both sides."], vocab: ["however", "on the other hand", "compromise"] },
    { label: "点餐与社交邀请", title: "点餐 / 邀请", fear: "怕邀请被拒后不会接", ai: "Are you free this weekend?", goals: ["发出邀请", "谈妥时间地点", "应对改期"], sentences: ["Want to grab coffee on Saturday afternoon?", "No worries if you're busy—maybe next week?"], vocab: ["grab", "available", "reschedule"] },
  ] },
  career: { name: "职场商务", intents: [
    { label: "主持 / 推进英文会议", title: "项目进展会议主持", fear: "怕控场时接不上、议程推进不下去", ai: "Thanks everyone for joining. Shall we start with the agenda?", goals: ["开场并确认议程", "推动讨论不跑题", "收口下一步与 owner"], sentences: ["Let's kick off with a quick agenda review.", "I'd like to bring us back to the main point."], vocab: ["agenda", "align", "takeaway", "owner"] },
    { label: "向领导汇报项目进展", title: "向上汇报项目进展", fear: "怕被英文追问进度与风险时卡壳", ai: "Come in. I see you have an update on the project.", goals: ["主动汇报进度", "说清完成度与结果", "提出风险与调整计划"], sentences: ["I'd like to give you a quick update on the campaign.", "We're at 70% completion; one risk is the vendor delay."], vocab: ["update", "progress", "risk", "timeline"] },
    { label: "客户异议与需求澄清", title: "客户异议处理", fear: "怕客户一追问就慌、说不清方案价值", ai: "I'm not sure this pricing works for us. Can you clarify?", goals: ["复述客户顾虑", "澄清需求边界", "给出可选方案"], sentences: ["I hear your concern about the budget.", "Would it help if we phased the rollout?"], vocab: ["concern", "clarify", "trade-off", "option"] },
    { label: "跨部门协调资源", title: "跨部门资源协调", fear: "怕协商时显得硬或说不明白诉求", ai: "Our team is at capacity this week. What do you need exactly?", goals: ["说明诉求与截止", "提出协作方式", "确认双方承诺"], sentences: ["We need two engineers by Friday to hit the launch.", "Can we share ownership on the integration piece?"], vocab: ["capacity", "priority", "handoff", "dependency"] },
  ] },
  exam: { name: "考试面试", intents: [
    { label: "自我介绍（1 分钟版）", title: "英文面试 · 自我介绍", fear: "怕超时、没重点、结尾收不住", ai: "Thanks for coming in. Could you briefly introduce yourself?", goals: ["30 秒背景", "突出匹配经验", "自然过渡到岗位兴趣"], sentences: ["I'm a product manager with 5 years in B2B SaaS.", "What draws me to this role is…"], vocab: ["background", "responsible for", "impact"] },
    { label: "项目经历深挖", title: "项目经历深挖", fear: "怕细节被追问后逻辑断层", ai: "Tell me about a project you're most proud of.", goals: ["情境-任务-行动-结果", "量化结果", "回应追问"], sentences: ["The challenge was low activation in week one.", "We improved retention by 18% in one quarter."], vocab: ["challenge", "metric", "trade-off"] },
    { label: "考研复试自我介绍", title: "考研复试自我介绍", fear: "怕背稿感重、被打断后乱", ai: "Please introduce yourself in English.", goals: ["学术背景", "研究兴趣", "为何报考"], sentences: ["My research interest lies in human-AI interaction.", "I hope to continue this work in your lab."], vocab: ["undergraduate", "thesis", "motivation"] },
    { label: "行为面试 STAR 应答", title: "行为面试 STAR", fear: "怕故事散、没有结果闭环", ai: "Describe a time you handled disagreement in a team.", goals: ["清晰 STAR", "体现协作", "总结可迁移经验"], sentences: ["I scheduled a short alignment meeting with data.", "We agreed on a shared success metric."], vocab: ["conflict", "align", "outcome"] },
  ] },
  travel: { name: "旅行出国", intents: [
    { label: "机场值机与安检", title: "机场值机与沟通", fear: "怕窗口一问就不会答", ai: "Good morning. May I see your passport and booking?", goals: ["递交证件", "确认行李", "询问登机口"], sentences: ["I'd like to check in for flight CA981.", "Is this bag within the weight limit?"], vocab: ["boarding pass", "baggage", "gate"] },
    { label: "酒店入住 / 问题处理", title: "酒店入住与问题", fear: "怕房间有问题说不利索", ai: "Welcome. Do you have a reservation with us?", goals: ["办理入住", "说明问题", "请求处理"], sentences: ["I have a reservation under Wang.", "The air conditioning isn't working. Could you help?"], vocab: ["reservation", "issue", "maintenance"] },
    { label: "问路与交通", title: "问路与交通", fear: "怕听不懂对方指示", ai: "Need any help? You look a bit lost.", goals: ["问方位", "确认重复", "道谢离开"], sentences: ["Excuse me, how do I get to the subway station?", "So I go straight and turn left at the lights?"], vocab: ["straight", "block", "transfer"] },
    { label: "餐厅点餐与过敏说明", title: "餐厅点餐", fear: "怕过敏/忌口说不清", ai: "Are you ready to order?", goals: ["点餐", "说明忌口", "确认做法"], sentences: ["I'd like the grilled salmon, please.", "I'm allergic to peanuts. Is this dish safe?"], vocab: ["allergic", "spicy", "bill"] },
  ] },
};

const sceneKeys = ["daily", "career", "exam", "travel"];
const sceneAvatars = ["Lora", "Ace", "Anna", "Lucas", "Emily", "Olivia", "Daniel", "Ella", "Henry", "Ethan", "Grace"].map((n) => `https://cdn.oral-craft.com/ai_virtual_human/${n}/avatar.png`);

const reviews = [
  ["练口语好软件", "8月1日 · 倔强走下去", "是款练口语的好软件，还可以评测你的水平。"],
  ["咕噜口语太棒了", "8月1日 · l554。", "特别棒的软件，作为初学者来说提供了很棒的平台，有各种场景可挑选！"],
  ["优质app", "8月1日 · zzze0913", "我认为这个ai app比其他的更加有针对性，他会告诉你的表达是否地道，发音是否标准"],
  ["好用", "8月1日 · tan77000", "找了很久外贸相关口语，终于在这个app找到了！"],
  ["很好用", "7月31日 · sdpdd12398", "今天玩了一下午，会给测评报告 方便改进"],
  ["ai练口语特别适合雅思备考人", "7月31日 · 松井秋葉", "不仅能修改回答还能纠正发音，会继续使用几天看看效果。"],
  ["咕噜口语好实用", "7月29日 · 大花小花见哈哈", "有AI场景练习，还可以矫正口语不正。"],
  ["练习口语很不错", "7月29日 · 邹满芳Rose Zo", "终于找到一款适合自己的英语口语软件，推荐。"],
];

const faqs = [
  ["没有英语基础能用吗？", "可以。入门难度更友好，支持提示、示范与中文辅助，循序渐进开口，不必一上来硬刚自由对话。"],
  ["AI 反馈准吗？和真人外教比怎样？", "AI 反馈即时、成本低、可高频开口，适合日常操练；复杂表达与深度纠偏，可与真人外教互补。"],
  ["会不会刷分却还是不会真说？", "咕噜口语的练习以任务型对话和真实情景为主，一切围绕开口练习设计，只有完成沟通目标才通关。"],
  ["麦克风和隐私安全吗？支持哪些设备？", "录音仅用于练习与反馈，可在设置中管理权限与数据。支持 iOS、Android。"],
  ["企业 / 学校如何开通？", "企业版支持席位管理、任务布置与学习数据看板，可通过企业版入口联系我们。"],
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [cap, setCap] = useState(0);
  const [faq, setFaq] = useState(0);
  const [modal, setModal] = useState<"download" | "award" | "scene" | null>(null);
  const [award, setAward] = useState(0);
  const [scene, setScene] = useState(0);
  const [intent, setIntent] = useState(0);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const clock = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  const [avatar, setAvatar] = useState(0);
  useEffect(() => {
    if (modal !== "scene") return;
    setAvatar(Math.floor(Math.random() * sceneAvatars.length));
  }, [modal, scene, intent]);
  const sceneCat = sceneCategories[sceneKeys[scene]];
  const sceneIt = sceneCat.intents[intent];
  const siteTheme = useSiteTheme();
  const { mode, current } = siteTheme;


  return (
    <ConfigProvider theme={{ algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm, token: { colorPrimary: current.brand, borderRadius: 12, fontFamily: '"MiSans Normal","PingFang SC",-apple-system,system-ui,sans-serif' } }}>
    <main className="keraft">
      <SiteHeader home theme={siteTheme} onDownload={() => setModal("download")} />

      <section className="hero" id="top"><div className="wrap grid grid-2 hero-grid">
        <div className="hero-copy"><p className="hero-brand">咕噜口语</p><h1 className="hero-title">你的 <span className="hero-title-accent">场景化 AI</span> 英语口语教练</h1><p className="hero-sub">帮中国人真正开口说英语。个性化场景 · 实时纠音 · 口语能力雷达，每天 10 分钟，让你的英语像母语一样自然。</p><Space className="hero-actions" size={10} wrap><button className="btn btn-primary btn-lg hero-download-cta" onClick={()=>setModal("download")}>免费下载APP开始体验</button></Space><div className="hero-stats">{heroStats.map((item)=><div className="hero-stat" key={item.label}><strong>{item.num}</strong><span>{item.label}</span></div>)}</div></div>
        <div className="hero-visual"><div className="hero-cover-wrap"><img className="hero-cover" src={`${A}cover.png`} alt="咕噜口语 APP 产品展示"/><span className="guru-bubble guru-bubble--a">实时自然对话</span><span className="guru-bubble guru-bubble--b">AI 发音纠正</span><span className="guru-bubble guru-bubble--c">随时随地开口</span></div></div>
      </div></section>

      <section className="section" id="honors"><span className="honors-blob honors-blob--brand"/><span className="honors-blob honors-blob--warm"/><div className="wrap">
        <div className="honors-lead"><div className="honors-heading"><h2 style={{marginBottom: 0}}>荣获行业权威机构颁奖</h2></div><p className="muted">咕噜口语通过提供优质的产品和服务，收获了大量用户的广泛好评，亦得到了行业权威机构的高度认可</p></div>
        <div className="awards-row">{awards.map((x,i)=><button className="award-card" key={x.title} onClick={()=>{setAward(i);setModal("award")}}><span className={`award-media ${x.photo?"award-media--photo":""}`}><img src={`${A}${x.media}`} alt={x.title} /></span><span className="award-meta"><span className="award-issuer"><i className="award-issuer-dot"/>{x.issuer}</span><strong>{x.title}</strong><span className="award-title">{x.desc}</span><span className="award-cta">查看完整证书 →</span></span></button>)}</div>
      </div></section>

      <section className="section" id="pain"><div className="wrap"><div className="section-head"><h2>为什么学了十多年，却还是哑巴英语？</h2><p className="muted">不是不够努力，而是练法不对：关键场合开不了口、通用课用不上、练了也不知道有没有进步。</p></div><div className="pain-grid">
        {[["pain-meeting.png","痛点 01 · 场景失语","读写尚可，关键场合不敢说","邮件、文档还能应付；一到英文会议、客户对接、现场汇报，脑子里有词却组织不起来，怕说错、怕被追问，只好沉默或切回中文。"],["pain-generic.png","痛点 02 · 练法错位","通用课学了用不上，跟读多、对话少","市面课程多为通用内容，缺少行业/岗位定制，学完对不上你的会话语境。再加上听力跟读占大头，真正对话很少——单词刷得熟，一到真人对话就卡壳。"],["pain-measure.png","痛点 03 · 效果模糊","进步难量化，越学越容易迷失","练了很多，却说不清自己强在哪、弱在哪；没有清晰能力画像和变化轨迹，坚持靠感觉，方向感越来越差。"]].map(x=><article className="pain-card" key={x[1]}><div className="pain-media"><img src={`${A}${x[0]}`} alt={x[2]} /></div><div className="pain-body"><h4>{x[2]}</h4><p>{x[3]}</p></div></article>)}
      </div></div></section>

      <section className="section section--soft" id="how"><div className="wrap"><div className="section-head"><h2>咕噜是如何帮你开口的</h2><p className="muted">从你会用到的场景出发，把学习内容、对话练习和个性化反馈串成一条线，以口语输出为核心，过程中自然而然全方位锻炼听说读写</p></div><div className="how-flow"><div className="how-step-nav">{steps.map((s,i)=><button key={s.title} className={`step ${step===i?"is-active":""}`} onClick={()=>setStep(i)}><span className="step-num">{i+1}</span><h4>{s.title}</h4><p>{s.short}</p></button>)}</div><div className="box how-panel grid grid-2 panel-fade" key={step}><div><h3>{steps[step].heading}</h3><p>{steps[step].body}</p><ul>{steps[step].points.map(p=><li key={p}>{p}</li>)}</ul></div><div className="shot shot--wide"><img src={`${A}${steps[step].image}`} alt={steps[step].title} /></div></div></div></div></section>

      <section className="section" id="capabilities"><div className="wrap"><div className="section-head"><h2>咕噜口语的核心能力</h2><p className="muted">咕噜作为 AI 英语学习的开创者、领导者，通过下列核心功能帮你克服哑巴英语。</p></div><div className="tabs">{capabilities.map((c,i)=><button key={c[0]} className={`tab ${cap===i?"is-active":""}`} onClick={()=>setCap(i)}>{c[0]}</button>)}</div><div className="box grid grid-2 capability-panel panel-fade" key={cap}><div><h3>{capabilities[cap][0]}</h3><p>{capabilities[cap][1]}</p><ul><li>{capabilities[cap][2]}</li><li>{capabilities[cap][3]}</li></ul></div><div className="shot shot--wide"><img src={`${A}${capabilities[cap][4]}`} alt={capabilities[cap][0]} /></div></div></div></section>

      <section className="section section--soft" id="scenes"><div className="wrap"><div className="section-head"><h2>核心场景全覆盖，即学即用</h2><p className="muted">咕噜口语依托海量大数据与真实职场语料库，精心研发数万节 AI 情景课程，全面覆盖生活、工作的实际语言需求。</p></div><div className="scene-gallery">{scenes.map((s,i)=><button className="scene-card" key={s[1]} onClick={()=>{setScene(i);setIntent(0);setModal("scene")}}><img src={`${A}${s[0]}`} alt={`${s[1]}场景`} /><span className="scene-card-hover"><b className="scene-card-cta">内容预览</b></span><span className="scene-card-cap"><strong>{s[1]}</strong><em>{s[2]}</em></span></button>)}</div></div></section>

      <section className="section" id="biz-teaser"><div className="wrap"><div className="box grid grid-2 biz-box"><div><h2>给团队的口语训练管理系统</h2><p>把「练口语」变成可布置、可追踪、可汇报的组织能力。帮企业省心省力解决英语口语难题。</p><ul><li>组织与席位管理，离职可回收再分配</li><li>任务下发、打卡规则与完成率追踪</li><li>学习数据看板，效果清晰可汇报</li></ul><a className="btn btn-primary" href={`${BASE}/business`}>了解企业版 →</a></div><a className="shot shot--wide" href={`${BASE}/business`}><img src={`${A}business-hero.png`} alt="企业管理后台数据概览" /></a></div></div></section>

      <section className="section section--soft reviews"><div className="wrap"><div className="section-head"><h2>用户真实评价</h2><p className="muted">来自上千万用户的 App Store 真实反馈。</p></div></div><div className="review-walls">{[reviews,reviews.slice().reverse()].map((row,j)=><div className={`review-wall review-wall--${j?"b":"a"}`} key={j}><div className="review-wall-track">{[...row,...row].map((r,i)=><article className="review-card" key={`${j}-${i}`}><strong>{r[0]}</strong><span className="review-stars">★★★★★</span><span className="review-meta">{r[1]}</span><p>{r[2]}</p></article>)}</div></div>)}</div></section>

      <section className="section" id="faq"><div className="wrap grid grid-2 faq-layout"><div><h2>常见问题</h2><Collapse className="faq-collapse" accordion activeKey={faq < 0 ? [] : [String(faq)]} onChange={(key)=>setFaq(key.length ? Number(key[0]) : -1)} expandIconPosition="end" expandIcon={({isActive})=><span className={`acc-icon ${isActive?"is-active":""}`} aria-hidden="true"/>} items={faqs.map((f,i)=>({key:String(i),label:f[0],children:<p>{f[1]}</p>}))}/></div><aside className="box faq-side"><p className="hero-brand faq-side-brand">咕噜口语</p><h3>现在开始，今天就能开口</h3><p className="muted">免费体验场景化 AI 英语口语练习。</p><button className="btn btn-primary" onClick={()=>setModal("download")}>免费下载 APP</button><div className="divider"/><p className="small">教育机构、学校或企业团队？</p><a className="btn btn-sm" href={`${BASE}/business`}>咨询企业版</a></aside></div></section>

      <section className="section center" id="final-cta"><div className="wrap"><h2>自信开口，即刻开始</h2><p className="muted">仅需5分钟，在咕噜口语完成你的第一段AI英语对话。</p><div className="cta-row"><button className="btn btn-primary btn-lg" onClick={()=>setModal("download")}>免费下载APP</button><a className="btn btn-lg" href={`${BASE}/business`}>了解企业版</a></div></div></section>

      <SiteFooter home />

      <AnimatedModal open={modal !== null} onClose={() => setModal(null)} className={modal === "download" ? "modal--download" : modal === "award" ? "modal--award" : modal === "scene" ? "modal--scene" : ""}>
        {modal === "download" && <AppDownloadContent />}
        {modal === "award" && <><div className="modal-title"><h3>{awards[award].title}</h3><p>{awards[award].issuer} · {awards[award].desc}</p></div><div className="award-full"><img src={`${A}${awards[award].full}`} alt={awards[award].title}/></div></>}
        {modal === "scene" && <div className="scene-modal"><div className="scene-modal-nav"><h3>{sceneCat.name}</h3><span className="scene-modal-label">选择具体场合</span><div className="scene-modal-intents">{sceneCat.intents.map((x, i) => <button key={x.label} className={i === intent ? "is-active" : ""} onClick={() => setIntent(i)}>{x.label}</button>)}</div><button className="btn btn-primary scene-modal-cta" onClick={() => setModal("download")}>下载 APP 练这个场景</button></div><div className="scene-modal-preview"><div className="phone-device--scene"><div className="phone-screen"><div className="phone-app"><div className="iphone-status"><span className="iphone-time">{clock}</span><span className="iphone-island"/><span className="iphone-icons"><svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true"><rect x="0" y="7" width="3" height="4" rx="0.8"/><rect x="4.5" y="5" width="3" height="6" rx="0.8"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.8"/><rect x="13.5" y="0" width="3" height="11" rx="0.8"/></svg><svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M1.5 4a10 10 0 0 1 13 0"/><path d="M4 6.8a 6.5 6.5 0 0 1 8 0"/><path d="M6.6 9.4a3 3 0 0 1 2.8 0"/></svg><svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor"/><path d="M23 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity=".4"/></svg></span></div><div className="phone-app-body panel-fade" key={scene * 10 + intent}><div className="phone-lesson-head"><strong>{sceneIt.title}</strong><span>{sceneIt.fear}</span></div><div className="phone-bubble"><span className="phone-bubble-label">对方开场</span><div className="phone-bubble-row"><img className="phone-avatar" src={sceneAvatars[avatar]} alt="AI 外教"/><p>{sceneIt.ai}</p></div></div><div className="phone-card"><span className="phone-card-title">对话目标</span><ol className="phone-goals">{sceneIt.goals.map((g, i) => <li key={g}><span className="goal-num">{i + 1}</span>{g}</li>)}</ol></div><div className="phone-card"><span className="phone-card-title">核心例句</span><div className="phone-sents">{sceneIt.sentences.map((s) => <span key={s}>{s}</span>)}</div></div><div className="phone-card"><span className="phone-card-title">关键词汇</span><div className="phone-vocab">{sceneIt.vocab.map((v) => <span key={v}>{v}</span>)}</div></div></div><div className="phone-home"/></div></div></div></div></div>}
      </AnimatedModal>
    </main>
    </ConfigProvider>
  );
}

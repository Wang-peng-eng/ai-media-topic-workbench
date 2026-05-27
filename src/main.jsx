import React from "react";
import { createRoot } from "react-dom/client";
import {
  Archive,
  BookmarkPlus,
  BrainCircuit,
  Clock,
  FileText,
  Hash,
  Layers3,
  ListFilter,
  MessageSquareText,
  PenLine,
  Send,
  Sparkles,
  Trash2,
  Workflow
} from "lucide-react";
import "./styles.css";

const STORAGE_KEY = "ai-media-workbench-v4";

const industries = {
  aiLearning: {
    label: "AI学习",
    tone: "像普通人的学习记录，少讲趋势，多讲怎么开始、怎么坚持、怎么用在工作里。",
    keywords: ["AI学习", "普通人学AI", "效率工具", "成长焦虑"],
    emotions: ["怕被时代甩下", "收藏很多但没开始", "工具太多不知道学哪个"],
    desires: ["想有一个小白路线", "想把AI用到工作里", "想证明自己还能跟上"],
    pains: ["信息过载", "没有反馈", "学完不知道怎么变成作品"],
    angles: ["小白第一步", "7天学习实验", "工具避坑", "真实工作场景", "反焦虑行动"],
    titleHooks: ["我劝你先别急着买课", "不是你笨，是顺序错了", "普通人这样学反而更稳"],
    coverStyle: "深色文字卡，短句直接，像一条真实提醒"
  },
  ecommerce: {
    label: "电商",
    tone: "像运营复盘，关注转化、卖点、人群和活动节奏，不说空泛增长。",
    keywords: ["电商运营", "转化率", "卖点", "直播间", "复购"],
    emotions: ["有流量但不出单", "活动做了却没效果", "不知道用户为什么不买"],
    desires: ["想提高转化", "想找准卖点", "想知道同行为什么卖得动"],
    pains: ["卖点太散", "人群不清", "只会降价不会表达价值"],
    angles: ["卖点重写", "详情页痛点", "活动复盘", "用户不买原因", "复购理由"],
    titleHooks: ["这类店最容易白花钱", "别再只会降价了", "用户不买，可能不是价格问题"],
    coverStyle: "商品图加数据/痛点短句，别做成招商海报"
  },
  restaurant: {
    label: "餐饮",
    tone: "真实烟火气，强调到店理由、菜品记忆点、性价比和本地场景。",
    keywords: ["餐饮运营", "探店", "本地餐厅", "到店转化", "菜单设计"],
    emotions: ["想吃但怕踩雷", "不知道周末去哪吃", "怕排队不值"],
    desires: ["想找到靠谱店", "想知道招牌菜", "想要省心的聚餐选择"],
    pains: ["菜品没记忆点", "图片好看但体验不稳", "不知道适合什么场景"],
    angles: ["招牌菜记忆点", "人均预算", "约会/聚餐场景", "本地人推荐", "避雷清单"],
    titleHooks: ["这家我会为了它再去一次", "别只拍环境了", "人均不贵，但记忆点很强"],
    coverStyle: "真实菜品大图，少滤镜，短句突出到店理由"
  },
  pet: {
    label: "宠物",
    tone: "像养宠人的经验分享，温暖但具体，强调新手避坑和日常护理。",
    keywords: ["新手养宠", "猫狗健康", "宠物用品", "养宠避坑"],
    emotions: ["怕自己养不好", "宠物一异常就紧张", "买了一堆没用的东西"],
    desires: ["想让宠物更舒服", "想少踩坑", "想知道什么东西真的有用"],
    pains: ["经验碎片化", "用品选择困难", "分不清正常现象和问题"],
    angles: ["新手避坑", "用品清单", "行为解读", "护理流程", "省钱养宠"],
    titleHooks: ["新手真的别乱买", "养了以后才知道", "这个小细节很多人忽略了"],
    coverStyle: "真实宠物照片，加一句像朋友提醒的话"
  },
  beauty: {
    label: "美妆",
    tone: "像真实试用笔记，强调肤质、场景、预算和效果，不硬夸产品。",
    keywords: ["美妆", "护肤", "妆容", "肤质", "平价替代"],
    emotions: ["怕踩雷", "不知道适不适合自己", "想变好看但预算有限"],
    desires: ["想找到适合自己的", "想少花冤枉钱", "想快速提升状态"],
    pains: ["肤质不匹配", "跟风买错", "只看种草不看使用场景"],
    angles: ["肤质匹配", "通勤妆", "平价替代", "成分避坑", "空瓶复盘"],
    titleHooks: ["别再跟风买了", "这个真的挑肤质", "预算不高也能把状态拉起来"],
    coverStyle: "干净产品/妆面图，强调肤质和场景"
  },
  localLife: {
    label: "本地生活",
    tone: "像本地人实用推荐，强调位置、价格、场景和省心程度。",
    keywords: ["本地生活", "周末去哪", "同城推荐", "亲子", "探店"],
    emotions: ["周末不知道去哪", "怕花钱踩雷", "想找离自己近的选择"],
    desires: ["想要省心攻略", "想知道值不值", "想收藏下次直接用"],
    pains: ["信息分散", "图片好看但不实用", "价格和位置不透明"],
    angles: ["周末路线", "同城避雷", "亲子/约会场景", "人均预算", "交通便利度"],
    titleHooks: ["本地人真的会去吗", "别再只收藏不去了", "这个地方适合这样玩"],
    coverStyle: "地点实拍加价格/距离/场景短句"
  }
};

const platformProfiles = {
  小红书: {
    rhythm: "晚上 8:00 - 10:00",
    format: "图文笔记、清单、真实经历",
    titleRule: "像个人经验，不要像广告；标题可以有一点情绪，但要可信。",
    tagPrefix: "#"
  },
  抖音: {
    rhythm: "中午 12:00 - 13:30 / 晚上 7:30 - 9:30",
    format: "口播、录屏、对比式短视频",
    titleRule: "前 3 秒要有冲突，句子短，像真人开口说话。",
    tagPrefix: "#"
  },
  公众号: {
    rhythm: "早上 7:30 - 9:00 / 晚上 9:00 - 10:30",
    format: "长文、方法论、案例复盘",
    titleRule: "信息完整，少情绪化，适合展开分析。",
    tagPrefix: ""
  }
};

const promptModules = [
  {
    id: "hotspot",
    name: "热点分析 Prompt",
    icon: Hash,
    template: "判断热点和当前行业/产品是否有关，提炼可追角度、情绪入口和不适合硬蹭的风险。"
  },
  {
    id: "emotion",
    name: "用户情绪 Prompt",
    icon: BrainCircuit,
    template: "分析用户为什么会点、焦虑点、欲望、痛点，以及评论区可能出现的话题。"
  },
  {
    id: "titles",
    name: "标题生成 Prompt",
    icon: PenLine,
    template: "生成像真实小红书/抖音内容的标题：人话、有情绪钩子、不营销号、不AI味。"
  },
  {
    id: "structure",
    name: "内容结构 Prompt",
    icon: FileText,
    template: "输出开头钩子、正文结构、情绪推进、产品连接点和结尾互动。"
  },
  {
    id: "publish",
    name: "发布建议 Prompt",
    icon: Send,
    template: "输出发布时间、标签、封面风格、配图建议和发布前检查项。"
  }
];

const initialBrief = {
  industry: "aiLearning",
  product: "AI入门训练营",
  platform: "小红书",
  audience: "焦虑但想学习AI的普通人",
  direction: "帮助普通人从零开始建立AI学习习惯",
  hotTopic: "越来越多人不想上班",
  viralText: "为什么很多人学AI三天就放弃？不是懒，是一开始就学错了。"
};

function getContext(brief) {
  return {
    industry: industries[brief.industry] || industries.aiLearning,
    platform: platformProfiles[brief.platform] || platformProfiles.小红书
  };
}

function buildPrompt(module, brief) {
  const { industry, platform } = getContext(brief);
  return [
    module.template,
    "",
    `行业：${industry.label}`,
    `行业语气：${industry.tone}`,
    `平台：${brief.platform}`,
    `平台形式：${platform.format}`,
    `标题规则：${platform.titleRule}`,
    `产品：${brief.product || "未填写"}`,
    `目标用户：${brief.audience || "未填写"}`,
    `推广方向：${brief.direction || "未填写"}`,
    `热点：${brief.hotTopic || "无"}`,
    `爆款参考：${brief.viralText || "无"}`
  ].join("\n");
}

function analyzeViralText(text, industry) {
  const clean = text.trim();
  if (!clean) {
    return {
      hook: "未输入爆款内容",
      structure: ["粘贴标题或文案后，会拆解它的情绪钩子和结构。"],
      pain: "暂无",
      reusableAngles: industry.angles.slice(0, 4)
    };
  }

  const hasQuestion = /为什么|怎么|如何|吗|？|\?/.test(clean);
  const hasNeg = /不是|别|不要|避坑|踩雷|错|坑|焦虑|失控|放弃/.test(clean);
  const hasNumber = /\d|一|二|三|四|五|六|七|十/.test(clean);

  return {
    hook: hasNeg
      ? "先戳中一个用户不愿承认的问题，再给出新的解释。"
      : hasQuestion
        ? "用一个具体问题制造好奇，让用户想确认自己是不是也这样。"
        : "用真实经验感降低防备，让用户觉得这是同类人的提醒。",
    structure: [
      hasQuestion ? "问题开场：先抛出用户脑子里已有的疑问" : "经历开场：先说一个具体场景",
      hasNeg ? "反常识解释：把问题从表面原因改成深层原因" : "痛点放大：说明为什么这件事会反复发生",
      hasNumber ? "清单推进：用步骤/数量降低阅读压力" : "方法承接：给一个可执行的小动作",
      "互动收口：让用户在评论区说出自己的情况"
    ],
    pain: industry.pains.find((pain) => clean.includes(pain.slice(0, 2))) || industry.pains[0],
    reusableAngles: industry.angles.map((angle) => `${angle}：套用「先共鸣，再解释，再给动作」`)
  };
}

function generateWorkflow(brief, selectedTopic = null) {
  const { industry, platform } = getContext(brief);
  const viral = analyzeViralText(brief.viralText || "", industry);
  const emotion = {
    clickReason: [
      `它说中了「${industry.emotions[0]}」这种隐性压力`,
      `用户能立刻判断这和自己有关：${brief.audience || "目标用户"}`,
      "内容承诺的是一个小答案，不是宏大的大道理"
    ],
    anxiety: industry.emotions,
    desire: industry.desires,
    pain: [
      ...industry.pains,
      brief.product ? `不知道「${brief.product}」到底能不能解决自己的问题` : "不知道产品和自己有什么关系"
    ],
    comments: [
      "我就是这样，怎么开始？",
      "有没有具体步骤？",
      "这个适合新手吗？",
      `如果是${industry.label}小白，该先做什么？`
    ]
  };

  const hotspot = {
    trendFit: brief.hotTopic
      ? `可以追，但要把「${brief.hotTopic}」翻译成用户自己的处境。`
      : "没有热点时，优先从行业长期痛点里找稳定选题。",
    angles: industry.angles.slice(0, 5).map((angle) => `${brief.hotTopic || industry.label} × ${angle}`),
    risk: "不要把热点当开头硬塞，必须能自然接到用户痛点和产品使用场景。"
  };

  const topics = makeTopics(brief, industry);
  const topic = selectedTopic || topics[0];
  const titles = generateTitles(topic, industry, brief.platform);
  const structure = generateStructure(topic, brief, industry);
  const publish = {
    time: platform.rhythm,
    tags: industry.keywords.map((word) => `${platform.tagPrefix}${word}`),
    cover: `${industry.coverStyle}。${platform.titleRule}`,
    image: createImageSuggestion(industry.label),
    checklist: ["标题像不像真人说话", "封面是否一眼看懂痛点", "开头是否能在 3 秒内建立关系", "产品出现是否自然", "结尾是否能引出评论"]
  };
  const contentResult = generateContentResult(topic, brief, industry, titles, structure, publish);
  const metrics = generateContentMetrics(topic, brief, industry, viral);
  const actionPlan = generateActionPlan(topic, brief, industry, platform, publish, metrics);
  const risks = generateRiskJudgement(topic, brief, industry, titles, structure, metrics);
  const completion = generateCompletion(topic, titles, structure, publish, metrics);
  const aiAdvice = generateAiAdvice(topic, brief, industry, metrics);

  return { hotspot, emotion, viral, topics, titles, structure, publish, contentResult, metrics, actionPlan, risks, completion, aiAdvice };
}

function makeTopics(brief, industry) {
  const base = [
    `我劝${brief.audience || "新手"}，先别急着做${industry.label}`,
    `${industry.label}最容易让人放弃的，不是难，是这一步`,
    `看完「${brief.hotTopic || industry.label}」，我想到一个更现实的问题`,
    `${brief.product || "这个产品"}到底适合谁？我会先看这 3 点`,
    `普通人做${industry.label}，先完成一个最小动作`,
    `别再只收藏了，照这个顺序做一遍`,
    `${industry.label}新手最容易踩的坑，我先替你说了`,
    `如果你也${industry.emotions[0]}，这篇可以先收藏`
  ];

  return base.map((name, index) => ({
    id: `topic-${index}`,
    name,
    angle: industry.angles[index % industry.angles.length],
    emotion: industry.emotions[index % industry.emotions.length],
    fit: index % 2 === 0 ? brief.platform : `${brief.platform} / 小红书`
  }));
}

function generateTitles(topic, industry, platformName) {
  const hooks = industry.titleHooks;
  const xhs = [
    `${hooks[0]}，先看完这个再决定`,
    `我也是踩过坑才发现：${topic.angle}真的很重要`,
    `${topic.emotion}的人，别一上来就硬撑`,
    `说句实话，${industry.label}新手最缺的不是方法`,
    `${hooks[1]}，难怪你一直卡住`
  ];
  const douyin = [
    `${hooks[0]}，很多人第一步就错了`,
    `${topic.emotion}？你先别急，问题可能不在你`,
    `做${industry.label}前，先把这件事想明白`,
    `${hooks[2]}，我给你拆简单点`,
    `别划走，这个坑新手真的很容易踩`
  ];
  const wechat = [
    `${industry.label}新手为什么容易卡住：从${topic.angle}开始说起`,
    `普通人做${industry.label}，更现实的起点是什么`,
    `从用户焦虑看${industry.label}内容该怎么写`
  ];
  const list = platformName === "公众号" ? wechat : platformName === "抖音" ? douyin : xhs;
  return {
    long: list.slice(0, 5),
    cover: topic.emotion.length > 7 ? topic.emotion.slice(0, 7) : topic.emotion,
    styleNote: industry.tone
  };
}

function generateStructure(topic, brief, industry) {
  return {
    hook: `我发现很多人卡在${industry.label}，不是不想做，而是一开始就把事情想太大了。`,
    sections: [
      `先说一个真实场景：${topic.emotion}的时候，用户最容易点进来`,
      `再拆原因：${topic.angle}背后，其实是「${industry.pains[0]}」`,
      "给一个小动作：不要追求完整方案，先做一次能完成的尝试",
      `自然带到产品：如果要继续往下做，可以用「${brief.product || "你的产品"}」承接练习或决策`
    ],
    emotionFlow: "真实场景 -> 被理解 -> 发现原因 -> 降低门槛 -> 评论互动",
    ending: `你现在最卡的是「${topic.angle}」还是「不知道怎么开始」？评论区发我，我帮你拆一个选题。`
  };
}

function generateContentResult(topic, brief, industry, titles, structure, publish) {
  const body = [
    structure.hook,
    "",
    `最近看到「${brief.hotTopic || topic.angle}」这个话题，我觉得它背后其实不是简单的情绪，而是很多人真的卡住了。`,
    "",
    `如果你也有「${topic.emotion}」的感觉，可以先别急着逼自己立刻变好。先把问题拆小：今天只做一件和「${topic.angle}」有关的小事。`,
    "",
    `比如先记录一个真实场景，或者用「${brief.product || "一个工具"}」完成一次最小练习。你不需要一开始就做得很完整，先让自己看到一点反馈。`,
    "",
    "真正能让人坚持下去的，往往不是更大的计划，而是一个能马上开始、马上看到结果的小动作。",
    "",
    structure.ending
  ].join("\n");

  return {
    xiaohongshuBody: body,
    commentSuggestions: [
      "你现在最卡的是哪一步？",
      `如果你也是${industry.label}新手，我可以继续拆一个 3 天行动版。`,
      "想要模板的可以评论“模板”。"
    ],
    coverTitles: [
      titles.cover,
      "先别硬撑",
      "从这一步开始"
    ],
    publishTime: publish.time,
    interactionGuide: `评论区引导用户说出自己的真实情况，比如“你现在是不会开始，还是坚持不住？”`
  };
}

function generateContentMetrics(topic, brief, industry, viral) {
  const emotionStrength = Math.min(95, 58 + topic.emotion.length * 3 + (brief.hotTopic ? 10 : 0));
  const hasViralRef = Boolean((brief.viralText || "").trim());
  const probability = Math.min(92, 42 + emotionStrength * 0.35 + (hasViralRef ? 10 : 0) + (brief.platform === "小红书" ? 6 : 0));
  const contentTypes = [
    { label: "收藏型内容", active: ["清单", "步骤", "避坑", "第一步"].some((word) => topic.name.includes(word) || topic.angle.includes(word)) },
    { label: "评论型内容", active: topic.emotion.length >= 5 || Boolean(brief.hotTopic) },
    { label: "转发型内容", active: ["避坑", "现实", "不想", "焦虑"].some((word) => `${topic.name}${brief.hotTopic}`.includes(word)) }
  ];

  return {
    contentTypes,
    emotionStrength,
    stayPoint: `用户会停在「${topic.emotion}」和「${topic.angle}」这两个点上，因为它们直接对应自己的处境。`,
    viralProbability: Math.round(probability),
    reason: probability >= 75
      ? "情绪明确，有热点或爆款参考，适合优先做。"
      : "方向可用，但还需要更具体的案例或更强的开头。"
  };
}

function generateActionPlan(topic, brief, industry, platform, publish, metrics) {
  const worthDoing = metrics.viralProbability >= 68;
  const shouldPostToday = worthDoing && metrics.emotionStrength >= 70;
  const formByPlatform = {
    小红书: metrics.contentTypes.some((item) => item.label === "收藏型内容" && item.active) ? "图文清单 / 经验笔记" : "图文故事 / 对比笔记",
    抖音: "口播短视频 / 屏幕录制讲解",
    公众号: "方法论长文 / 案例复盘"
  };

  return {
    worthDoing: worthDoing ? "值得做" : "可以做，但需要再补真实场景",
    timingDecision: shouldPostToday ? "适合今天发" : "先暂缓，补一个真实案例后再发",
    publishTime: publish.time,
    contentForm: formByPlatform[brief.platform] || "图文内容",
    interactionMethod: "结尾用一个二选一问题，不要只问“你怎么看”。",
    commentQuestion: `你现在更卡在「${topic.angle}」，还是「不知道怎么开始」？`,
    imageDirection: publish.image,
    nextStep: shouldPostToday ? "先发布图文版本，评论区收集问题，明天做系列第二篇。" : "先补一个自己的经历或用户案例，再进入待发布。"
  };
}

function generateRiskJudgement(topic, brief, industry, titles, structure, metrics) {
  const joined = `${titles.long.join(" ")} ${structure.hook} ${structure.sections.join(" ")}`;
  const riskRules = [
    { label: "情绪太空", hit: metrics.emotionStrength < 68, fix: "加一个具体生活/工作场景，让用户知道你说的是哪种卡住。" },
    { label: "标题太硬", hit: titles.long.some((title) => title.length > 28), fix: "标题缩短，保留一个情绪点和一个具体动作。" },
    { label: "太像说教", hit: /应该|必须|一定要|最危险/.test(joined), fix: "把命令式表达改成个人经历或提醒。" },
    { label: "缺少真实场景", hit: !brief.hotTopic && !brief.viralText, fix: "补充今天看到的热点、评论或一个用户问题。" },
    { label: "AI味太重", hit: /方法论|路径|结构化|认知/.test(joined), fix: "少用抽象词，多用“我以前也这样”“先做这一步”这种人话。" },
    { label: "用户代入感不足", hit: !brief.audience || brief.audience.length < 6, fix: "把目标用户写具体，比如“刚开始学AI的上班族”。" }
  ];
  const active = riskRules.filter((item) => item.hit);

  return {
    level: active.length >= 3 ? "高风险" : active.length >= 1 ? "中风险" : "低风险",
    items: active.length ? active : [{ label: "暂无明显风险", hit: false, fix: "可以进入正文优化和发布准备。" }]
  };
}

function generateCompletion(topic, titles, structure, publish, metrics) {
  const items = [
    { label: "爆点明确", done: metrics.viralProbability >= 65 },
    { label: "用户情绪明确", done: metrics.emotionStrength >= 65 },
    { label: "标题完成", done: titles.long.length >= 3 && Boolean(titles.cover) },
    { label: "内容结构完成", done: structure.sections.length >= 4 },
    { label: "发布动作完成", done: Boolean(publish.time && publish.tags.length) }
  ];
  const doneCount = items.filter((item) => item.done).length;
  return {
    percent: Math.round((doneCount / items.length) * 100),
    items
  };
}

function generateAiAdvice(topic, brief, industry, metrics) {
  const activeTypes = metrics.contentTypes.filter((item) => item.active).map((item) => item.label);
  return [
    `为什么值得做：它抓住了「${topic.emotion}」这个真实情绪，新手用户容易有代入感。`,
    `为什么容易收藏：内容可以拆成步骤、清单或避坑，用户会想留着以后照做。`,
    `为什么容易评论：结尾可以让用户说出自己卡在哪一步，评论门槛低。`,
    `为什么适合小红书：它不是硬卖产品，而是经验分享 + 行动建议，更像真实笔记。`,
    `为什么适合新手账号：不需要强人设，靠具体问题、真实场景和稳定输出建立信任。`,
    `为什么适合做系列：后续可以继续拆「${industry.angles.slice(0, 3).join(" / ")}」，形成连续选题。`,
    activeTypes.length ? `当前内容倾向：${activeTypes.join("、")}。` : "当前内容标签不强，建议强化收藏或评论钩子。"
  ];
}

function createImageSuggestion(label) {
  const map = {
    AI学习: "工具界面截图、学习记录、步骤清单",
    电商: "商品卖点对比、后台数据、活动复盘表",
    餐饮: "真实菜品图、菜单局部、到店场景",
    宠物: "宠物真实照片、用品清单、护理步骤图",
    美妆: "产品实拍、妆面/肤质对比、空瓶记录",
    本地生活: "地点实拍、路线截图、人均价格卡"
  };
  return map[label] || "真实场景图、清单图、步骤卡";
}

function makePoolItem(current, topic, status) {
  return {
    id: `${status}-${Date.now()}`,
    topic: topic.name,
    angle: topic.angle,
    emotion: topic.emotion,
    platform: current.brief.platform,
    industry: industries[current.brief.industry].label,
    titles: current.workflow.titles,
    structure: current.workflow.structure,
    publish: current.workflow.publish,
    contentResult: current.workflow.contentResult,
    metrics: current.workflow.metrics,
    actionPlan: current.workflow.actionPlan,
    risks: current.workflow.risks,
    completion: current.workflow.completion,
    aiAdvice: current.workflow.aiAdvice,
    taskStatus: status === "待发布" ? "待发布" : "待优化",
    publishTime: current.workflow.actionPlan.publishTime,
    contentDirection: topic.angle,
    emotionTag: topic.emotion,
    status
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.brief) {
      const workflow = generateWorkflow(saved.brief);
      return {
        brief: saved.brief,
        workflow,
        activeTopicId: workflow.topics.find((item) => item.id === saved.activeTopicId)?.id || workflow.topics[0]?.id,
        activeModule: saved.activeModule || "emotion",
        savedItems: Array.isArray(saved.savedItems) ? saved.savedItems : [],
        publishQueue: Array.isArray(saved.publishQueue) ? saved.publishQueue : []
      };
    }
  } catch {
    // Ignore invalid cache.
  }
  const workflow = generateWorkflow(initialBrief);
  return {
    brief: initialBrief,
    workflow,
    activeTopicId: workflow.topics[0]?.id,
    activeModule: "emotion",
    savedItems: [],
    publishQueue: []
  };
}

function App() {
  const [state, setState] = React.useState(loadState);
  const activeTopic = state.workflow.topics.find((item) => item.id === state.activeTopicId) || state.workflow.topics[0];
  const activeModule = promptModules.find((item) => item.id === state.activeModule) || promptModules[0];
  const activePrompt = buildPrompt(activeModule, state.brief);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function updateBrief(key, value) {
    setState((current) => {
      const brief = { ...current.brief, [key]: value };
      const selected = current.workflow.topics.find((item) => item.id === current.activeTopicId);
      const workflow = generateWorkflow(brief, selected);
      return { ...current, brief, workflow };
    });
  }

  function runModule(moduleId) {
    setState((current) => ({ ...current, activeModule: moduleId, workflow: generateWorkflow(current.brief, activeTopic) }));
  }

  function selectTopic(topicId) {
    setState((current) => {
      const topic = current.workflow.topics.find((item) => item.id === topicId);
      return { ...current, activeTopicId: topicId, workflow: generateWorkflow(current.brief, topic) };
    });
  }

  function saveCurrent() {
    setState((current) => {
      const topic = current.workflow.topics.find((item) => item.id === current.activeTopicId) || current.workflow.topics[0];
      return { ...current, savedItems: [makePoolItem(current, topic, "已收藏"), ...current.savedItems] };
    });
  }

  function addToQueue(item = null) {
    setState((current) => {
      const topic = current.workflow.topics.find((entry) => entry.id === current.activeTopicId) || current.workflow.topics[0];
      const source = item || makePoolItem(current, topic, "待发布");
      return { ...current, publishQueue: [{ ...source, id: `queue-${Date.now()}`, status: "待发布" }, ...current.publishQueue] };
    });
  }

  function removeQueue(id) {
    setState((current) => ({ ...current, publishQueue: current.publishQueue.filter((item) => item.id !== id) }));
  }

  function updateQueueStatus(id, taskStatus) {
    setState((current) => ({
      ...current,
      publishQueue: current.publishQueue.map((item) => item.id === id ? { ...item, taskStatus } : item)
    }));
  }

  return (
    <div className="min-h-screen bg-ink text-text">
      <header className="sticky top-0 z-30 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-cyan/40 bg-cyan/10 text-cyan">
              <Workflow size={19} />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold">AI新媒体选题工作台</h1>
              <p className="truncate text-xs text-muted">选题分析 · 情绪拆解 · 标题生成 · 爆款拆解 · 待发布内容池</p>
            </div>
          </div>
          <div className="hidden gap-2 text-xs text-muted md:flex">
            <span className="rounded border border-line px-2 py-1">React</span>
            <span className="rounded border border-line px-2 py-1">Tailwind</span>
            <span className="rounded border border-line px-2 py-1">LocalStorage</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[320px_minmax(0,1fr)_330px]">
        <BriefPanel brief={state.brief} updateBrief={updateBrief} />

        <section className="min-w-0 space-y-4">
          <StrategyDashboard workflow={state.workflow} activeTopic={activeTopic} />
          <ActionClosure workflow={state.workflow} />
          <ContentResult workflow={state.workflow} saveCurrent={saveCurrent} addToQueue={addToQueue} />
          <PromptWorkflow
            activeModule={state.activeModule}
            activePrompt={activePrompt}
            workflow={state.workflow}
            runModule={runModule}
          />
          <ViralPanel viralText={state.brief.viralText} updateBrief={updateBrief} viral={state.workflow.viral} />
          <TopicWorkspace
            topics={state.workflow.topics}
            activeTopicId={state.activeTopicId}
            workflow={state.workflow}
            selectTopic={selectTopic}
            saveCurrent={saveCurrent}
            addToQueue={addToQueue}
          />
        </section>

        <QueuePanel savedItems={state.savedItems} publishQueue={state.publishQueue} addToQueue={addToQueue} removeQueue={removeQueue} updateQueueStatus={updateQueueStatus} />
      </main>
    </div>
  );
}

function BriefPanel({ brief, updateBrief }) {
  const industry = industries[brief.industry] || industries.aiLearning;
  return (
    <aside className="space-y-4">
      <section className="rounded-lg border border-line bg-panel p-4 shadow-workbench">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">输入信息</h2>
          <Sparkles size={16} className="text-cyan" />
        </div>
        <div className="space-y-3">
          <Field label="行业">
            <select value={brief.industry} onChange={(event) => updateBrief("industry", event.target.value)}>
              {Object.entries(industries).map(([key, item]) => (
                <option key={key} value={key}>{item.label}</option>
              ))}
            </select>
          </Field>
          <Field label="产品 / 服务">
            <input value={brief.product} onChange={(event) => updateBrief("product", event.target.value)} />
          </Field>
          <Field label="平台">
            <select value={brief.platform} onChange={(event) => updateBrief("platform", event.target.value)}>
              {Object.keys(platformProfiles).map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="目标用户">
            <input value={brief.audience} onChange={(event) => updateBrief("audience", event.target.value)} />
          </Field>
          <Field label="当前推广方向">
            <textarea value={brief.direction} onChange={(event) => updateBrief("direction", event.target.value)} rows={3} />
          </Field>
          <Field label="今日热点 / 看到的内容">
            <textarea value={brief.hotTopic} onChange={(event) => updateBrief("hotTopic", event.target.value)} rows={3} />
          </Field>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-panel p-4">
        <h2 className="mb-3 text-sm font-semibold">行业风格</h2>
        <p className="text-sm leading-6 text-muted">{industry.tone}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {industry.keywords.map((word) => (
            <span key={word} className="rounded border border-line bg-panel2 px-2 py-1 text-xs text-muted">{word}</span>
          ))}
        </div>
      </section>
    </aside>
  );
}

function StrategyDashboard({ workflow, activeTopic }) {
  const activeTypes = workflow.metrics.contentTypes.filter((item) => item.active);
  return (
    <section className="rounded-lg border border-line bg-panel p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">今日内容策略</h2>
          <p className="mt-1 text-xs text-muted">先判断这条内容值不值得做，再进入正文生产。</p>
        </div>
        <div className="rounded-md border border-cyan/40 bg-cyan/10 px-3 py-2 text-right">
          <p className="text-xs text-cyan">爆款概率</p>
          <p className="text-xl font-semibold">{workflow.metrics.viralProbability}%</p>
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <div className="rounded-md border border-line bg-panel2 p-3">
          <p className="mb-2 text-xs font-semibold text-cyan">当前主选题</p>
          <h3 className="text-sm font-semibold leading-6">{activeTopic?.name}</h3>
          <p className="mt-2 text-xs leading-5 text-muted">{workflow.hotspot.trendFit}</p>
        </div>
        <div className="rounded-md border border-line bg-panel2 p-3">
          <p className="mb-2 text-xs font-semibold text-cyan">内容标签</p>
          <div className="flex flex-wrap gap-2">
            {workflow.metrics.contentTypes.map((item) => (
              <span
                key={item.label}
                className={`rounded border px-2 py-1 text-xs ${
                  item.active ? "border-cyan/50 bg-cyan/10 text-cyan" : "border-line text-muted"
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">{activeTypes.length ? "当前更适合做：" + activeTypes.map((item) => item.label).join(" / ") : "标签较弱，需要强化钩子。"}</p>
        </div>
        <div className="rounded-md border border-line bg-panel2 p-3">
          <p className="mb-2 text-xs font-semibold text-cyan">数据判断</p>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted">情绪强度</span>
            <span className="text-text">{workflow.metrics.emotionStrength}/100</span>
          </div>
          <div className="mb-3 h-2 rounded bg-panel3">
            <div className="h-2 rounded bg-cyan" style={{ width: `${workflow.metrics.emotionStrength}%` }} />
          </div>
          <p className="text-xs leading-5 text-muted">{workflow.metrics.reason}</p>
        </div>
      </div>
      <div className="mt-3 rounded-md border border-line bg-panel3 p-3">
        <p className="text-xs font-semibold text-cyan">用户停留点</p>
        <p className="mt-1 text-xs leading-5 text-muted">{workflow.metrics.stayPoint}</p>
      </div>
    </section>
  );
}

function ActionClosure({ workflow }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-lg border border-line bg-panel p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">今日行动建议</h2>
            <p className="mt-1 text-xs text-muted">把分析结果转成今天要不要发、怎么发、发完怎么互动。</p>
          </div>
          <span className={`rounded border px-2 py-1 text-xs ${workflow.actionPlan.timingDecision.includes("今天") ? "border-cyan/50 bg-cyan/10 text-cyan" : "border-line text-muted"}`}>
            {workflow.actionPlan.timingDecision}
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <SmallMeta label="是否值得做" value={workflow.actionPlan.worthDoing} />
          <SmallMeta label="推荐发布时间" value={workflow.actionPlan.publishTime} />
          <SmallMeta label="推荐内容形式" value={workflow.actionPlan.contentForm} />
          <SmallMeta label="推荐互动方式" value={workflow.actionPlan.interactionMethod} />
          <SmallMeta label="推荐评论区问题" value={workflow.actionPlan.commentQuestion} />
          <SmallMeta label="推荐配图方向" value={workflow.actionPlan.imageDirection} />
        </div>
        <div className="mt-3 rounded-md border border-cyan/30 bg-cyan/10 p-3">
          <p className="text-xs font-semibold text-cyan">下一步动作</p>
          <p className="mt-1 text-xs leading-5 text-text">{workflow.actionPlan.nextStep}</p>
        </div>
      </div>

      <div className="space-y-4">
        <CompletionCard completion={workflow.completion} />
        <RiskCard risks={workflow.risks} />
      </div>

      <div className="rounded-lg border border-line bg-panel p-4 xl:col-span-2">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <BrainCircuit size={16} className="text-cyan" />
          AI运营建议：为什么这个内容值得做
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {workflow.aiAdvice.map((item) => (
            <div key={item} className="rounded-md border border-line bg-panel2 px-3 py-2 text-xs leading-5 text-muted">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompletionCard({ completion }) {
  return (
    <section className="rounded-lg border border-line bg-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">内容完成度</h2>
        <span className="text-sm font-semibold text-cyan">{completion.percent}%</span>
      </div>
      <div className="mb-3 h-2 rounded bg-panel3">
        <div className="h-2 rounded bg-cyan" style={{ width: `${completion.percent}%` }} />
      </div>
      <div className="grid gap-2">
        {completion.items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded border border-line bg-panel2 px-3 py-2 text-xs">
            <span className={item.done ? "text-text" : "text-muted"}>{item.label}</span>
            <span className={item.done ? "text-cyan" : "text-muted"}>{item.done ? "完成" : "待补"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RiskCard({ risks }) {
  return (
    <section className="rounded-lg border border-line bg-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">风险判断卡片</h2>
        <span className={`rounded border px-2 py-1 text-xs ${risks.level === "低风险" ? "border-cyan/50 text-cyan" : "border-red/50 text-red"}`}>{risks.level}</span>
      </div>
      <div className="space-y-2">
        {risks.items.map((item) => (
          <div key={item.label} className="rounded-md border border-line bg-panel2 p-3">
            <p className="text-xs font-semibold text-text">{item.label}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{item.fix}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContentResult({ workflow, saveCurrent, addToQueue }) {
  return (
    <section className="rounded-lg border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line p-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FileText size={16} className="text-cyan" />
          内容生成结果区
        </div>
        <div className="flex gap-2">
          <button onClick={saveCurrent} className="inline-flex h-8 items-center gap-2 rounded-md border border-line px-2 text-xs text-text hover:bg-panel2">
            <BookmarkPlus size={14} />
            收藏
          </button>
          <button onClick={() => addToQueue()} className="inline-flex h-8 items-center gap-2 rounded-md bg-cyan px-2 text-xs font-semibold text-ink">
            <Send size={14} />
            加入待发布
          </button>
        </div>
      </div>
      <div className="grid gap-3 p-3 xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)]">
        <div className="rounded-md border border-line bg-panel2 p-3">
          <p className="mb-2 text-xs font-semibold text-cyan">小红书正文生成区</p>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-sm leading-7 text-text">{workflow.contentResult.xiaohongshuBody}</pre>
        </div>
        <div className="grid gap-3">
          <OutputList title="封面标题建议" items={workflow.contentResult.coverTitles} />
          <OutputList title="评论区互动建议" items={workflow.contentResult.commentSuggestions} />
          <SmallMeta label="发布时间建议" value={workflow.contentResult.publishTime} />
          <SmallMeta label="用户互动引导语" value={workflow.contentResult.interactionGuide} />
        </div>
      </div>
    </section>
  );
}

function PromptWorkflow({ activeModule, activePrompt, workflow, runModule }) {
  return (
    <section className="rounded-lg border border-line bg-panel">
      <div className="border-b border-line p-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Layers3 size={16} className="text-cyan" />
          Prompt工作流
        </div>
      </div>
      <div className="grid gap-0 md:grid-cols-[240px_minmax(0,1fr)]">
        <div className="border-b border-line p-2 md:border-b-0 md:border-r">
          {promptModules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => runModule(module.id)}
                className={`mb-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                  activeModule === module.id ? "bg-cyan text-ink" : "text-muted hover:bg-panel2 hover:text-text"
                }`}
              >
                <Icon size={15} />
                {module.name.replace(" Prompt", "")}
              </button>
            );
          })}
        </div>
        <div className="grid gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-md border border-line bg-panel2 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-cyan">当前 Prompt</p>
              <span className="text-xs text-muted">后续可接 ChatGPT API</span>
            </div>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-5 text-muted">{activePrompt}</pre>
          </div>
          <ModuleOutput moduleId={activeModule} workflow={workflow} />
        </div>
      </div>
    </section>
  );
}

function ModuleOutput({ moduleId, workflow }) {
  const output = {
    hotspot: <OutputList title="热点分析" items={[workflow.hotspot.trendFit, ...workflow.hotspot.angles, workflow.hotspot.risk]} />,
    emotion: (
      <div className="grid gap-3">
        <OutputList title="用户为什么会点" items={workflow.emotion.clickReason} />
        <OutputList title="用户焦虑点" items={workflow.emotion.anxiety} />
        <OutputList title="用户欲望" items={workflow.emotion.desire} />
        <OutputList title="用户痛点" items={workflow.emotion.pain} />
        <OutputList title="评论区可能出现的话题" items={workflow.emotion.comments} />
      </div>
    ),
    titles: <OutputList title="真实标题方案" items={[...workflow.titles.long, `封面短标题：${workflow.titles.cover}`]} />,
    structure: <OutputList title="内容结构" items={[workflow.structure.hook, ...workflow.structure.sections, workflow.structure.ending]} />,
    publish: <OutputList title="发布建议" items={[workflow.publish.time, workflow.publish.cover, workflow.publish.image, ...workflow.publish.checklist]} />
  }[moduleId];
  return <div className="rounded-md border border-line bg-panel2 p-3">{output}</div>;
}

function ViralPanel({ viralText, updateBrief, viral }) {
  return (
    <section className="rounded-lg border border-line bg-panel p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <MessageSquareText size={16} className="text-cyan" />
        爆款拆解
      </div>
      <textarea
        value={viralText}
        onChange={(event) => updateBrief("viralText", event.target.value)}
        rows={4}
        placeholder="粘贴爆款标题或文案，例如：为什么很多人学AI三天就放弃？不是懒，是一开始就学错了。"
      />
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <SmallMeta label="情绪钩子" value={viral.hook} />
        <SmallMeta label="用户痛点" value={viral.pain} />
        <OutputList title="内容结构" items={viral.structure} />
        <OutputList title="可复用选题方向" items={viral.reusableAngles.slice(0, 4)} />
      </div>
    </section>
  );
}

function TopicWorkspace({ topics, activeTopicId, workflow, selectTopic, saveCurrent, addToQueue }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="rounded-lg border border-line bg-panel">
        <div className="flex items-center justify-between border-b border-line p-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ListFilter size={16} className="text-cyan" />
            选题分析
          </div>
          <div className="flex gap-2">
            <button onClick={saveCurrent} className="inline-flex h-8 items-center gap-2 rounded-md border border-line px-2 text-xs text-text hover:bg-panel2">
              <BookmarkPlus size={14} />
              收藏
            </button>
            <button onClick={() => addToQueue()} className="inline-flex h-8 items-center gap-2 rounded-md bg-cyan px-2 text-xs font-semibold text-ink">
              <Send size={14} />
              待发布
            </button>
          </div>
        </div>
        <div className="grid gap-2 p-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => selectTopic(topic.id)}
              className={`rounded-md border p-3 text-left transition ${
                topic.id === activeTopicId ? "border-cyan bg-cyan/10" : "border-line bg-panel2 hover:bg-panel3"
              }`}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold leading-6">{topic.name}</h3>
                <span className="shrink-0 rounded border border-line px-2 py-1 text-xs text-muted">{topic.fit}</span>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <SmallMeta label="切入角度" value={topic.angle} />
                <SmallMeta label="用户情绪" value={topic.emotion} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-lg border border-line bg-panel p-4">
          <h2 className="mb-3 text-sm font-semibold">标题生成</h2>
          <div className="space-y-2">
            {workflow.titles.long.map((title, index) => (
              <div key={title} className="rounded-md border border-line bg-panel2 p-3">
                <p className="mb-1 text-xs text-muted">标题 {index + 1}</p>
                <p className="text-sm leading-6">{title}</p>
              </div>
            ))}
            <div className="rounded-md border border-cyan/40 bg-cyan/10 p-3">
              <p className="mb-1 text-xs text-cyan">封面短标题</p>
              <p className="text-xl font-semibold">{workflow.titles.cover}</p>
            </div>
          </div>
        </section>
        <section className="rounded-lg border border-line bg-panel p-4">
          <h2 className="mb-3 text-sm font-semibold">内容结构</h2>
          <p className="mb-3 text-sm leading-6 text-muted">{workflow.structure.hook}</p>
          <ol className="space-y-2">
            {workflow.structure.sections.map((item, index) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-cyan/10 text-xs text-cyan">{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}

function QueuePanel({ savedItems, publishQueue, addToQueue, removeQueue, updateQueueStatus }) {
  return (
    <aside className="space-y-4">
      <section className="rounded-lg border border-line bg-panel p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Archive size={16} className="text-cyan" />
            内容收藏
          </div>
          <span className="text-xs text-muted">{savedItems.length}</span>
        </div>
        <div className="space-y-2">
          {savedItems.length === 0 ? (
            <Empty text="暂无收藏" />
          ) : savedItems.map((item) => (
            <article key={item.id} className="rounded-md border border-line bg-panel2 p-3">
              <p className="mb-2 text-sm font-semibold leading-6">{item.topic}</p>
              <div className="mb-2 text-xs text-muted">{item.industry} · {item.platform}</div>
              <p className="mb-3 text-xs leading-5 text-muted">封面：{item.titles.cover}</p>
              {item.metrics && (
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded border border-cyan/40 bg-cyan/10 px-2 py-1 text-xs text-cyan">爆款 {item.metrics.viralProbability}%</span>
                  {item.metrics.contentTypes.filter((type) => type.active).slice(0, 2).map((type) => (
                    <span key={type.label} className="rounded border border-line px-2 py-1 text-xs text-muted">{type.label}</span>
                  ))}
                </div>
              )}
              <button onClick={() => addToQueue(item)} className="h-8 w-full rounded-md border border-line text-xs text-text hover:bg-panel3">
                加入待发布
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-panel p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Clock size={16} className="text-cyan" />
            待发布内容池
          </div>
          <span className="text-xs text-muted">{publishQueue.length}</span>
        </div>
        <div className="space-y-2">
          {publishQueue.length === 0 ? (
            <Empty text="暂无待发布内容" />
          ) : publishQueue.map((item) => (
            <article key={item.id} className="rounded-md border border-line bg-panel2 p-3">
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-sm font-semibold leading-6">{item.topic}</p>
                <button onClick={() => removeQueue(item.id)} className="text-muted hover:text-text" title="删除">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="mb-2 grid gap-2">
                <select
                  value={item.taskStatus || "待发布"}
                  onChange={(event) => updateQueueStatus(item.id, event.target.value)}
                  className="h-8 text-xs"
                >
                  <option>待写</option>
                  <option>待优化</option>
                  <option>待发布</option>
                  <option>已发布</option>
                </select>
              </div>
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="rounded border border-line px-2 py-1 text-xs text-muted">{item.platform}</span>
                <span className="rounded border border-line px-2 py-1 text-xs text-muted">{item.contentDirection || item.angle}</span>
                <span className="rounded border border-cyan/40 bg-cyan/10 px-2 py-1 text-xs text-cyan">{item.emotionTag || item.emotion}</span>
              </div>
              <p className="text-xs leading-5 text-muted">标题：{item.titles.long[0]}</p>
              <p className="mt-2 text-xs leading-5 text-muted">发布时间：{item.publishTime || item.publish.time}</p>
              {item.metrics && <p className="mt-2 text-xs leading-5 text-cyan">爆款概率：{item.metrics.viralProbability}% · 情绪强度：{item.metrics.emotionStrength}</p>}
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
}

function OutputList({ title, items }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-cyan">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="rounded border border-line bg-panel3 px-3 py-2 text-xs leading-5 text-muted">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}

function SmallMeta({ label, value }) {
  return (
    <div className="rounded border border-line bg-ink/30 p-2">
      <p className="mb-1 text-xs text-muted">{label}</p>
      <p className="text-xs leading-5 text-text">{value}</p>
    </div>
  );
}

function Empty({ text }) {
  return <div className="grid min-h-28 place-items-center rounded-md border border-dashed border-line bg-panel2 text-xs text-muted">{text}</div>;
}

createRoot(document.getElementById("root")).render(<App />);

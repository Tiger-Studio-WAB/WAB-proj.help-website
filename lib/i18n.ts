import { IDEA_CATEGORIES, type ContentLanguage, type IdeaCategory } from "@/lib/types";

export const UI_COOKIE = "wab-locale";

export type UiCopy = {
  brand: string;
  tagline: string;
  restricted: string;
  signIn: string;
  signOut: string;
  ideas: string;
  publish: string;
  myBoard: string;
  readMore: string;
  helpNeeded: string;
  responses: string;
  canHelp: string;
  writeResponse: string;
  postResponse: string;
  translateTo: string;
  showingTranslation: string;
  showOriginal: string;
  translationUnavailable: string;
  emptyIdeas: string;
  emptyResponses: string;
  title: string;
  description: string;
  category: string;
  language: string;
  submitIdea: string;
  backToIdeas: string;
  signedInAs: string;
  setupNeeded: string;
  featurePublish: string;
  featurePublishBody: string;
  featureRespond: string;
  featureRespondBody: string;
  featureTranslate: string;
  featureTranslateBody: string;
  heroEyebrow: string;
  browseCta: string;
  domainError: string;
  authError: string;
  categories: Record<IdeaCategory, string>;
};

const en: UiCopy = {
  brand: "WAB Proj.Help",
  tagline: "Publish a project idea. Get help — and a response — from the WAB community.",
  restricted: "Microsoft sign-in only. Restricted to @wab.edu accounts.",
  signIn: "Sign in with Microsoft",
  signOut: "Sign out",
  ideas: "Project ideas",
  publish: "Publish an idea",
  myBoard: "My board",
  readMore: "Open idea",
  helpNeeded: "Help needed",
  responses: "Responses",
  canHelp: "I can help with this",
  writeResponse: "Write a response",
  postResponse: "Post response",
  translateTo: "Translate to Chinese",
  showingTranslation: "Showing Chinese translation",
  showOriginal: "Show original",
  translationUnavailable:
    "Translation is not configured yet. Add an AI Gateway key on Vercel to enable it.",
  emptyIdeas: "No ideas yet. Be the first to publish one.",
  emptyResponses: "No responses yet. Offer help or ask a clarifying question.",
  title: "Title",
  description: "Describe the idea",
  category: "Category",
  language: "Language of this post",
  submitIdea: "Publish idea",
  backToIdeas: "All ideas",
  signedInAs: "Signed in as",
  setupNeeded:
    "Connect a Supabase project and Microsoft Entra ID to enable sign-in.",
  featurePublish: "Publish",
  featurePublishBody:
    "Share a project you want to start or grow — class work, service, research, or something new.",
  featureRespond: "Respond",
  featureRespondBody:
    "Offer skills, feedback, or a question so ideas do not sit unanswered.",
  featureTranslate: "Translate",
  featureTranslateBody:
    "Read ideas and replies in English or Chinese without rewriting the original post.",
  heroEyebrow: "Western Academy of Beijing",
  browseCta: "Browse ideas",
  domainError:
    "That Microsoft account is not a @wab.edu address. WAB Proj.Help is only open to the WAB community.",
  authError: "Sign-in did not complete. Try Microsoft again with your WAB account.",
  categories: {
    stem: "STEM",
    arts: "Arts",
    community: "Community",
    research: "Research",
    entrepreneurship: "Entrepreneurship",
    service: "Service",
    other: "Other",
  },
};

const zh: UiCopy = {
  brand: "WAB Proj.Help",
  tagline: "发布项目想法，向 WAB 社区寻求帮助，并得到回应。",
  restricted: "仅支持 Microsoft 登录，且必须使用 @wab.edu 账户。",
  signIn: "使用 Microsoft 登录",
  signOut: "退出登录",
  ideas: "项目想法",
  publish: "发布想法",
  myBoard: "我的看板",
  readMore: "查看想法",
  helpNeeded: "需要的帮助",
  responses: "回应",
  canHelp: "我可以提供帮助",
  writeResponse: "写下回应",
  postResponse: "发布回应",
  translateTo: "翻译成英文",
  showingTranslation: "正在显示英文翻译",
  showOriginal: "查看原文",
  translationUnavailable:
    "翻译尚未配置。请在 Vercel 上添加 AI Gateway 密钥后启用。",
  emptyIdeas: "还没有想法。成为第一个发布的人。",
  emptyResponses: "还没有回应。可以提供帮助，或提出澄清问题。",
  title: "标题",
  description: "描述这个想法",
  category: "分类",
  language: "这篇内容的语言",
  submitIdea: "发布想法",
  backToIdeas: "全部想法",
  signedInAs: "当前登录",
  setupNeeded: "请先连接 Supabase 项目和 Microsoft Entra ID，才能登录。",
  featurePublish: "发布",
  featurePublishBody:
    "分享你想开始或推进的项目——课堂作业、服务、研究，或全新尝试。",
  featureRespond: "回应",
  featureRespondBody: "提供技能、反馈或问题，让想法得到真正的回应。",
  featureTranslate: "翻译",
  featureTranslateBody: "用中文或英文阅读想法与回复，无需改写原文。",
  heroEyebrow: "北京京西学校",
  browseCta: "浏览想法",
  domainError:
    "该 Microsoft 账户不是 @wab.edu 邮箱。WAB Proj.Help 仅对 WAB 社区开放。",
  authError: "登录未完成。请使用你的 WAB Microsoft 账户重试。",
  categories: {
    stem: "STEM",
    arts: "艺术",
    community: "社区",
    research: "研究",
    entrepreneurship: "创业",
    service: "服务",
    other: "其他",
  },
};

export const dictionaries: Record<ContentLanguage, UiCopy> = { en, zh };

export function parseLocale(value: string | undefined | null): ContentLanguage {
  return value === "zh" ? "zh" : "en";
}

export function oppositeLocale(locale: ContentLanguage): ContentLanguage {
  return locale === "en" ? "zh" : "en";
}

export { IDEA_CATEGORIES };

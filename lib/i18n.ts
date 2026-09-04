import { IDEA_CATEGORIES, type ContentLanguage, type IdeaCategory } from "@/lib/types";

export const UI_COOKIE = "wab-locale";

export type UiCopy = {
  brand: string;
  school: string;
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
  heroLine: string;
  browseCta: string;
  domainError: string;
  authError: string;
  howPost: string;
  howReply: string;
  howTranslate: string;
  all: string;
  address: string;
  categories: Record<IdeaCategory, string>;
};

const en: UiCopy = {
  brand: "Proj.Help",
  school: "Western Academy of Beijing",
  tagline:
    "Post a project idea and ask for help. Other people at WAB can reply, and posts can be translated between English and Chinese.",
  restricted: "Sign in with your @wab.edu Microsoft account.",
  signIn: "Sign in with Microsoft",
  signOut: "Sign out",
  ideas: "Ideas",
  publish: "Post an idea",
  myBoard: "My posts",
  readMore: "Open",
  helpNeeded: "Help needed",
  responses: "Replies",
  canHelp: "I can help",
  writeResponse: "Reply",
  postResponse: "Post reply",
  showingTranslation: "Translation",
  showOriginal: "Original",
  translationUnavailable: "Translation is not set up yet.",
  emptyIdeas: "No ideas posted yet.",
  emptyResponses: "No replies yet.",
  title: "Title",
  description: "What is the idea?",
  category: "Category",
  language: "Language",
  submitIdea: "Post idea",
  backToIdeas: "Ideas",
  signedInAs: "Signed in as",
  setupNeeded: "Microsoft sign-in needs Supabase and Entra ID before it will work.",
  heroLine: "Connect, inspire, challenge:",
  browseCta: "See ideas",
  domainError: "That Microsoft account is not @wab.edu.",
  authError: "Sign-in did not finish. Try again with your WAB account.",
  howPost: "Post an idea you want help with.",
  howReply: "Reply if you can help, or have a question.",
  howTranslate: "Translate a post between English and Chinese.",
  all: "All",
  address: "10 Lai Guang Ying Dong Lu, Chaoyang, Beijing 100102",
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
  brand: "Proj.Help",
  school: "北京京西学校",
  tagline: "发布项目想法并求助。同学和老师可以回复，内容也可以在中英文之间翻译。",
  restricted: "请使用 @wab.edu 的 Microsoft 账户登录。",
  signIn: "使用 Microsoft 登录",
  signOut: "退出",
  ideas: "想法",
  publish: "发布想法",
  myBoard: "我的发布",
  readMore: "打开",
  helpNeeded: "需要的帮助",
  responses: "回复",
  canHelp: "我可以帮忙",
  writeResponse: "回复",
  postResponse: "发布回复",
  showingTranslation: "译文",
  showOriginal: "原文",
  translationUnavailable: "翻译还没有开通。",
  emptyIdeas: "还没有人发布想法。",
  emptyResponses: "还没有回复。",
  title: "标题",
  description: "这个想法是什么？",
  category: "分类",
  language: "语言",
  submitIdea: "发布",
  backToIdeas: "想法",
  signedInAs: "当前账户",
  setupNeeded: "需要先接好 Supabase 和 Entra ID，才能用 Microsoft 登录。",
  heroLine: "连接、启发、挑战：",
  browseCta: "查看想法",
  domainError: "这个 Microsoft 账户不是 @wab.edu。",
  authError: "登录没有完成。请用你的 WAB 账户再试一次。",
  howPost: "发布一个需要帮助的想法。",
  howReply: "能帮忙，或者有问题，就回复。",
  howTranslate: "把内容在中英文之间翻译。",
  all: "全部",
  address: "北京市朝阳区来广营东路10号 100102",
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

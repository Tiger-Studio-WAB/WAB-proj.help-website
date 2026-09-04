export const IDEA_CATEGORIES = [
  "stem",
  "arts",
  "community",
  "research",
  "entrepreneurship",
  "service",
  "other",
] as const;

export type IdeaCategory = (typeof IDEA_CATEGORIES)[number];
export type ContentLanguage = "en" | "zh";

export type Profile = {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
};

export type Idea = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  help_needed: string | null;
  category: IdeaCategory;
  source_language: ContentLanguage;
  created_at: string;
  updated_at: string;
  profiles?: Profile | null;
  response_count?: number;
};

export type ResponsePost = {
  id: string;
  idea_id: string;
  author_id: string;
  body: string;
  can_help: boolean;
  source_language: ContentLanguage;
  created_at: string;
  profiles?: Profile | null;
};

export type ContentTranslation = {
  id: string;
  entity_type: "idea" | "response";
  entity_id: string;
  language: ContentLanguage;
  title: string | null;
  body: string;
  help_needed: string | null;
};

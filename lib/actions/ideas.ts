"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSessionUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { IDEA_CATEGORIES, type ContentLanguage, type IdeaCategory } from "@/lib/types";

function asCategory(value: FormDataEntryValue | null): IdeaCategory {
  const raw = String(value ?? "other");
  return (IDEA_CATEGORIES as readonly string[]).includes(raw)
    ? (raw as IdeaCategory)
    : "other";
}

function asLanguage(value: FormDataEntryValue | null): ContentLanguage {
  return value === "zh" ? "zh" : "en";
}

export async function createIdea(formData: FormData) {
  const user = await requireSessionUser();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const helpNeeded = String(formData.get("help_needed") ?? "").trim();
  const category = asCategory(formData.get("category"));
  const sourceLanguage = asLanguage(formData.get("source_language"));

  if (title.length < 3 || body.length < 10) {
    redirect("/ideas/new?error=validation");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ideas")
    .insert({
      author_id: user.id,
      title,
      body,
      help_needed: helpNeeded || null,
      category,
      source_language: sourceLanguage,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect("/ideas/new?error=save");
  }

  revalidatePath("/ideas");
  redirect(`/ideas/${data.id}`);
}

export async function createResponse(formData: FormData) {
  const user = await requireSessionUser();
  const ideaId = String(formData.get("idea_id") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const canHelp = formData.get("can_help") === "on";
  const sourceLanguage = asLanguage(formData.get("source_language"));

  if (!ideaId || body.length < 2) {
    redirect(`/ideas/${ideaId || ""}?error=validation`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("responses").insert({
    idea_id: ideaId,
    author_id: user.id,
    body,
    can_help: canHelp,
    source_language: sourceLanguage,
  });

  if (error) {
    redirect(`/ideas/${ideaId}?error=save`);
  }

  revalidatePath(`/ideas/${ideaId}`);
  redirect(`/ideas/${ideaId}`);
}

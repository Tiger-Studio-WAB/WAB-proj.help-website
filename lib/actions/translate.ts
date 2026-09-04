"use server";

import { generateText, Output } from "ai";
import { z } from "zod";
import { requireSessionUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ContentLanguage } from "@/lib/types";

const TRANSLATION_MODEL = "openai/gpt-5.4-mini";

const ideaSchema = z.object({
  title: z.string(),
  body: z.string(),
  helpNeeded: z.string().nullable(),
});

const responseSchema = z.object({
  body: z.string(),
});

export type TranslateResult =
  | { ok: true; title: string | null; body: string; helpNeeded: string | null }
  | { ok: false; error: "config" | "not_found" | "failed" };

export async function translateContent(input: {
  entityType: "idea" | "response";
  entityId: string;
  targetLanguage: ContentLanguage;
}): Promise<TranslateResult> {
  await requireSessionUser();
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("content_translations")
    .select("title, body, help_needed")
    .eq("entity_type", input.entityType)
    .eq("entity_id", input.entityId)
    .eq("language", input.targetLanguage)
    .maybeSingle();

  if (existing) {
    return {
      ok: true,
      title: existing.title,
      body: existing.body,
      helpNeeded: existing.help_needed,
    };
  }

  let sourceTitle: string | null = null;
  let sourceBody = "";
  let sourceHelp: string | null = null;

  if (input.entityType === "idea") {
    const { data } = await supabase
      .from("ideas")
      .select("title, body, help_needed")
      .eq("id", input.entityId)
      .maybeSingle();
    if (!data) return { ok: false, error: "not_found" };
    sourceTitle = data.title;
    sourceBody = data.body;
    sourceHelp = data.help_needed;
  } else {
    const { data } = await supabase
      .from("responses")
      .select("body")
      .eq("id", input.entityId)
      .maybeSingle();
    if (!data) return { ok: false, error: "not_found" };
    sourceBody = data.body;
  }

  const targetName = input.targetLanguage === "zh" ? "Simplified Chinese" : "English";

  try {
    if (input.entityType === "idea") {
      const { output } = await generateText({
        model: TRANSLATION_MODEL,
        output: Output.object({ schema: ideaSchema }),
        prompt: [
          `Translate the following student project idea into ${targetName}.`,
          "Preserve meaning, names, and a practical tone. Do not add commentary.",
          `Title: ${sourceTitle}`,
          `Body: ${sourceBody}`,
          `Help needed: ${sourceHelp ?? ""}`,
        ].join("\n"),
      });

      if (!output) return { ok: false, error: "failed" };

      const { error } = await supabase.from("content_translations").insert({
        entity_type: "idea",
        entity_id: input.entityId,
        language: input.targetLanguage,
        title: output.title,
        body: output.body,
        help_needed: output.helpNeeded,
      });

      if (error) return { ok: false, error: "failed" };

      return {
        ok: true,
        title: output.title,
        body: output.body,
        helpNeeded: output.helpNeeded,
      };
    }

    const { output } = await generateText({
      model: TRANSLATION_MODEL,
      output: Output.object({ schema: responseSchema }),
      prompt: [
        `Translate this community response into ${targetName}.`,
        "Preserve meaning and tone. Do not add commentary.",
        sourceBody,
      ].join("\n"),
    });

    if (!output) return { ok: false, error: "failed" };

    const { error } = await supabase.from("content_translations").insert({
      entity_type: "response",
      entity_id: input.entityId,
      language: input.targetLanguage,
      title: null,
      body: output.body,
      help_needed: null,
    });

    if (error) return { ok: false, error: "failed" };

    return { ok: true, title: null, body: output.body, helpNeeded: null };
  } catch {
    return { ok: false, error: "config" };
  }
}

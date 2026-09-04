import { createClient } from "@/lib/supabase/server";
import type { Idea, ResponsePost } from "@/lib/types";

export async function listIdeas(options?: {
  authorId?: string;
  category?: string;
}): Promise<Idea[]> {
  const supabase = await createClient();
  let query = supabase
    .from("ideas")
    .select("*, profiles(*), responses(count)")
    .order("created_at", { ascending: false });

  if (options?.authorId) {
    query = query.eq("author_id", options.authorId);
  }
  if (options?.category && options.category !== "all") {
    query = query.eq("category", options.category);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  return data.map((row) => {
    const responses = row.responses as { count: number }[] | null;
    return {
      ...(row as Idea),
      response_count: responses?.[0]?.count ?? 0,
    };
  });
}

export async function getIdea(id: string): Promise<Idea | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ideas")
    .select("*, profiles(*)")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Idea;
}

export async function listResponses(ideaId: string): Promise<ResponsePost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("responses")
    .select("*, profiles(*)")
    .eq("idea_id", ideaId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as ResponsePost[];
}

export async function listMyResponses(authorId: string): Promise<ResponsePost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("responses")
    .select("*, profiles(*)")
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as ResponsePost[];
}

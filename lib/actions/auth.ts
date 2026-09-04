"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function originFromHeaders(headerStore: Headers) {
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

export async function signInWithMicrosoft(formData?: FormData) {
  if (!isSupabaseConfigured()) {
    redirect("/auth/error?reason=setup");
  }

  const headerStore = await headers();
  const origin = originFromHeaders(headerStore);
  const nextPath = formData?.get("next");
  const next =
    typeof nextPath === "string" && nextPath.startsWith("/") ? nextPath : "/ideas";
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "email openid profile",
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error || !data.url) {
    redirect("/auth/error?reason=oauth");
  }

  redirect(data.url);
}

export async function signOut() {
  if (!isSupabaseConfigured()) {
    redirect("/");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

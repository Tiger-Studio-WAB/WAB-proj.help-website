import { NextResponse } from "next/server";
import { isAzureProvider, isAllowedEmail } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/ideas";
  if (!next.startsWith("/")) {
    next = "/ideas";
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error?reason=oauth`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/auth/error?reason=oauth`);
  }

  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  const provider = data.user?.app_metadata?.provider;

  if (!isAllowedEmail(email) || !isAzureProvider(provider)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/auth/error?reason=domain`);
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  }
  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  }
  return NextResponse.redirect(`${origin}${next}`);
}

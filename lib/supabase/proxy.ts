import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAzureProvider, isWabEmail } from "@/lib/domain";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

const PROTECTED_PREFIXES = ["/ideas", "/me"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function updateSession(request: NextRequest) {
  const env = getSupabasePublicEnv();
  if (!env) {
    if (isProtectedPath(request.nextUrl.pathname)) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(login);
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const email = typeof claims?.email === "string" ? claims.email : null;
  const provider =
    typeof claims?.app_metadata === "object" &&
    claims.app_metadata &&
    "provider" in claims.app_metadata
      ? String(claims.app_metadata.provider)
      : null;

  const signedIn = Boolean(claims);
  const allowed =
    signedIn &&
    isWabEmail(email) &&
    (!provider || isAzureProvider(provider));
  const pathname = request.nextUrl.pathname;

  if (signedIn && !allowed) {
    await supabase.auth.signOut();
    const errorUrl = new URL("/auth/error", request.url);
    errorUrl.searchParams.set("reason", "domain");
    return NextResponse.redirect(errorUrl);
  }

  if (isProtectedPath(pathname) && !allowed) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (pathname === "/login" && allowed) {
    return NextResponse.redirect(new URL("/ideas", request.url));
  }

  return supabaseResponse;
}

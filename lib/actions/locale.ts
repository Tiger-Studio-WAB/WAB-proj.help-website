"use server";

import { cookies } from "next/headers";
import { UI_COOKIE, parseLocale } from "@/lib/i18n";

export async function setLocale(value: string) {
  const locale = parseLocale(value);
  const store = await cookies();
  store.set(UI_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

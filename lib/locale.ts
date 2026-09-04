import { cookies } from "next/headers";
import { dictionaries, parseLocale, UI_COOKIE, type UiCopy } from "@/lib/i18n";
import type { ContentLanguage } from "@/lib/types";

export async function getLocale(): Promise<ContentLanguage> {
  const store = await cookies();
  return parseLocale(store.get(UI_COOKIE)?.value);
}

export async function getCopy(): Promise<{ locale: ContentLanguage; copy: UiCopy }> {
  const locale = await getLocale();
  return { locale, copy: dictionaries[locale] };
}

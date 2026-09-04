"use client";

import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/actions/locale";
import type { ContentLanguage } from "@/lib/types";

export function LanguageToggle({ locale }: { locale: ContentLanguage }) {
  const router = useRouter();

  async function toggle() {
    await setLocale(locale === "en" ? "zh" : "en");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium tracking-wide hover:bg-muted"
      aria-label="Switch language"
    >
      {locale === "en" ? "中文" : "EN"}
    </button>
  );
}

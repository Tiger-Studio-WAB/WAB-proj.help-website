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
      className="border border-white/40 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white hover:text-brand-red"
      aria-label="Switch language"
    >
      {locale === "en" ? "中文" : "EN"}
    </button>
  );
}

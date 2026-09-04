"use client";

import { useState } from "react";
import { translateContent, type TranslateResult } from "@/lib/actions/translate";
import type { UiCopy } from "@/lib/i18n";
import type { ContentLanguage } from "@/lib/types";

type Props = {
  entityType: "idea" | "response";
  entityId: string;
  sourceLanguage: ContentLanguage;
  originalTitle?: string;
  originalBody: string;
  originalHelpNeeded?: string | null;
  copy: UiCopy;
};

export function TranslatePanel({
  entityType,
  entityId,
  sourceLanguage,
  originalTitle,
  originalBody,
  originalHelpNeeded,
  copy,
}: Props) {
  const targetLanguage: ContentLanguage = sourceLanguage === "en" ? "zh" : "en";
  const [translated, setTranslated] = useState<Extract<
    TranslateResult,
    { ok: true }
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  async function onTranslate() {
    if (translated) {
      setShowTranslation((value) => !value);
      return;
    }

    setPending(true);
    setError(null);
    const result = await translateContent({
      entityType,
      entityId,
      targetLanguage,
    });
    setPending(false);

    if (!result.ok) {
      setError(
        result.error === "config" ? copy.translationUnavailable : copy.authError,
      );
      return;
    }

    setTranslated(result);
    setShowTranslation(true);
  }

  const title = showTranslation && translated?.title ? translated.title : originalTitle;
  const body = showTranslation && translated ? translated.body : originalBody;
  const helpNeeded =
    showTranslation && translated ? translated.helpNeeded : originalHelpNeeded;

  return (
    <div className="space-y-4">
      {title ? <h1 className="text-3xl font-bold italic">{title}</h1> : null}
      <p className="whitespace-pre-wrap text-base leading-8">{body}</p>
      {helpNeeded ? (
        <div className="border-l-4 border-wab-yellow bg-muted px-4 py-3">
          <p className="text-sm font-semibold">{copy.helpNeeded}</p>
          <p className="mt-1 text-sm leading-7">{helpNeeded}</p>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onTranslate}
          disabled={pending}
          className="text-sm font-semibold text-wab-red hover:underline disabled:opacity-50"
        >
          {pending
            ? "…"
            : showTranslation
              ? copy.showOriginal
              : targetLanguage === "zh"
                ? "中文"
                : "English"}
        </button>
        {showTranslation ? (
          <span className="text-sm text-muted-foreground">{copy.showingTranslation}</span>
        ) : null}
      </div>
      {error ? <p className="text-sm text-wab-red">{error}</p> : null}
    </div>
  );
}

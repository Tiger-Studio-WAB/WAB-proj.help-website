import { createResponse } from "@/lib/actions/ideas";
import type { UiCopy } from "@/lib/i18n";
import type { ContentLanguage } from "@/lib/types";

export function ResponseForm({
  ideaId,
  copy,
  locale,
}: {
  ideaId: string;
  copy: UiCopy;
  locale: ContentLanguage;
}) {
  return (
    <form action={createResponse} className="surface space-y-4 rounded-3xl p-6">
      <input type="hidden" name="idea_id" value={ideaId} />
      <input type="hidden" name="source_language" value={locale} />
      <label className="block space-y-2">
        <span className="text-sm text-muted-foreground">{copy.writeResponse}</span>
        <textarea
          required
          minLength={2}
          maxLength={4000}
          name="body"
          rows={4}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none ring-ring focus:ring-2"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="can_help" className="size-4 accent-primary" />
        {copy.canHelp}
      </label>
      <button
        type="submit"
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110"
      >
        {copy.postResponse}
      </button>
    </form>
  );
}

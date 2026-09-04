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
    <form action={createResponse} className="space-y-4">
      <input type="hidden" name="idea_id" value={ideaId} />
      <input type="hidden" name="source_language" value={locale} />
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.writeResponse}</span>
        <textarea required minLength={2} maxLength={4000} name="body" rows={4} className="field" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="can_help" className="size-4 accent-brand-red" />
        {copy.canHelp}
      </label>
      <button type="submit" className="btn btn-red">
        {copy.postResponse}
      </button>
    </form>
  );
}

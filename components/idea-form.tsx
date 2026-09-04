import { createIdea } from "@/lib/actions/ideas";
import { IDEA_CATEGORIES, type UiCopy } from "@/lib/i18n";
import type { ContentLanguage } from "@/lib/types";

export function IdeaForm({
  copy,
  locale,
  error,
}: {
  copy: UiCopy;
  locale: ContentLanguage;
  error?: string;
}) {
  return (
    <form action={createIdea} className="space-y-5">
      {error ? (
        <p className="bg-brand-yellow/40 px-3 py-2 text-sm">
          {error === "validation"
            ? locale === "zh"
              ? "标题和说明再写完整一点。"
              : "Add a longer title and description."
            : locale === "zh"
              ? "没保存成功，请再试一次。"
              : "Could not save this. Try again."}
        </p>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.title}</span>
        <input required minLength={3} maxLength={160} name="title" className="field" />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.description}</span>
        <textarea
          required
          minLength={10}
          maxLength={8000}
          name="body"
          rows={8}
          className="field"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.helpNeeded}</span>
        <textarea name="help_needed" maxLength={1000} rows={3} className="field" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold">{copy.category}</span>
          <select name="category" defaultValue="other" className="field">
            {IDEA_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {copy.categories[category]}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold">{copy.language}</span>
          <select name="source_language" defaultValue={locale} className="field">
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </label>
      </div>

      <button type="submit" className="btn btn-red">
        {copy.submitIdea}
      </button>
    </form>
  );
}

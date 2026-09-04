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
    <form action={createIdea} className="surface space-y-5 rounded-3xl p-6 sm:p-8">
      {error ? (
        <p className="rounded-2xl bg-danger/15 px-4 py-3 text-sm text-danger">
          {error === "validation"
            ? locale === "zh"
              ? "请填写更完整的标题和描述。"
              : "Please add a longer title and description."
            : locale === "zh"
              ? "保存失败，请稍后重试。"
              : "Could not save this idea. Try again."}
        </p>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm text-muted-foreground">{copy.title}</span>
        <input
          required
          minLength={3}
          maxLength={160}
          name="title"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none ring-ring focus:ring-2"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-muted-foreground">{copy.description}</span>
        <textarea
          required
          minLength={10}
          maxLength={8000}
          name="body"
          rows={8}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none ring-ring focus:ring-2"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-muted-foreground">{copy.helpNeeded}</span>
        <textarea
          name="help_needed"
          maxLength={1000}
          rows={3}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none ring-ring focus:ring-2"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-muted-foreground">{copy.category}</span>
          <select
            name="category"
            defaultValue="other"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none ring-ring focus:ring-2"
          >
            {IDEA_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {copy.categories[category]}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-muted-foreground">{copy.language}</span>
          <select
            name="source_language"
            defaultValue={locale}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none ring-ring focus:ring-2"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110"
      >
        {copy.submitIdea}
      </button>
    </form>
  );
}

import Link from "next/link";
import type { UiCopy } from "@/lib/i18n";
import type { Idea } from "@/lib/types";

export function IdeaCard({ idea, copy }: { idea: Idea; copy: UiCopy }) {
  return (
    <article className="surface rounded-3xl p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className="rounded-full bg-muted px-2.5 py-1 text-foreground">
          {copy.categories[idea.category]}
        </span>
        <span>{new Date(idea.created_at).toLocaleDateString()}</span>
        <span>
          {idea.response_count ?? 0} {copy.responses}
        </span>
      </div>
      <h2 className="text-xl font-semibold tracking-tight">{idea.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">
        {idea.body}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {idea.profiles?.display_name ?? "WAB"}
        </p>
        <Link
          href={`/ideas/${idea.id}`}
          className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted"
        >
          {copy.readMore}
        </Link>
      </div>
    </article>
  );
}

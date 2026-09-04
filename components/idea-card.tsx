import Link from "next/link";
import type { UiCopy } from "@/lib/i18n";
import type { Idea, IdeaCategory } from "@/lib/types";

const categoryColor: Record<IdeaCategory, string> = {
  stem: "bg-wab-blue",
  arts: "bg-wab-purple",
  community: "bg-wab-teal",
  research: "bg-wab-red",
  entrepreneurship: "bg-wab-yellow",
  service: "bg-wab-cyan",
  other: "bg-muted-foreground",
};

export function IdeaCard({ idea, copy }: { idea: Idea; copy: UiCopy }) {
  return (
    <article className="panel p-5">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2 text-foreground">
          <span className={`swatch ${categoryColor[idea.category]}`} />
          {copy.categories[idea.category]}
        </span>
        <span>{new Date(idea.created_at).toLocaleDateString()}</span>
        <span>
          {idea.response_count ?? 0} {copy.responses}
        </span>
      </div>
      <h2 className="text-xl font-bold">{idea.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">
        {idea.body}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm">{idea.profiles?.display_name ?? "WAB"}</p>
        <Link href={`/ideas/${idea.id}`} className="text-sm font-semibold text-wab-red hover:underline">
          {copy.readMore}
        </Link>
      </div>
    </article>
  );
}

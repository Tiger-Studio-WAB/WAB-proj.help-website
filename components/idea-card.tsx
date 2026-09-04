import Link from "next/link";
import type { UiCopy } from "@/lib/i18n";
import type { Idea, IdeaCategory } from "@/lib/types";

const categoryColor: Record<IdeaCategory, string> = {
  stem: "bg-brand-blue",
  arts: "bg-brand-purple",
  community: "bg-brand-teal",
  research: "bg-brand-red",
  entrepreneurship: "bg-brand-yellow",
  service: "bg-brand-cyan",
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
        <p className="text-sm">{idea.profiles?.display_name ?? "Member"}</p>
        <Link href={`/ideas/${idea.id}`} className="text-sm font-semibold text-brand-red hover:underline">
          {copy.readMore}
        </Link>
      </div>
    </article>
  );
}

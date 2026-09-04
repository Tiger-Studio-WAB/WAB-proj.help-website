import Link from "next/link";
import { IdeaCard } from "@/components/idea-card";
import { requireSessionUser } from "@/lib/auth";
import { listIdeas } from "@/lib/data";
import { IDEA_CATEGORIES } from "@/lib/i18n";
import { getCopy } from "@/lib/locale";

export default async function IdeasPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await requireSessionUser();
  const { category } = await searchParams;
  const { copy } = await getCopy();
  const ideas = await listIdeas({ category });
  const active = category ?? "all";

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{copy.ideas}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{copy.tagline}</p>
        </div>
        <Link
          href="/ideas/new"
          className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {copy.publish}
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip href="/ideas" active={active === "all"} label="All" />
        {IDEA_CATEGORIES.map((item) => (
          <FilterChip
            key={item}
            href={`/ideas?category=${item}`}
            active={active === item}
            label={copy.categories[item]}
          />
        ))}
      </div>

      {ideas.length === 0 ? (
        <p className="surface rounded-3xl p-8 text-sm text-muted-foreground">
          {copy.emptyIdeas}
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} copy={copy} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-wider ${
        active ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"
      }`}
    >
      {label}
    </Link>
  );
}

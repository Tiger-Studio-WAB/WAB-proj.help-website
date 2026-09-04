import Link from "next/link";
import { IdeaCard } from "@/components/idea-card";
import { PageShell } from "@/components/page-shell";
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
    <PageShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold italic">{copy.ideas}</h1>
          <span className="rule-yellow mt-3" />
        </div>
        <Link href="/ideas/new" className="btn btn-red">
          {copy.publish}
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip href="/ideas" active={active === "all"} label={copy.all} />
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
        <p className="mt-8 text-muted-foreground">{copy.emptyIdeas}</p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} copy={copy} />
          ))}
        </div>
      )}
    </PageShell>
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
      className={`px-3 py-1.5 text-sm font-semibold ${
        active ? "bg-wab-red text-white" : "bg-muted hover:bg-wab-yellow"
      }`}
    >
      {label}
    </Link>
  );
}

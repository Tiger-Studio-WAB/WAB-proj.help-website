import Link from "next/link";
import { notFound } from "next/navigation";
import { ResponseForm } from "@/components/response-form";
import { TranslatePanel } from "@/components/translate-panel";
import { requireSessionUser } from "@/lib/auth";
import { getIdea, listResponses } from "@/lib/data";
import { getCopy } from "@/lib/locale";

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSessionUser();
  const { id } = await params;
  const [{ copy, locale }, idea] = await Promise.all([getCopy(), getIdea(id)]);
  if (!idea) notFound();

  const responses = await listResponses(idea.id);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link href="/ideas" className="text-sm text-muted-foreground hover:text-foreground">
        ← {copy.backToIdeas}
      </Link>

      <article className="surface space-y-5 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="rounded-full bg-muted px-2.5 py-1 text-foreground">
            {copy.categories[idea.category]}
          </span>
          <span>{idea.profiles?.display_name}</span>
          <span>{new Date(idea.created_at).toLocaleDateString()}</span>
        </div>
        <TranslatePanel
          entityType="idea"
          entityId={idea.id}
          sourceLanguage={idea.source_language}
          originalTitle={idea.title}
          originalBody={idea.body}
          originalHelpNeeded={idea.help_needed}
          copy={copy}
        />
      </article>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          {copy.responses} · {responses.length}
        </h2>
        {responses.length === 0 ? (
          <p className="text-sm text-muted-foreground">{copy.emptyResponses}</p>
        ) : (
          <div className="space-y-4">
            {responses.map((response) => (
              <article key={response.id} className="surface rounded-3xl p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {response.profiles?.display_name}
                  </span>
                  <span>{new Date(response.created_at).toLocaleDateString()}</span>
                  {response.can_help ? (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">
                      {copy.canHelp}
                    </span>
                  ) : null}
                </div>
                <TranslatePanel
                  entityType="response"
                  entityId={response.id}
                  sourceLanguage={response.source_language}
                  originalBody={response.body}
                  copy={copy}
                />
              </article>
            ))}
          </div>
        )}
        <ResponseForm ideaId={idea.id} copy={copy} locale={locale} />
      </section>
    </div>
  );
}

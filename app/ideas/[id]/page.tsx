import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
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
    <PageShell>
      <div className="mx-auto max-w-3xl space-y-10">
        <Link href="/ideas" className="text-sm font-semibold text-brand-red hover:underline">
          ← {copy.backToIdeas}
        </Link>

        <article className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {copy.categories[idea.category]} · {idea.profiles?.display_name} ·{" "}
            {new Date(idea.created_at).toLocaleDateString()}
          </p>
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
          <h2 className="text-xl font-bold">
            {copy.responses} · {responses.length}
          </h2>
          {responses.length === 0 ? (
            <p className="text-muted-foreground">{copy.emptyResponses}</p>
          ) : (
            <div className="space-y-6">
              {responses.map((response) => (
                <article key={response.id} className="border-t border-border pt-5">
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {response.profiles?.display_name}
                    </span>
                    {" · "}
                    {new Date(response.created_at).toLocaleDateString()}
                    {response.can_help ? ` · ${copy.canHelp}` : ""}
                  </p>
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
    </PageShell>
  );
}

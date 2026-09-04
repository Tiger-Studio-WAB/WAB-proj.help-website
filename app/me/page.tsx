import Link from "next/link";
import { IdeaCard } from "@/components/idea-card";
import { PageShell } from "@/components/page-shell";
import { requireSessionUser } from "@/lib/auth";
import { listIdeas, listMyResponses } from "@/lib/data";
import { getCopy } from "@/lib/locale";

export default async function MePage() {
  const user = await requireSessionUser();
  const { copy } = await getCopy();
  const [ideas, responses] = await Promise.all([
    listIdeas({ authorId: user.id }),
    listMyResponses(user.id),
  ]);

  return (
    <PageShell>
      <h1 className="text-3xl font-bold italic">{copy.myBoard}</h1>
      <span className="rule-yellow mt-3" />
      <p className="mt-4 text-sm text-muted-foreground">
        {copy.signedInAs} {user.email}
      </p>

      <section className="mt-10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{copy.ideas}</h2>
          <Link href="/ideas/new" className="text-sm font-semibold text-brand-red hover:underline">
            {copy.publish}
          </Link>
        </div>
        {ideas.length === 0 ? (
          <p className="text-muted-foreground">{copy.emptyIdeas}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} copy={copy} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-bold">{copy.responses}</h2>
        {responses.length === 0 ? (
          <p className="text-muted-foreground">{copy.emptyResponses}</p>
        ) : (
          <div className="space-y-4">
            {responses.map((response) => (
              <article key={response.id} className="border-t border-border pt-4">
                <p className="leading-7">{response.body}</p>
                <Link
                  href={`/ideas/${response.idea_id}`}
                  className="mt-2 inline-block text-sm font-semibold text-brand-red hover:underline"
                >
                  {copy.readMore}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

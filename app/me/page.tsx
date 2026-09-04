import Link from "next/link";
import { IdeaCard } from "@/components/idea-card";
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
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{copy.myBoard}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {copy.signedInAs} {user.email}
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{copy.ideas}</h2>
          <Link href="/ideas/new" className="text-sm text-primary hover:underline">
            {copy.publish}
          </Link>
        </div>
        {ideas.length === 0 ? (
          <p className="text-sm text-muted-foreground">{copy.emptyIdeas}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} copy={copy} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{copy.responses}</h2>
        {responses.length === 0 ? (
          <p className="text-sm text-muted-foreground">{copy.emptyResponses}</p>
        ) : (
          <div className="space-y-3">
            {responses.map((response) => (
              <article key={response.id} className="surface rounded-3xl p-5">
                <p className="text-sm leading-7">{response.body}</p>
                <Link
                  href={`/ideas/${response.idea_id}`}
                  className="mt-3 inline-block text-sm text-primary hover:underline"
                >
                  {copy.readMore}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

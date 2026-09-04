import Link from "next/link";
import { IdeaForm } from "@/components/idea-form";
import { PageShell } from "@/components/page-shell";
import { requireSessionUser } from "@/lib/auth";
import { getCopy } from "@/lib/locale";

export default async function NewIdeaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireSessionUser();
  const { error } = await searchParams;
  const { locale, copy } = await getCopy();

  return (
    <PageShell>
      <Link href="/ideas" className="text-sm font-semibold text-brand-red hover:underline">
        ← {copy.backToIdeas}
      </Link>
      <h1 className="mt-4 text-3xl font-bold italic">{copy.publish}</h1>
      <span className="rule-yellow mt-3" />
      <div className="mt-8 max-w-3xl">
        <IdeaForm copy={copy} locale={locale} error={error} />
      </div>
    </PageShell>
  );
}

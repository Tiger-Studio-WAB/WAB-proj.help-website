import Link from "next/link";
import { IdeaForm } from "@/components/idea-form";
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
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/ideas" className="text-sm text-muted-foreground hover:text-foreground">
        ← {copy.backToIdeas}
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">{copy.publish}</h1>
      <IdeaForm copy={copy} locale={locale} error={error} />
    </div>
  );
}

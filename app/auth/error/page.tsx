import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getCopy } from "@/lib/locale";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const { copy } = await getCopy();
  const message =
    reason === "domain"
      ? copy.domainError
      : reason === "setup"
        ? copy.setupNeeded
        : copy.authError;

  return (
    <PageShell>
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold italic">{copy.brand}</h1>
        <span className="rule-yellow mt-3" />
        <p className="mt-5 text-base leading-7">{message}</p>
        <Link href="/login" className="btn btn-red mt-6">
          {copy.signIn}
        </Link>
      </div>
    </PageShell>
  );
}

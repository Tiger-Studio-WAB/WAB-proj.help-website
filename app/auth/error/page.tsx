import Link from "next/link";
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
    <div className="mx-auto max-w-lg space-y-5">
      <h1 className="text-3xl font-semibold tracking-tight">{copy.brand}</h1>
      <p className="text-sm leading-7 text-muted-foreground">{message}</p>
      <Link
        href="/login"
        className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        {copy.signIn}
      </Link>
    </div>
  );
}

import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const { copy } = await getCopy();
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          {copy.heroEyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{copy.signIn}</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {copy.restricted}
        </p>
      </div>
      <div className="surface rounded-3xl p-6">
        <MicrosoftSignIn
          label={copy.signIn}
          nextPath={next}
          disabled={!configured}
        />
        {!configured ? (
          <p className="mt-4 text-sm text-danger">{copy.setupNeeded}</p>
        ) : null}
      </div>
    </div>
  );
}

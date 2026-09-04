import Link from "next/link";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { getSessionUser } from "@/lib/auth";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function HomePage() {
  const [{ copy }, user] = await Promise.all([getCopy(), getSessionUser()]);
  const configured = isSupabaseConfigured();

  return (
    <>
      <section className="wab-grid text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
          <p className="text-lg">{copy.heroLine}</p>
          <h1 className="mt-2 text-5xl font-bold italic sm:text-7xl">{copy.brand}</h1>
          <span className="rule-yellow mt-4" />
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">{copy.tagline}</p>
          <div className="mt-8">
            {user ? (
              <Link href="/ideas" className="btn btn-white">
                {copy.browseCta}
              </Link>
            ) : (
              <div className="max-w-sm">
                <MicrosoftSignIn
                  label={copy.signIn}
                  disabled={!configured}
                  theme="white"
                />
              </div>
            )}
          </div>
          {!configured && !user ? (
            <p className="mt-4 max-w-xl text-sm text-wab-yellow">{copy.setupNeeded}</p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-6 px-5 py-12">
        <HowRow color="bg-wab-red" text={copy.howPost} />
        <HowRow color="bg-wab-blue" text={copy.howReply} />
        <HowRow color="bg-wab-yellow" text={copy.howTranslate} />
      </section>
    </>
  );
}

function HowRow({ color, text }: { color: string; text: string }) {
  return (
    <p className="flex items-start gap-3 text-base leading-7">
      <span className={`swatch mt-1.5 ${color}`} />
      <span>{text}</span>
    </p>
  );
}

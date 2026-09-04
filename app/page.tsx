import Link from "next/link";
import { MicrosoftSignIn } from "@/components/microsoft-sign-in";
import { getSessionUser } from "@/lib/auth";
import { getCopy } from "@/lib/locale";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function HomePage() {
  const [{ copy }, user] = await Promise.all([getCopy(), getSessionUser()]);
  const configured = isSupabaseConfigured();

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {copy.heroEyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {copy.brand}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {copy.tagline}
          </p>
          <p className="text-sm text-muted-foreground">{copy.restricted}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {user ? (
              <Link
                href="/ideas"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                {copy.browseCta}
              </Link>
            ) : (
              <div className="w-full max-w-sm">
                <MicrosoftSignIn label={copy.signIn} disabled={!configured} />
              </div>
            )}
          </div>
          {!configured ? (
            <p className="max-w-xl text-sm text-danger">{copy.setupNeeded}</p>
          ) : null}
        </div>
        <div className="surface rounded-[2rem] p-8">
          <p className="text-sm leading-7 text-muted-foreground">
            {copy.featureTranslateBody}
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <p className="rounded-2xl bg-muted px-4 py-3">
              “Need a teammate who can film and edit a short documentary about
              campus waste.”
            </p>
            <p className="rounded-2xl bg-muted px-4 py-3">
              “需要一位能拍摄并剪辑校园垃圾主题短纪录片的同学。”
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          [copy.featurePublish, copy.featurePublishBody],
          [copy.featureRespond, copy.featureRespondBody],
          [copy.featureTranslate, copy.featureTranslateBody],
        ].map(([title, body]) => (
          <article key={title} className="surface rounded-3xl p-6">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

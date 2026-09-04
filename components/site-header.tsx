import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { SignOutButton } from "@/components/sign-out-button";
import type { ContentLanguage } from "@/lib/types";
import type { Profile } from "@/lib/types";
import type { UiCopy } from "@/lib/i18n";

export function SiteHeader({
  copy,
  locale,
  profile,
}: {
  copy: UiCopy;
  locale: ContentLanguage;
  profile: Profile | null;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href={profile ? "/ideas" : "/"} className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            W
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-wide">
              {copy.brand}
            </span>
            <span className="block text-xs text-muted-foreground">
              {copy.heroEyebrow}
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm sm:gap-3">
          {profile ? (
            <>
              <Link className="rounded-full px-3 py-1.5 hover:bg-muted" href="/ideas">
                {copy.ideas}
              </Link>
              <Link className="rounded-full px-3 py-1.5 hover:bg-muted" href="/me">
                {copy.myBoard}
              </Link>
              <Link
                className="hidden rounded-full bg-primary px-3 py-1.5 font-medium text-primary-foreground sm:inline"
                href="/ideas/new"
              >
                {copy.publish}
              </Link>
            </>
          ) : (
            <Link className="rounded-full px-3 py-1.5 hover:bg-muted" href="/login">
              {copy.signIn}
            </Link>
          )}
          <LanguageToggle locale={locale} />
          {profile ? <SignOutButton label={copy.signOut} /> : null}
        </nav>
      </div>
    </header>
  );
}

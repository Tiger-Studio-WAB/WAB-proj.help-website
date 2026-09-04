import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { SignOutButton } from "@/components/sign-out-button";
import type { UiCopy } from "@/lib/i18n";
import type { ContentLanguage, Profile } from "@/lib/types";

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
    <header className="bg-brand-red text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href={profile ? "/ideas" : "/"} className="text-lg font-bold text-white">
          {copy.brand}
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          {profile ? (
            <>
              <Link href="/ideas" className="hover:underline">
                {copy.ideas}
              </Link>
              <Link href="/me" className="hover:underline">
                {copy.myBoard}
              </Link>
              <Link href="/ideas/new" className="hidden hover:underline sm:inline">
                {copy.publish}
              </Link>
              <SignOutButton label={copy.signOut} />
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              {copy.signIn}
            </Link>
          )}
          <LanguageToggle locale={locale} />
        </nav>
      </div>
    </header>
  );
}

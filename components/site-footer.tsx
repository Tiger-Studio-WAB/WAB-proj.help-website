import type { UiCopy } from "@/lib/i18n";

export function SiteFooter({ copy }: { copy: UiCopy }) {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">{copy.brand}</p>
        <p className="text-white/70">{copy.restricted}</p>
      </div>
    </footer>
  );
}

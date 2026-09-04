import type { UiCopy } from "@/lib/i18n";

export function SiteFooter({ copy }: { copy: UiCopy }) {
  return (
    <footer className="bg-wab-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold">{copy.school}</p>
          <p className="mt-1 text-white/70">{copy.address}</p>
          <p className="text-white/70">+86 10 2618 5588</p>
        </div>
        <p className="text-white/70">{copy.restricted}</p>
      </div>
    </footer>
  );
}

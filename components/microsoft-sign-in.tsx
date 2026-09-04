import { signInWithMicrosoft } from "@/lib/actions/auth";

export function MicrosoftSignIn({
  label,
  nextPath,
  disabled,
}: {
  label: string;
  nextPath?: string;
  disabled?: boolean;
}) {
  return (
    <form action={signInWithMicrosoft}>
      {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MicrosoftMark />
        {label}
      </button>
    </form>
  );
}

function MicrosoftMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect fill="#F25022" x="0" y="0" width="7" height="7" />
      <rect fill="#7FBA00" x="9" y="0" width="7" height="7" />
      <rect fill="#00A4EF" x="0" y="9" width="7" height="7" />
      <rect fill="#FFB900" x="9" y="9" width="7" height="7" />
    </svg>
  );
}

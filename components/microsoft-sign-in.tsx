import { signInWithMicrosoft } from "@/lib/actions/auth";

export function MicrosoftSignIn({
  label,
  nextPath,
  disabled,
  theme = "red",
}: {
  label: string;
  nextPath?: string;
  disabled?: boolean;
  theme?: "red" | "white";
}) {
  return (
    <form action={signInWithMicrosoft}>
      {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
      <button
        type="submit"
        disabled={disabled}
        className={`btn w-full ${theme === "white" ? "btn-white" : "btn-red"}`}
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

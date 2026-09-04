import { signOut } from "@/lib/actions/auth";

export function SignOutButton({ label }: { label: string }) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        {label}
      </button>
    </form>
  );
}

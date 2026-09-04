import { signOut } from "@/lib/actions/auth";

export function SignOutButton({ label }: { label: string }) {
  return (
    <form action={signOut}>
      <button type="submit" className="hover:underline">
        {label}
      </button>
    </form>
  );
}

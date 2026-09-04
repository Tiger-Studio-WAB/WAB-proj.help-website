import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold italic">Not found</h1>
      <span className="rule-yellow mt-3" />
      <p className="mt-5">That page is not on Proj.Help.</p>
      <Link href="/" className="mt-4 inline-block font-semibold text-brand-red hover:underline">
        Home
      </Link>
    </PageShell>
  );
}

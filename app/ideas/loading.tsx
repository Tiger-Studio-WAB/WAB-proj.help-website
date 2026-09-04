import { PageShell } from "@/components/page-shell";

export default function LoadingIdeas() {
  return (
    <PageShell>
      <div className="h-10 w-40 bg-muted" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="h-40 bg-muted" />
        <div className="h-40 bg-muted" />
      </div>
    </PageShell>
  );
}

export default function LoadingIdeas() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-48 animate-pulse rounded-full bg-muted" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="h-48 animate-pulse rounded-3xl bg-muted" />
        <div className="h-48 animate-pulse rounded-3xl bg-muted" />
      </div>
    </div>
  );
}

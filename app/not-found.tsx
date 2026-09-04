import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="text-sm text-muted-foreground">
        That page is not part of WAB Proj.Help.
      </p>
      <Link href="/" className="text-sm text-primary hover:underline">
        Back home
      </Link>
    </div>
  );
}

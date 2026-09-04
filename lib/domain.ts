export const WAB_EMAIL_DOMAIN = "wab.edu";

export function isWabEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return normalized.endsWith(`@${WAB_EMAIL_DOMAIN}`);
}

export function isAzureProvider(provider: string | null | undefined): boolean {
  return provider === "azure";
}

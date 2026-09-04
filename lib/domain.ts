// School Microsoft accounts only. The domain is not shown in the UI.
export const ALLOWED_EMAIL_DOMAIN = "wab.edu";

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return normalized.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}

export function isAzureProvider(provider: string | null | undefined): boolean {
  return provider === "azure";
}

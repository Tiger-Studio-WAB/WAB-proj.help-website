import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { getProfile } from "@/lib/auth";
import { getCopy } from "@/lib/locale";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "WAB Proj.Help",
    template: "%s · WAB Proj.Help",
  },
  description:
    "Publish project ideas, get help from the WAB community, and read replies in English or Chinese. Microsoft sign-in for @wab.edu only.",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const [{ locale, copy }, profile] = await Promise.all([getCopy(), getProfile()]);

  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSc.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader copy={copy} locale={locale} profile={profile} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">{children}</main>
        <footer className="border-t border-border/80 px-5 py-6 text-center text-xs text-muted-foreground">
          {copy.restricted}
        </footer>
      </body>
    </html>
  );
}

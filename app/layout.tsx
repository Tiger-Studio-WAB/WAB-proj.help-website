import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Noto_Sans_SC } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProfile } from "@/lib/auth";
import { getCopy } from "@/lib/locale";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Proj.Help",
    template: "%s · Proj.Help",
  },
  description:
    "Post project ideas, get replies, and translate between English and Chinese. Microsoft sign-in for school accounts only.",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const [{ locale, copy }, profile] = await Promise.all([getCopy(), getProfile()]);

  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      className={`${geistSans.variable} ${notoSansSc.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader copy={copy} locale={locale} profile={profile} />
        <main className="flex-1">{children}</main>
        <SiteFooter copy={copy} />
      </body>
    </html>
  );
}

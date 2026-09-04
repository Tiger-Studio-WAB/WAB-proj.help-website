import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_SC } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProfile } from "@/lib/auth";
import { getCopy } from "@/lib/locale";
import "./globals.css";

const codec = localFont({
  src: [
    {
      path: "../public/fonts/Codec-Pro-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Codec-Pro-Variable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-codec",
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Proj.Help · Western Academy of Beijing",
    template: "%s · Proj.Help",
  },
  description:
    "WAB board for project ideas, replies, and English/Chinese translation. Microsoft sign-in for @wab.edu only.",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const [{ locale, copy }, profile] = await Promise.all([getCopy(), getProfile()]);

  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      className={`${codec.variable} ${notoSansSc.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader copy={copy} locale={locale} profile={profile} />
        <main className="flex-1">{children}</main>
        <SiteFooter copy={copy} />
      </body>
    </html>
  );
}

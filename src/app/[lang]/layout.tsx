import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { DotField } from "@/components/DotField";
import "../globals.css";
import { getDictionary, hasLocale, locales } from "./dictionaries";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { languages: { en: "/en", es: "/es" } },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${dmSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint:
            - after a language switch, skip the intro animations
            - keep scroll restoration on "manual" (the browser reads it on the next reload) and
              on a plain reload without #anchor, start at the top */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("lang-switch")){document.documentElement.dataset.switched="true";sessionStorage.removeItem("lang-switch")}}catch(e){}try{history.scrollRestoration="manual";var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"&&!location.hash){window.scrollTo(0,0);addEventListener("load",function(){window.scrollTo(0,0)})}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <DotField />
        {children}
      </body>
    </html>
  );
}

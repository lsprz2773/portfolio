import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Header
        lang={lang}
        name={`${dict.hero.firstName} ${dict.hero.lastName.split(" ")[0]}`}
        dict={dict.nav}
      />
      <main className="page-in">
        <Hero dict={dict} />
        <Work dict={dict.work} />
        <Services dict={dict.services} />
        <Experience dict={dict.experience} />
        <Skills dict={dict.skills} />
        <Contact dict={dict.contact} pending={dict.common.pending} />
      </main>
    </>
  );
}

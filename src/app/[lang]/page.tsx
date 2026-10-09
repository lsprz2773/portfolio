import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <main className="p-16">
      <p>{dict.hero.hello}</p>
      <h1 className="text-6xl font-bold">
        {dict.hero.firstName} {dict.hero.lastName}
      </h1>
    </main>
  );
}

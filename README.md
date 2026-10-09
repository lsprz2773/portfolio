# Portfolio of Luis Angel Perez Aguilera

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS. Deployed on Vercel.

## Branches

- `main`: deployment. Not touched directly.
- `dev`: development.

Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/en`; Spanish is at `/es`.

## Where to fill in the pending content

- **Contact links, CV, photo and skills:** `src/content/profile.ts`. Values set to `null` or `[]` show a "coming soon" label.
  - CV: put the PDF in `public/cv/` and set `cvPath`.
  - Photo: put the image in `public/images/` and set `photoPath`.
- **Texts (projects, services, experience):** `src/app/[lang]/dictionaries/en.json` and `es.json`. Keep both files in sync.

## Languages

English is the default and Spanish is secondary. Adding a language means adding its JSON file, registering it in `src/app/[lang]/dictionaries.ts` and adding it to `locales` in `src/proxy.ts`.

## Design

References are listed in `docs/referencias/README.md`.

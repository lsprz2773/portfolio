// Personal data that does not depend on the language.
// `null` means the value is still pending; the UI shows a "coming soon" label.
export const profile = {
  email: "przls2773@gmail.com" as string | null,
  phone: "961 453 3787" as string | null,
  github: "https://github.com/lsprz2773" as string | null,
  linkedin: "https://www.linkedin.com/in/luis-p%C3%A9rez-7322a7393" as string | null,
  social: {
    facebook: {
      label: "Luis Perez",
      href: "https://www.facebook.com/share/1HZbu73HMj/?mibextid=wwXIfr" as string | null,
    },
    instagram: {
      label: "przls27",
      href: "https://instagram.com/przls27" as string | null,
    },
  },
  cvPath: "/cv/luis-angel-perez-aguilera-cv.pdf" as string | null,
  photoPath: "/luis-cutout.webp" as string | null,
  skills: {
    languages: ["Java", "TypeScript", "SQL", "JavaScript", "Kotlin"],
    tools: [
      "Next.js",
      "Nuxt.js",
      "Node.js",
      "Express.js",
      "Angular",
      "React",
      "Spring Boot",
      "Javalin",
      "Ktor",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "GitHub Actions",
      "Git",
    ],
  },
  // Same order as `work.items` in the dictionaries.
  projects: [
    {
      github: "https://github.com/AngelChame/readflow-frontend" as string | null,
      demo: "https://www.readflow.lat" as string | null,
      images: [
        "/projects/readflow/1.webp",
        "/projects/readflow/2.webp",
        "/projects/readflow/3.webp",
        "/projects/readflow/4.webp",
      ],
    },
    {
      github: "https://github.com/lsprz2773/BariaPlus_Frontend" as string | null,
      demo: null as string | null,
      images: [
        "/projects/bariaplus/1.webp",
        "/projects/bariaplus/2.webp",
        "/projects/bariaplus/3.webp",
        "/projects/bariaplus/4.webp",
        "/projects/bariaplus/5.webp",
      ],
    },
  ],
};

// Personal data that does not depend on the language.
// `null` means the value is still pending; the UI shows a "coming soon" label.
export const profile = {
  email: null as string | null,
  phone: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  cvPath: null as string | null, // e.g. "/cv/luis-angel-perez-aguilera.pdf" once the PDF is in /public
  photoPath: null as string | null, // e.g. "/images/profile.jpg" once the photo is in /public
  skills: {
    languages: [] as string[],
    tools: [] as string[],
  },
};

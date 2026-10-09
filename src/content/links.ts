import type { LinkItem } from "@/components/LinkList";
import { profile } from "./profile";

type ContactLabels = {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
};

/** Social networks shown next to the photo in the hero. */
export function socialLinks(labels: Pick<ContactLabels, "github" | "linkedin">): LinkItem[] {
  return [
    { label: labels.github, icon: "github", href: profile.github },
    { label: labels.linkedin, icon: "linkedin", href: profile.linkedin },
  ];
}

/** Full contact list for the contact section. */
export function contactLinks(labels: ContactLabels): LinkItem[] {
  return [
    { label: labels.github, href: profile.github },
    { label: labels.linkedin, href: profile.linkedin },
    {
      label: labels.email,
      href: profile.email ? `mailto:${profile.email}` : null,
      value: profile.email,
    },
    {
      label: labels.phone,
      href: profile.phone ? `tel:+52${profile.phone.replace(/\D/g, "")}` : null,
      value: profile.phone,
    },
  ];
}

import type { LinkItem } from "@/components/LinkList";
import { profile } from "./profile";

type ContactLabels = {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
};

/** Social networks shown next to the photo in the hero. Labels are names, not translated. */
export function socialLinks(): LinkItem[] {
  const { facebook, instagram } = profile.social;
  const phoneDigits = profile.phone?.replace(/\D/g, "");

  return [
    {
      label: profile.phone ?? "WhatsApp",
      icon: "whatsapp",
      ariaLabel: `WhatsApp: ${profile.phone ?? ""}`.trim(),
      href: phoneDigits ? `https://wa.me/52${phoneDigits}` : null,
    },
    { label: facebook.label, icon: "facebook", ariaLabel: `Facebook: ${facebook.label}`, href: facebook.href },
    { label: instagram.label, icon: "instagram", ariaLabel: `Instagram: ${instagram.label}`, href: instagram.href },
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

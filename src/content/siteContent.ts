import {
  BookOpen,
  Briefcase,
  CircleDot,
  Clock,
  Languages,
  Mail,
  MapPin,
  Scan,
  ShieldCheck,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import heroDoctorImage from "@/assets/images/hero-doctor-image.jpeg";
import preventiveIconImage from "@/assets/images/preventive-icon.png";
import extractionIconImage from "@/assets/images/extraction-icon.png";
import endodonticsIconImage from "@/assets/images/endodontics-icon.png";
import prosthodonticsIconImage from "@/assets/images/prosthodontics-icon.png";
import { type SiteContent, validateSiteContent } from "./siteContentSchema";
import { buildEditableContentFromTextFiles } from "./siteTextContent";
import siteSettingsText from "../../content/site-settings.txt?raw";
import homeText from "../../content/home.txt?raw";
import aboutText from "../../content/about.txt?raw";
import reviewsText from "../../content/reviews.txt?raw";
import contactText from "../../content/contact.txt?raw";

type TemplateValues = Record<string, string | number>;
const SCHEME_PATTERN = /^[a-z][a-z\d+.-]*:/i;

const lucideIconMap: Record<string, LucideIcon> = {
  Sparkles,
  CircleDot,
  ShieldCheck,
  Scan,
  Clock,
  BookOpen,
  Star,
  Mail,
  MapPin,
  Briefcase,
  Languages,
};

const imageAssetMap: Record<string, string> = {
  heroDoctorImage,
  preventiveIcon: preventiveIconImage,
  extractionIcon: extractionIconImage,
  endodonticsIcon: endodonticsIconImage,
  prosthodonticsIcon: prosthodonticsIconImage,
};

export interface Review {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  iconImage?: string;
  duration: string;
  benefits: string[];
  whoIsItFor: string;
}

function pickFirstNonEmpty(...values: Array<string | undefined | null>) {
  for (const value of values) {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        return trimmed;
      }
    }
  }
  return "";
}

function normalizeText(value: string) {
  return value.replace(/â€¢/g, ", ").trim();
}

function normalizeContent(rawContent: SiteContent): SiteContent {
  const primaryEmail = pickFirstNonEmpty(rawContent.doctorProfile.contact.email, rawContent.siteMeta.email);
  const primaryLocation = pickFirstNonEmpty(
    rawContent.doctorProfile.contact.cityStateCountry,
    rawContent.siteMeta.location,
  );
  const primaryRole = pickFirstNonEmpty(rawContent.doctorProfile.currentRole, rawContent.siteMeta.primaryRole);
  const languageSummary = rawContent.doctorProfile.languages.map((language) => normalizeText(language)).join(", ");
  const normalizedEmailHref = primaryEmail ? `mailto:${primaryEmail}` : "";

  return {
    ...rawContent,
    siteMeta: {
      ...rawContent.siteMeta,
      email: primaryEmail || rawContent.siteMeta.email,
      location: primaryLocation || rawContent.siteMeta.location,
      primaryRole: primaryRole || rawContent.siteMeta.primaryRole,
    },
    doctorProfile: {
      ...rawContent.doctorProfile,
      currentRole: primaryRole || rawContent.doctorProfile.currentRole,
      contact: {
        ...rawContent.doctorProfile.contact,
        email: primaryEmail || rawContent.doctorProfile.contact.email,
        cityStateCountry: primaryLocation || rawContent.doctorProfile.contact.cityStateCountry,
      },
      languages: rawContent.doctorProfile.languages.map((language) => normalizeText(language)),
    },
    layout: {
      ...rawContent.layout,
      navbar: {
        ...rawContent.layout.navbar,
        desktopEmailText: pickFirstNonEmpty(rawContent.layout.navbar.desktopEmailText, primaryEmail),
      },
      footer: {
        ...rawContent.layout.footer,
        details: rawContent.layout.footer.details.map((detail) => {
          if (detail.iconKey === "Mail") {
            return {
              ...detail,
              text: primaryEmail || normalizeText(detail.text),
              href: primaryEmail ? `mailto:${primaryEmail}` : (detail.href ?? ""),
            };
          }
          if (detail.iconKey === "MapPin") {
            return { ...detail, text: primaryLocation || normalizeText(detail.text) };
          }
          if (detail.iconKey === "Briefcase") {
            const clinicName = rawContent.doctorProfile.clinicName.trim();
            const combined = clinicName ? `${primaryRole} - ${clinicName}` : primaryRole;
            return { ...detail, text: combined || normalizeText(detail.text) };
          }
          if (detail.iconKey === "Languages") {
            return { ...detail, text: languageSummary || normalizeText(detail.text) };
          }
          return { ...detail, text: normalizeText(detail.text) };
        }),
      },
    },
    home: {
      ...rawContent.home,
      cta: {
        ...rawContent.home.cta,
        secondaryButton: {
          ...rawContent.home.cta.secondaryButton,
          href: pickFirstNonEmpty(rawContent.home.cta.secondaryButton.href, normalizedEmailHref),
          label: pickFirstNonEmpty(
            rawContent.home.cta.secondaryButton.label,
            primaryEmail ? `Email ${primaryEmail}` : "Email",
          ),
        },
      },
    },
    aboutPage: {
      ...rawContent.aboutPage,
      heroEmail: pickFirstNonEmpty(rawContent.aboutPage.heroEmail, primaryEmail),
      heroLocation: pickFirstNonEmpty(rawContent.aboutPage.heroLocation, primaryLocation),
    },
    contactPage: {
      ...rawContent.contactPage,
      contactInfo: rawContent.contactPage.contactInfo.map((item) => {
        if (item.iconKey === "Mail") {
          return {
            ...item,
            content: pickFirstNonEmpty(item.content, primaryEmail),
            href: pickFirstNonEmpty(item.href, normalizedEmailHref),
          };
        }
        if (item.iconKey === "MapPin") {
          return {
            ...item,
            content: pickFirstNonEmpty(item.content, primaryLocation),
          };
        }
        if (item.iconKey === "Briefcase") {
          return {
            ...item,
            content: pickFirstNonEmpty(item.content, primaryRole),
          };
        }
        if (item.iconKey === "Languages" && !item.content.trim()) {
          return {
            ...item,
            content: languageSummary,
          };
        }
        return {
          ...item,
          content: normalizeText(item.content),
        };
      }),
    },
  };
}

const content = normalizeContent(
  validateSiteContent(
    buildEditableContentFromTextFiles({
      "site-settings.txt": siteSettingsText,
      "home.txt": homeText,
      "about.txt": aboutText,
      "reviews.txt": reviewsText,
      "contact.txt": contactText,
    }),
  ),
);

export function getSiteContent() {
  return content;
}

export function getPrimaryEmail() {
  return content.siteMeta.email;
}

export function getPrimaryLocation() {
  return content.siteMeta.location;
}

export function getPrimaryRole() {
  return content.siteMeta.primaryRole;
}

export function getLanguageSummary() {
  return content.doctorProfile.languages.join(", ");
}

export function resolveTemplate(template: string, values: TemplateValues) {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value)),
    template
  );
}

export function resolveHref(href: string, fallbackHref = "/") {
  const trimmedHref = href.trim();
  if (!trimmedHref) {
    return fallbackHref;
  }

  if (trimmedHref.startsWith("/") || trimmedHref.startsWith("#") || trimmedHref.startsWith("//")) {
    return trimmedHref;
  }

  if (SCHEME_PATTERN.test(trimmedHref)) {
    return trimmedHref;
  }

  return `/${trimmedHref.replace(/^\/+/, "")}`;
}

export function isExternalHref(href: string) {
  const resolvedHref = resolveHref(href, "/");
  return resolvedHref.startsWith("//") || resolvedHref.startsWith("#") || SCHEME_PATTERN.test(resolvedHref);
}

export function getIconByKey(iconKey: string): LucideIcon {
  return lucideIconMap[iconKey] ?? Sparkles;
}

export function getImageByKey(imageKey?: string): string | undefined {
  if (!imageKey) {
    return undefined;
  }
  const configuredImage = content.assets?.images?.[imageKey];
  if (typeof configuredImage === "object" && configuredImage !== null && configuredImage.path) {
    return configuredImage.path;
  }
  const importKey =
    typeof configuredImage === "object" && configuredImage !== null
      ? configuredImage.importKey ?? imageKey
      : imageKey;
  return imageAssetMap[importKey];
}

export function getServices(): Service[] {
  return content.services.map((service) => ({
    id: service.id,
    title: service.title,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    icon: getIconByKey(service.iconKey),
    iconImage: getImageByKey(service.iconImageKey),
    duration: service.duration,
    benefits: service.benefits,
    whoIsItFor: service.whoIsItFor,
  }));
}

export function getFeaturedServices() {
  return getServices().slice(0, content.display.homeFeaturedServicesCount);
}

export function getReviews(): Review[] {
  return content.reviews;
}

export function getTreatmentTypes() {
  const treatments = Array.from(new Set(getReviews().map((review) => review.treatment)));
  return treatments.sort();
}

export function getAverageRating() {
  const reviews = getReviews();
  if (reviews.length === 0) {
    return 0;
  }
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export function getFeaturedReviews() {
  const { homeFeaturedTestimonialsCount, homeFeaturedTestimonialsMinRating } = content.display;
  return getReviews()
    .filter((review) => review.rating >= homeFeaturedTestimonialsMinRating)
    .slice(0, homeFeaturedTestimonialsCount);
}

export function getHomeHeroStats() {
  const reviews = getReviews();
  const averageRating = getAverageRating();

  return content.home.hero.stats.map((stat) => {
    if (stat.iconKey !== "Star") {
      return stat;
    }

    if (reviews.length === 0) {
      return {
        ...stat,
        value: "No Reviews Yet",
      };
    }

    return {
      ...stat,
      value: `${averageRating.toFixed(1)} Rating`,
    };
  });
}

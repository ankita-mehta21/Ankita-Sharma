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
import siteContentJson from "./site-content.json";
import heroDoctorImage from "../../Hero_Section_Image.jpeg";
import preventiveIconImage from "../../Preventive_Icon.png";
import extractionIconImage from "../../Extraction_Icon.png";
import endodonticsIconImage from "../../Endodontics_Icon.png";
import prosthodonticsIconImage from "../../Prosthodontics_Icon.png";

type TemplateValues = Record<string, string | number>;

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

type DashboardStat = {
  label: string;
  type: "totalReviews" | "static";
  value?: number;
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

type SiteContent = typeof siteContentJson;

const content: SiteContent = siteContentJson;

export function getSiteContent() {
  return content;
}

export function resolveTemplate(template: string, values: TemplateValues) {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value)),
    template
  );
}

export function getIconByKey(iconKey: string): LucideIcon {
  return lucideIconMap[iconKey] ?? Sparkles;
}

export function getImageByKey(imageKey?: string): string | undefined {
  if (!imageKey) {
    return undefined;
  }
  const configuredImage = content.assets?.images?.[imageKey];
  if (configuredImage?.path) {
    return configuredImage.path;
  }
  const importKey = configuredImage?.importKey ?? imageKey;
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

export function getAdminRecentReviews() {
  return getReviews().slice(0, content.display.adminRecentReviewsCount);
}

export function getAdminDashboardStats(): Array<{ label: string; value: number }> {
  return content.adminPage.dashboard.stats.map((stat: DashboardStat) => {
    if (stat.type === "totalReviews") {
      return { label: stat.label, value: getReviews().length };
    }
    return { label: stat.label, value: stat.value ?? 0 };
  });
}

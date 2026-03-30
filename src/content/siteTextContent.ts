import type { SiteContent } from "./siteContentSchema";

export const CONTENT_DIRECTORY = "content";

export const ROOT_CONTENT_FILE_NAMES = [
  "site-settings.txt",
  "home.txt",
  "about.txt",
  "reviews.txt",
  "contact.txt",
] as const;

export type RootContentFileName = (typeof ROOT_CONTENT_FILE_NAMES)[number];

export type TextContentFiles = Record<RootContentFileName, string>;

export function getContentFilePath(fileName: RootContentFileName) {
  return `${CONTENT_DIRECTORY}/${fileName}`;
}

export interface ParsedSectionedTextFile {
  labels: Record<string, string>;
  sections: Record<string, string>;
}

const LABEL_PATTERN = /^([A-Z0-9_]+):(.*)$/;
const SECTION_PATTERN = /^\[([A-Z0-9_]+)\]$/;
const BLOCK_SEPARATOR = /^---$/;

const STATIC_ASSETS: SiteContent["assets"] = {
  images: {
    heroDoctorImage: {
      importKey: "heroDoctorImage",
      path: "",
      alt: "Dr. Ankita Sharma",
    },
    preventiveIcon: {
      importKey: "preventiveIcon",
      path: "",
      alt: "Preventive and restorative care icon",
    },
    extractionIcon: {
      importKey: "extractionIcon",
      path: "",
      alt: "Extraction and emergency care icon",
    },
    endodonticsIcon: {
      importKey: "endodonticsIcon",
      path: "",
      alt: "Endodontic therapy icon",
    },
    prosthodonticsIcon: {
      importKey: "prosthodonticsIcon",
      path: "",
      alt: "Dentures and prosthodontics icon",
    },
    seoOgImage: {
      importKey: "heroDoctorImage",
      path: "",
      alt: "Portfolio preview image",
    },
  },
};

const STATIC_LAYOUT_CONFIG: SiteContent["layoutConfig"] = {
  homeServices: {
    gridClassName: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
    cardClassName: "group glass-card rounded-2xl p-6 hover-lift h-full text-center flex flex-col items-center",
    iconContainerClassName: "w-16 h-16 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110",
    iconImageClassName: "w-full h-full object-contain",
    iconFallbackClassName: "w-14 h-14 text-primary",
    descriptionClassName: "text-sm text-muted-foreground line-clamp-3",
  },
  reviewsPage: {
    gridClassName: "grid md:grid-cols-2 gap-6 pb-16",
  },
};

const STATIC_ADMIN_PAGE: SiteContent["adminPage"] = {
  login: {
    title: "Portfolio Admin",
    subtitle: "Sign in to review submissions",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    submitLabel: "Sign In",
    welcomeToastTitle: "Welcome!",
    welcomeToastDescription: "You're now logged in.",
  },
  dashboard: {
    title: "Review Management",
    logoutLabel: "Logout",
    stats: [
      { label: "Total Reviews", type: "totalReviews" },
      { label: "Pending Approval", type: "static", value: 3 },
      { label: "New Messages", type: "static", value: 5 },
    ],
    recentReviewsTitle: "Recent Reviews",
  },
};

const STATIC_NOT_FOUND_PAGE: SiteContent["notFoundPage"] = {
  code: "404",
  title: "Oops! Page not found",
  homeLinkLabel: "Return to Home",
  homeLinkHref: "/",
};

const STATIC_REVIEWS_PLACEHOLDER: SiteContent["reviewsPlaceholder"] = {
  id: "example-id",
  name: "Patient Name",
  treatment: "Treatment Name",
  rating: 5,
  review: "Write the patient review text here.",
  date: "YYYY-MM-DD",
  verified: true,
};

function normalizeNewlines(value: string) {
  return value.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function dedentBlock(value: string) {
  const lines = normalizeNewlines(value).split("\n");
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const match = line.match(/^[ \t]*/);
      return match ? match[0].length : 0;
    });

  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  if (minIndent === 0) {
    return value;
  }

  return lines.map((line) => line.slice(minIndent)).join("\n");
}

function trimSectionLines(lines: string[]) {
  let start = 0;
  let end = lines.length;

  while (start < end && lines[start].trim() === "") {
    start += 1;
  }
  while (end > start && lines[end - 1].trim() === "") {
    end -= 1;
  }

  return lines.slice(start, end).join("\n");
}

export function parseSectionedTextFile(fileName: string, rawText: string): ParsedSectionedTextFile {
  const labels: Record<string, string> = {};
  const sections: Record<string, string[]> = {};
  let currentSection: string | null = null;

  const lines = normalizeNewlines(rawText).split("\n");

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const isIndented = /^[ \t]/.test(line);

    if (trimmed.startsWith("#")) {
      return;
    }

    if (!currentSection && trimmed === "") {
      return;
    }

    const sectionMatch = !isIndented ? trimmed.match(SECTION_PATTERN) : null;
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      sections[currentSection] = [];
      return;
    }

    const labelMatch = !currentSection && !isIndented ? line.match(LABEL_PATTERN) : null;
    if (labelMatch) {
      labels[labelMatch[1]] = labelMatch[2].trim();
      return;
    }

    if (currentSection) {
      sections[currentSection].push(line);
      return;
    }

    throw new Error(`${fileName}:${index + 1} could not be parsed. Use LABEL: value or [SECTION_NAME].`);
  });

  return {
    labels,
    sections: Object.fromEntries(
      Object.entries(sections).map(([sectionName, sectionLines]) => [sectionName, trimSectionLines(sectionLines)]),
    ),
  };
}

export function parseRepeatedBlocks(fileName: string, sectionName: string, rawSectionValue: string) {
  const normalized = normalizeNewlines(rawSectionValue).trim();
  if (!normalized) {
    return [];
  }

  const lines = normalized.split("\n");
  const blocks: string[] = [];
  let currentLines: string[] = [];

  lines.forEach((line) => {
    if (BLOCK_SEPARATOR.test(line.trim())) {
      const blockText = trimSectionLines(currentLines);
      if (blockText) {
        blocks.push(blockText);
      }
      currentLines = [];
      return;
    }

    currentLines.push(line);
  });

  const lastBlock = trimSectionLines(currentLines);
  if (lastBlock) {
    blocks.push(lastBlock);
  }

  return blocks.map((blockText, index) =>
    parseSectionedTextFile(`${fileName}:${sectionName}[${index}]`, dedentBlock(blockText)),
  );
}

function getRequiredLabel(parsed: ParsedSectionedTextFile, fileName: string, key: string) {
  const value = parsed.labels[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fileName}: missing required label ${key}`);
  }
  return value.trim();
}

function getOptionalLabel(parsed: ParsedSectionedTextFile, key: string) {
  return parsed.labels[key]?.trim() ?? "";
}

function getRequiredSection(parsed: ParsedSectionedTextFile, fileName: string, key: string) {
  const value = parsed.sections[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fileName}: missing required section [${key}]`);
  }
  return value.trim();
}

function getOptionalSection(parsed: ParsedSectionedTextFile, key: string) {
  return parsed.sections[key]?.trim() ?? "";
}

function parseListSection(rawSectionValue: string) {
  return normalizeNewlines(rawSectionValue)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .map((line) => line.replace(/^- /, "").trim());
}

function parseBooleanLabel(parsed: ParsedSectionedTextFile, fileName: string, key: string, fallback = false) {
  const rawValue = parsed.labels[key];
  if (typeof rawValue !== "string" || rawValue.trim() === "") {
    return fallback;
  }

  const normalized = rawValue.trim().toLowerCase();
  if (normalized === "true") {
    return true;
  }
  if (normalized === "false") {
    return false;
  }
  throw new Error(`${fileName}: ${key} must be true or false`);
}

function parseNumberLabel(parsed: ParsedSectionedTextFile, fileName: string, key: string, fallback?: number) {
  const rawValue = parsed.labels[key];
  if (typeof rawValue !== "string" || rawValue.trim() === "") {
    if (typeof fallback === "number") {
      return fallback;
    }
    throw new Error(`${fileName}: missing required numeric label ${key}`);
  }

  const value = Number(rawValue.trim());
  if (Number.isNaN(value)) {
    throw new Error(`${fileName}: ${key} must be a number`);
  }
  return value;
}

function parsePipeList(rawSectionValue: string, expectedParts: number, fileName: string, sectionName: string) {
  return parseListSection(rawSectionValue).map((entry, index) => {
    const parts = entry.split("|").map((part) => part.trim());
    if (parts.length !== expectedParts || parts.some((part) => part.length === 0)) {
      throw new Error(`${fileName}: [${sectionName}] entry ${index + 1} must contain ${expectedParts} pipe-delimited values`);
    }
    return parts;
  });
}

function buildFooterDetails(primaryRole: string, clinicName: string, location: string, email: string, languages: string[]) {
  const combinedRole = clinicName.trim() ? `${primaryRole} - ${clinicName}` : primaryRole;
  return [
    { iconKey: "MapPin", text: location },
    { iconKey: "Briefcase", text: combinedRole },
    { iconKey: "Languages", text: languages.join(", ") },
    { iconKey: "Mail", text: email, href: email ? `mailto:${email}` : "" },
  ];
}

function buildContactInfo(primaryRole: string, clinicName: string, location: string, email: string, languages: string[]) {
  const combinedRole = clinicName.trim() ? `${primaryRole} - ${clinicName}` : primaryRole;
  return [
    { iconKey: "Mail", title: "Email", content: email, href: email ? `mailto:${email}` : "" },
    { iconKey: "MapPin", title: "Location", content: location },
    { iconKey: "Briefcase", title: "Current Role", content: combinedRole },
    { iconKey: "Languages", title: "Languages", content: languages.join(", ") },
  ];
}

export function buildEditableContentFromTextFiles(rawFiles: TextContentFiles): SiteContent {
  const settings = parseSectionedTextFile("site-settings.txt", rawFiles["site-settings.txt"]);
  const home = parseSectionedTextFile("home.txt", rawFiles["home.txt"]);
  const about = parseSectionedTextFile("about.txt", rawFiles["about.txt"]);
  const reviews = parseSectionedTextFile("reviews.txt", rawFiles["reviews.txt"]);
  const contact = parseSectionedTextFile("contact.txt", rawFiles["contact.txt"]);

  const primaryRole = getRequiredLabel(settings, "site-settings.txt", "PRIMARY_ROLE");
  const email = getRequiredLabel(settings, "site-settings.txt", "EMAIL");
  const location = getRequiredLabel(settings, "site-settings.txt", "LOCATION");
  const clinicName = getOptionalLabel(settings, "CLINIC_NAME");
  const languageSummary = parseListSection(getRequiredSection(settings, "site-settings.txt", "LANGUAGE_SUMMARY"));

  const navLinks = parsePipeList(
    getRequiredSection(settings, "site-settings.txt", "NAV_LINKS"),
    2,
    "site-settings.txt",
    "NAV_LINKS",
  ).map(([href, label]) => ({ href, label }));

  const heroStats = parsePipeList(
    getRequiredSection(home, "home.txt", "HERO_STATS"),
    3,
    "home.txt",
    "HERO_STATS",
  ).map(([iconKey, value, label]) => ({ iconKey, value, label }));

  const services = parseRepeatedBlocks("home.txt", "SERVICES", getRequiredSection(home, "home.txt", "SERVICES")).map(
    (block) => ({
      id: getRequiredLabel(block, "home.txt:[SERVICES]", "ID"),
      title: getRequiredLabel(block, "home.txt:[SERVICES]", "TITLE"),
      shortDescription: getRequiredLabel(block, "home.txt:[SERVICES]", "SHORT_DESCRIPTION"),
      fullDescription: getRequiredLabel(block, "home.txt:[SERVICES]", "FULL_DESCRIPTION"),
      iconKey: getRequiredLabel(block, "home.txt:[SERVICES]", "ICON_KEY"),
      iconImageKey: getOptionalLabel(block, "ICON_IMAGE_KEY") || undefined,
      duration: getRequiredLabel(block, "home.txt:[SERVICES]", "DURATION"),
      benefits: parseListSection(getRequiredSection(block, "home.txt:[SERVICES]", "BENEFITS")),
      whoIsItFor: getRequiredLabel(block, "home.txt:[SERVICES]", "WHO_IS_IT_FOR"),
    }),
  );

  const education = parseRepeatedBlocks(
    "about.txt",
    "EDUCATION",
    getRequiredSection(about, "about.txt", "EDUCATION"),
  ).map((block) => ({
    degree: getRequiredLabel(block, "about.txt:[EDUCATION]", "DEGREE"),
    school: getRequiredLabel(block, "about.txt:[EDUCATION]", "SCHOOL"),
    location: getRequiredLabel(block, "about.txt:[EDUCATION]", "LOCATION"),
  }));

  const experienceRoles = parseRepeatedBlocks(
    "about.txt",
    "EXPERIENCE_ROLES",
    getRequiredSection(about, "about.txt", "EXPERIENCE_ROLES"),
  ).map((block) => ({
    dates: getOptionalLabel(block, "DATES"),
    role: getRequiredLabel(block, "about.txt:[EXPERIENCE_ROLES]", "ROLE"),
    organization: getRequiredLabel(block, "about.txt:[EXPERIENCE_ROLES]", "ORGANIZATION"),
    location: getRequiredLabel(block, "about.txt:[EXPERIENCE_ROLES]", "LOCATION"),
    bullets: parseListSection(getOptionalSection(block, "BULLETS")),
  }));

  const languageDetails = parseRepeatedBlocks(
    "about.txt",
    "LANGUAGES",
    getRequiredSection(about, "about.txt", "LANGUAGES"),
  ).map((block) => ({
    language: getRequiredLabel(block, "about.txt:[LANGUAGES]", "LANGUAGE"),
    level: getRequiredLabel(block, "about.txt:[LANGUAGES]", "LEVEL"),
  }));

  const reviewEntries = parseRepeatedBlocks("reviews.txt", "REVIEWS", getOptionalSection(reviews, "REVIEWS")).map((block) => ({
    id: getRequiredLabel(block, "reviews.txt:[REVIEWS]", "ID"),
    name: getRequiredLabel(block, "reviews.txt:[REVIEWS]", "NAME"),
    treatment: getRequiredLabel(block, "reviews.txt:[REVIEWS]", "TREATMENT"),
    rating: parseNumberLabel(block, "reviews.txt:[REVIEWS]", "RATING"),
    review: getRequiredSection(block, "reviews.txt:[REVIEWS]", "REVIEW"),
    date: getRequiredLabel(block, "reviews.txt:[REVIEWS]", "DATE"),
    verified: parseBooleanLabel(block, "reviews.txt:[REVIEWS]", "VERIFIED"),
  }));

  return {
    siteMeta: {
      brandName: getRequiredLabel(settings, "site-settings.txt", "BRAND_NAME"),
      brandInitials: getRequiredLabel(settings, "site-settings.txt", "BRAND_INITIALS"),
      primaryRole,
      email,
      location,
    },
    doctorProfile: {
      fullName: getRequiredLabel(settings, "site-settings.txt", "FULL_NAME"),
      credentials: getRequiredLabel(settings, "site-settings.txt", "CREDENTIALS"),
      headline: getRequiredLabel(settings, "site-settings.txt", "HEADLINE"),
      specialties: parseListSection(getRequiredSection(settings, "site-settings.txt", "SPECIALTIES")),
      clinicName,
      currentRole: primaryRole,
      contact: {
        email,
        phone: getOptionalLabel(settings, "PHONE"),
        addressLine1: getOptionalLabel(settings, "ADDRESS_LINE_1"),
        cityStateCountry: location,
      },
      languages: languageSummary,
    },
    assets: STATIC_ASSETS,
    externalLinks: {
      reviewForm: getOptionalLabel(settings, "REVIEW_FORM_URL"),
      website: getOptionalLabel(settings, "WEBSITE_URL"),
      linkedin: getOptionalLabel(settings, "LINKEDIN_URL"),
      instagram: getOptionalLabel(settings, "INSTAGRAM_URL"),
      facebook: getOptionalLabel(settings, "FACEBOOK_URL"),
      x: getOptionalLabel(settings, "X_URL"),
      youtube: getOptionalLabel(settings, "YOUTUBE_URL"),
    },
    seo: {
      defaultTitle: getRequiredLabel(settings, "site-settings.txt", "DEFAULT_TITLE"),
      titleTemplate: getRequiredLabel(settings, "site-settings.txt", "TITLE_TEMPLATE"),
      defaultDescription: getRequiredLabel(settings, "site-settings.txt", "DEFAULT_DESCRIPTION"),
      keywords: parseListSection(getRequiredSection(settings, "site-settings.txt", "SEO_KEYWORDS")),
      openGraphImageAssetKey: getRequiredLabel(settings, "site-settings.txt", "OPEN_GRAPH_IMAGE_ASSET_KEY"),
    },
    visibility: {
      showTestimonialsSection: parseBooleanLabel(settings, "site-settings.txt", "SHOW_TESTIMONIALS_SECTION", true),
      showReviewsPageShareCta: parseBooleanLabel(settings, "site-settings.txt", "SHOW_REVIEWS_SHARE_CTA", true),
      showAdminPage: false,
      showLanguagesSection: parseBooleanLabel(settings, "site-settings.txt", "SHOW_LANGUAGES_SECTION", false),
    },
    display: {
      homeFeaturedServicesCount: parseNumberLabel(settings, "site-settings.txt", "HOME_FEATURED_SERVICES_COUNT", 4),
      homeFeaturedTestimonialsCount: parseNumberLabel(
        settings,
        "site-settings.txt",
        "HOME_FEATURED_TESTIMONIALS_COUNT",
        5,
      ),
      homeFeaturedTestimonialsMinRating: parseNumberLabel(
        settings,
        "site-settings.txt",
        "HOME_FEATURED_TESTIMONIALS_MIN_RATING",
        5,
      ),
      adminRecentReviewsCount: 5,
    },
    layoutConfig: STATIC_LAYOUT_CONFIG,
    layout: {
      navbar: {
        navLinks,
        desktopEmailText: "",
        desktopCtaLabel: getRequiredLabel(settings, "site-settings.txt", "NAV_DESKTOP_CTA_LABEL"),
        mobileCtaLabel: getRequiredLabel(settings, "site-settings.txt", "NAV_MOBILE_CTA_LABEL"),
        mobileMenuAriaLabel: getRequiredLabel(settings, "site-settings.txt", "NAV_MOBILE_MENU_ARIA_LABEL"),
      },
      footer: {
        summary: getRequiredLabel(settings, "site-settings.txt", "FOOTER_SUMMARY"),
        primaryCta: {
          href: getRequiredLabel(settings, "site-settings.txt", "FOOTER_PRIMARY_CTA_LINK"),
          label: getRequiredLabel(settings, "site-settings.txt", "FOOTER_PRIMARY_CTA_LABEL"),
        },
        secondaryCta: {
          href: getRequiredLabel(settings, "site-settings.txt", "FOOTER_SECONDARY_CTA_LINK"),
          label: getRequiredLabel(settings, "site-settings.txt", "FOOTER_SECONDARY_CTA_LABEL"),
        },
        detailsTitle: getRequiredLabel(settings, "site-settings.txt", "FOOTER_DETAILS_TITLE"),
        details: buildFooterDetails(primaryRole, clinicName, location, email, languageSummary),
        bottomLink: {
          href: getRequiredLabel(settings, "site-settings.txt", "FOOTER_BOTTOM_LINK"),
          label: getRequiredLabel(settings, "site-settings.txt", "FOOTER_BOTTOM_LINK_LABEL"),
        },
        copyrightTemplate: getRequiredLabel(settings, "site-settings.txt", "COPYRIGHT_TEMPLATE"),
      },
    },
    home: {
      hero: {
        badgeText: getRequiredLabel(home, "home.txt", "HERO_BADGE_TEXT"),
        titlePrefix: getRequiredLabel(home, "home.txt", "HERO_TITLE_PREFIX"),
        titleHighlight: getRequiredLabel(home, "home.txt", "HERO_TITLE_HIGHLIGHT"),
        description: getRequiredSection(home, "home.txt", "HERO_DESCRIPTION"),
        primaryButton: {
          href: getRequiredLabel(home, "home.txt", "HERO_PRIMARY_BUTTON_LINK"),
          label: getRequiredLabel(home, "home.txt", "HERO_PRIMARY_BUTTON_LABEL"),
        },
        secondaryButton: {
          href: getRequiredLabel(home, "home.txt", "HERO_SECONDARY_BUTTON_LINK"),
          label: getRequiredLabel(home, "home.txt", "HERO_SECONDARY_BUTTON_LABEL"),
        },
        stats: heroStats,
        doctorImageAssetKey: getRequiredLabel(home, "home.txt", "HERO_DOCTOR_IMAGE_ASSET_KEY"),
        doctorImageAlt: getRequiredLabel(home, "home.txt", "HERO_DOCTOR_IMAGE_ALT"),
        profileCard: {
          name: getRequiredLabel(home, "home.txt", "PROFILE_CARD_NAME"),
          credentials: getRequiredLabel(home, "home.txt", "PROFILE_CARD_CREDENTIALS"),
          tags: parseListSection(getRequiredSection(home, "home.txt", "PROFILE_CARD_TAGS")),
        },
        floatingReviewCard: {
          avatarLetters: parseListSection(getRequiredSection(home, "home.txt", "FLOATING_REVIEW_AVATARS")),
          starCount: parseNumberLabel(home, "home.txt", "FLOATING_REVIEW_STAR_COUNT", 5),
          label: getRequiredLabel(home, "home.txt", "FLOATING_REVIEW_LABEL"),
        },
      },
      areasOfPractice: {
        badge: getRequiredLabel(home, "home.txt", "AREAS_BADGE"),
        title: getRequiredLabel(home, "home.txt", "AREAS_TITLE"),
        subtitle: getRequiredLabel(home, "home.txt", "AREAS_SUBTITLE"),
      },
      testimonials: {
        badge: getRequiredLabel(home, "home.txt", "TESTIMONIALS_BADGE"),
        title: getRequiredLabel(home, "home.txt", "TESTIMONIALS_TITLE"),
        subtitle: getRequiredLabel(home, "home.txt", "TESTIMONIALS_SUBTITLE"),
        autoplayMs: parseNumberLabel(home, "home.txt", "TESTIMONIALS_AUTOPLAY_MS", 5000),
        verifiedLabel: getRequiredLabel(home, "home.txt", "TESTIMONIALS_VERIFIED_LABEL"),
        ctaLabel: getRequiredLabel(home, "home.txt", "TESTIMONIALS_CTA_LABEL"),
        ctaHref: getRequiredLabel(home, "home.txt", "TESTIMONIALS_CTA_LINK"),
        previousAriaLabel: getRequiredLabel(home, "home.txt", "TESTIMONIALS_PREVIOUS_ARIA_LABEL"),
        nextAriaLabel: getRequiredLabel(home, "home.txt", "TESTIMONIALS_NEXT_ARIA_LABEL"),
        dotAriaLabelTemplate: getRequiredLabel(home, "home.txt", "TESTIMONIALS_DOT_ARIA_LABEL_TEMPLATE"),
      },
      cta: {
        title: getRequiredLabel(home, "home.txt", "CTA_TITLE"),
        description: getRequiredSection(home, "home.txt", "CTA_DESCRIPTION"),
        primaryButton: {
          href: getRequiredLabel(home, "home.txt", "CTA_PRIMARY_BUTTON_LINK"),
          label: getRequiredLabel(home, "home.txt", "CTA_PRIMARY_BUTTON_LABEL"),
        },
        secondaryButton: {
          href: getOptionalLabel(home, "CTA_SECONDARY_BUTTON_LINK") || `mailto:${email}`,
          label: getOptionalLabel(home, "CTA_SECONDARY_BUTTON_LABEL") || `Email ${email}`,
        },
      },
    },
    aboutPage: {
      heroBadge: getRequiredLabel(about, "about.txt", "HERO_BADGE"),
      heroTitle: getRequiredLabel(about, "about.txt", "HERO_TITLE"),
      heroDescription: getRequiredSection(about, "about.txt", "HERO_DESCRIPTION"),
      heroEmail: getOptionalLabel(about, "HERO_EMAIL"),
      heroLocation: getOptionalLabel(about, "HERO_LOCATION"),
      summarySection: {
        badge: getRequiredLabel(about, "about.txt", "SUMMARY_BADGE"),
        title: getRequiredLabel(about, "about.txt", "SUMMARY_TITLE"),
        summary: getRequiredSection(about, "about.txt", "SUMMARY"),
      },
      credentialsSection: {
        badge: getRequiredLabel(about, "about.txt", "CREDENTIALS_BADGE"),
        title: getRequiredLabel(about, "about.txt", "CREDENTIALS_TITLE"),
        educationTitle: getRequiredLabel(about, "about.txt", "EDUCATION_TITLE"),
        certificationsTitle: getRequiredLabel(about, "about.txt", "CERTIFICATIONS_TITLE"),
        certificationsSubTitle: getOptionalLabel(about, "CERTIFICATIONS_SUBTITLE"),
        licensureTitle: getOptionalLabel(about, "LICENSURE_TITLE"),
        licensure: parseListSection(getOptionalSection(about, "LICENSURE")),
        education,
        certifications: parseListSection(getRequiredSection(about, "about.txt", "CERTIFICATIONS")),
      },
      experienceSection: {
        badge: getRequiredLabel(about, "about.txt", "EXPERIENCE_BADGE"),
        title: getRequiredLabel(about, "about.txt", "EXPERIENCE_TITLE"),
        emptyBulletsFallback: getRequiredLabel(about, "about.txt", "EXPERIENCE_EMPTY_BULLETS_FALLBACK"),
        roles: experienceRoles,
      },
      publicationsSection: {
        badge: getRequiredLabel(about, "about.txt", "PUBLICATIONS_BADGE"),
        title: getRequiredLabel(about, "about.txt", "PUBLICATIONS_TITLE"),
        publications: parseListSection(getRequiredSection(about, "about.txt", "PUBLICATIONS")),
      },
      languagesSection: {
        badge: getRequiredLabel(about, "about.txt", "LANGUAGES_BADGE"),
        title: getRequiredLabel(about, "about.txt", "LANGUAGES_TITLE"),
        languages: languageDetails,
      },
    },
    reviewsPage: {
      title: getRequiredLabel(reviews, "reviews.txt", "TITLE"),
      ratingOutOfTextTemplate: getRequiredLabel(reviews, "reviews.txt", "RATING_OUT_OF_TEXT_TEMPLATE"),
      basedOnReviewsTemplate: getRequiredLabel(reviews, "reviews.txt", "BASED_ON_REVIEWS_TEMPLATE"),
      shareExperience: {
        title: getRequiredLabel(reviews, "reviews.txt", "SHARE_EXPERIENCE_TITLE"),
        description: getRequiredSection(reviews, "reviews.txt", "SHARE_EXPERIENCE_DESCRIPTION"),
        buttonLabel: getRequiredLabel(reviews, "reviews.txt", "SHARE_EXPERIENCE_BUTTON_LABEL"),
        buttonHref:
          getOptionalLabel(reviews, "SHARE_EXPERIENCE_BUTTON_LINK") || getOptionalLabel(settings, "REVIEW_FORM_URL"),
      },
      filters: {
        allLabel: getRequiredLabel(reviews, "reviews.txt", "FILTERS_ALL_LABEL"),
      },
      reviewCard: {
        verifiedLabel: getRequiredLabel(reviews, "reviews.txt", "REVIEW_CARD_VERIFIED_LABEL"),
      },
    },
    contactPage: {
      title: getRequiredLabel(contact, "contact.txt", "TITLE"),
      subtitle: getRequiredSection(contact, "contact.txt", "SUBTITLE"),
      contactInfo: buildContactInfo(primaryRole, clinicName, location, email, languageSummary),
    },
    adminPage: STATIC_ADMIN_PAGE,
    notFoundPage: STATIC_NOT_FOUND_PAGE,
    services,
    reviewsPlaceholder: STATIC_REVIEWS_PLACEHOLDER,
    reviews: reviewEntries,
  };
}

import { z } from "zod";
import { hasSupportedHref, hasSupportedOptionalHref } from "./hrefSafety";

const nonEmptyStringSchema = z.string().trim().min(1);
const hrefSchema = nonEmptyStringSchema.refine(hasSupportedHref, {
  message: "Expected a route (/path), anchor (#id), or safe URL scheme (http, https, mailto, tel).",
});
const optionalHrefSchema = z.string().trim().refine(hasSupportedOptionalHref, {
  message: "Expected blank, a route (/path), anchor (#id), or safe URL scheme (http, https, mailto, tel).",
});
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected date in YYYY-MM-DD format.");

const linkSchema = z
  .object({
    href: hrefSchema,
    label: nonEmptyStringSchema,
  })
  .passthrough();

const iconDetailSchema = z
  .object({
    iconKey: nonEmptyStringSchema,
    text: nonEmptyStringSchema,
    href: optionalHrefSchema.optional(),
  })
  .passthrough();

const serviceSchema = z
  .object({
    id: nonEmptyStringSchema,
    title: nonEmptyStringSchema,
    shortDescription: nonEmptyStringSchema,
    fullDescription: nonEmptyStringSchema,
    iconKey: nonEmptyStringSchema,
    iconImageKey: nonEmptyStringSchema.optional(),
    duration: nonEmptyStringSchema,
    benefits: z.array(nonEmptyStringSchema).min(1),
    whoIsItFor: nonEmptyStringSchema,
  })
  .passthrough();

const reviewSchema = z
  .object({
    id: nonEmptyStringSchema,
    name: nonEmptyStringSchema,
    treatment: nonEmptyStringSchema,
    rating: z.number().int().min(1).max(5),
    review: nonEmptyStringSchema,
    date: dateSchema,
    verified: z.boolean(),
  })
  .passthrough();

const educationSchema = z
  .object({
    degree: nonEmptyStringSchema,
    school: nonEmptyStringSchema,
    location: nonEmptyStringSchema,
  })
  .passthrough();

const experienceRoleSchema = z
  .object({
    dates: z.string(),
    role: nonEmptyStringSchema,
    organization: nonEmptyStringSchema,
    location: nonEmptyStringSchema,
    bullets: z.array(nonEmptyStringSchema),
  })
  .passthrough();

const languageSchema = z
  .object({
    language: nonEmptyStringSchema,
    level: nonEmptyStringSchema,
  })
  .passthrough();

const assetImageSchema = z
  .object({
    importKey: nonEmptyStringSchema.optional(),
    path: z.string(),
    alt: nonEmptyStringSchema.optional(),
  })
  .passthrough();

const statSchema = z
  .object({
    iconKey: nonEmptyStringSchema,
    value: nonEmptyStringSchema,
    label: nonEmptyStringSchema,
  })
  .passthrough();

const dashboardStatSchema = z
  .object({
    label: nonEmptyStringSchema,
    type: z.enum(["totalReviews", "static"]),
    value: z.number().int().nonnegative().optional(),
  })
  .passthrough();

const homeServicesLayoutSchema = z
  .object({
    gridClassName: nonEmptyStringSchema,
    cardClassName: nonEmptyStringSchema,
    iconContainerClassName: nonEmptyStringSchema,
    iconImageClassName: nonEmptyStringSchema,
    iconFallbackClassName: nonEmptyStringSchema,
    descriptionClassName: nonEmptyStringSchema,
  })
  .passthrough();

export const siteContentSchema = z
  .object({
    siteMeta: z
      .object({
        brandName: nonEmptyStringSchema,
        brandInitials: nonEmptyStringSchema,
        primaryRole: nonEmptyStringSchema,
        email: nonEmptyStringSchema,
        location: nonEmptyStringSchema,
      })
      .passthrough(),
    doctorProfile: z
      .object({
        fullName: nonEmptyStringSchema,
        credentials: nonEmptyStringSchema,
        headline: nonEmptyStringSchema,
        specialties: z.array(nonEmptyStringSchema).min(1),
        clinicName: z.string(),
        currentRole: nonEmptyStringSchema,
        contact: z
          .object({
            email: z.string(),
            phone: z.string(),
            addressLine1: z.string(),
            cityStateCountry: z.string(),
          })
          .passthrough(),
        languages: z.array(nonEmptyStringSchema),
      })
      .passthrough(),
    assets: z
      .object({
        images: z.record(nonEmptyStringSchema, z.union([assetImageSchema, z.string()])),
      })
      .passthrough(),
    externalLinks: z
      .object({
        reviewForm: optionalHrefSchema,
        website: optionalHrefSchema,
        linkedin: optionalHrefSchema,
        instagram: optionalHrefSchema,
        facebook: optionalHrefSchema,
        x: optionalHrefSchema,
        youtube: optionalHrefSchema,
      })
      .passthrough(),
    seo: z
      .object({
        defaultTitle: nonEmptyStringSchema,
        titleTemplate: nonEmptyStringSchema,
        defaultDescription: nonEmptyStringSchema,
        keywords: z.array(nonEmptyStringSchema),
        openGraphImageAssetKey: nonEmptyStringSchema,
      })
      .passthrough(),
    visibility: z
      .object({
        showTestimonialsSection: z.boolean(),
        showReviewsPageShareCta: z.boolean(),
        showAdminPage: z.boolean(),
      })
      .passthrough(),
    display: z
      .object({
        homeFeaturedServicesCount: z.number().int().positive(),
        homeFeaturedTestimonialsCount: z.number().int().positive(),
        homeFeaturedTestimonialsMinRating: z.number().int().min(1).max(5),
        adminRecentReviewsCount: z.number().int().positive(),
      })
      .passthrough(),
    layoutConfig: z
      .object({
        homeServices: homeServicesLayoutSchema,
        reviewsPage: z
          .object({
            gridClassName: nonEmptyStringSchema,
          })
          .passthrough(),
      })
      .passthrough(),
    layout: z
      .object({
        navbar: z
          .object({
            navLinks: z.array(linkSchema).min(1),
            desktopEmailText: z.string(),
            desktopCtaLabel: nonEmptyStringSchema,
            mobileCtaLabel: nonEmptyStringSchema,
            mobileMenuAriaLabel: nonEmptyStringSchema,
          })
          .passthrough(),
        footer: z
          .object({
            summary: nonEmptyStringSchema,
            primaryCta: linkSchema,
            secondaryCta: linkSchema,
            detailsTitle: nonEmptyStringSchema,
            details: z.array(iconDetailSchema),
            bottomLink: linkSchema,
            copyrightTemplate: nonEmptyStringSchema,
          })
          .passthrough(),
      })
      .passthrough(),
    home: z
      .object({
        hero: z
          .object({
            badgeText: nonEmptyStringSchema,
            titlePrefix: nonEmptyStringSchema,
            titleHighlight: nonEmptyStringSchema,
            description: nonEmptyStringSchema,
            primaryButton: linkSchema,
            secondaryButton: linkSchema,
            stats: z.array(statSchema).min(1),
            doctorImageAssetKey: nonEmptyStringSchema,
            doctorImageAlt: nonEmptyStringSchema,
            profileCard: z
              .object({
                name: nonEmptyStringSchema,
                credentials: nonEmptyStringSchema,
                tags: z.array(nonEmptyStringSchema),
              })
              .passthrough(),
            floatingReviewCard: z
              .object({
                avatarLetters: z.array(nonEmptyStringSchema),
                starCount: z.number().int().min(1).max(5),
                label: nonEmptyStringSchema,
              })
              .passthrough(),
          })
          .passthrough(),
        areasOfPractice: z
          .object({
            badge: nonEmptyStringSchema,
            title: nonEmptyStringSchema,
            subtitle: nonEmptyStringSchema,
          })
          .passthrough(),
        testimonials: z
          .object({
            badge: nonEmptyStringSchema,
            title: nonEmptyStringSchema,
            subtitle: nonEmptyStringSchema,
            autoplayMs: z.number().int().positive(),
            verifiedLabel: nonEmptyStringSchema,
            ctaLabel: nonEmptyStringSchema,
            ctaHref: hrefSchema,
            previousAriaLabel: nonEmptyStringSchema,
            nextAriaLabel: nonEmptyStringSchema,
            dotAriaLabelTemplate: nonEmptyStringSchema,
          })
          .passthrough(),
        cta: z
          .object({
            title: nonEmptyStringSchema,
            description: nonEmptyStringSchema,
            primaryButton: linkSchema,
            secondaryButton: linkSchema,
          })
          .passthrough(),
      })
      .passthrough(),
    aboutPage: z
      .object({
        heroBadge: nonEmptyStringSchema,
        heroTitle: nonEmptyStringSchema,
        heroDescription: nonEmptyStringSchema,
        heroEmail: z.string(),
        heroLocation: z.string(),
        summarySection: z
          .object({
            badge: nonEmptyStringSchema,
            title: nonEmptyStringSchema,
            summary: nonEmptyStringSchema,
          })
          .passthrough(),
        credentialsSection: z
          .object({
            badge: nonEmptyStringSchema,
            title: nonEmptyStringSchema,
            educationTitle: nonEmptyStringSchema,
            certificationsTitle: nonEmptyStringSchema,
            education: z.array(educationSchema),
            certifications: z.array(nonEmptyStringSchema),
          })
          .passthrough(),
        experienceSection: z
          .object({
            badge: nonEmptyStringSchema,
            title: nonEmptyStringSchema,
            emptyBulletsFallback: nonEmptyStringSchema,
            roles: z.array(experienceRoleSchema),
          })
          .passthrough(),
        publicationsSection: z
          .object({
            badge: nonEmptyStringSchema,
            title: nonEmptyStringSchema,
            publications: z.array(nonEmptyStringSchema),
          })
          .passthrough(),
        languagesSection: z
          .object({
            badge: nonEmptyStringSchema,
            title: nonEmptyStringSchema,
            languages: z.array(languageSchema),
          })
          .passthrough(),
      })
      .passthrough(),
    reviewsPage: z
      .object({
        title: nonEmptyStringSchema,
        heroBadge: nonEmptyStringSchema,
        ratingOutOfTextTemplate: nonEmptyStringSchema,
        basedOnReviewsTemplate: nonEmptyStringSchema,
        shareExperience: z
          .object({
            title: nonEmptyStringSchema,
            description: nonEmptyStringSchema,
            buttonLabel: nonEmptyStringSchema,
            buttonHref: hrefSchema,
          })
          .passthrough(),
        filters: z
          .object({
            allLabel: nonEmptyStringSchema,
          })
          .passthrough(),
        reviewCard: z
          .object({
            verifiedLabel: nonEmptyStringSchema,
          })
          .passthrough(),
      })
      .passthrough(),
    contactPage: z
      .object({
        title: nonEmptyStringSchema,
        subtitle: nonEmptyStringSchema,
        contactInfo: z.array(
          z
            .object({
              iconKey: nonEmptyStringSchema,
              title: nonEmptyStringSchema,
              content: nonEmptyStringSchema,
              href: optionalHrefSchema.optional(),
            })
            .passthrough(),
        ),
      })
      .passthrough(),
    adminPage: z
      .object({
        login: z
          .object({
            title: nonEmptyStringSchema,
            subtitle: nonEmptyStringSchema,
            emailPlaceholder: nonEmptyStringSchema,
            passwordPlaceholder: nonEmptyStringSchema,
            submitLabel: nonEmptyStringSchema,
            welcomeToastTitle: nonEmptyStringSchema,
            welcomeToastDescription: nonEmptyStringSchema,
          })
          .passthrough(),
        dashboard: z
          .object({
            title: nonEmptyStringSchema,
            logoutLabel: nonEmptyStringSchema,
            stats: z.array(dashboardStatSchema),
            recentReviewsTitle: nonEmptyStringSchema,
          })
          .passthrough(),
      })
      .passthrough()
      .optional(),
    notFoundPage: z
      .object({
        code: nonEmptyStringSchema,
        title: nonEmptyStringSchema,
        homeLinkLabel: nonEmptyStringSchema,
        homeLinkHref: hrefSchema,
      })
      .passthrough(),
    services: z.array(serviceSchema).min(1),
    reviewsPlaceholder: z
      .object({
        id: nonEmptyStringSchema,
        name: nonEmptyStringSchema,
        treatment: nonEmptyStringSchema,
        rating: z.number().int().min(1).max(5),
        review: nonEmptyStringSchema,
        date: z.string(),
        verified: z.boolean(),
      })
      .passthrough()
      .optional(),
    reviews: z.array(reviewSchema),
  })
  .passthrough();

export type SiteContent = z.infer<typeof siteContentSchema>;

export function formatSiteContentValidationIssues(issues: z.ZodIssue[]) {
  return issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "root";
      return `${path}: ${issue.message}`;
    })
    .join("\n");
}

export function validateSiteContent(rawContent: unknown) {
  const parsed = siteContentSchema.safeParse(rawContent);
  if (!parsed.success) {
    const details = formatSiteContentValidationIssues(parsed.error.issues);
    throw new Error(`Invalid site content:\n${details}`);
  }
  return parsed.data;
}

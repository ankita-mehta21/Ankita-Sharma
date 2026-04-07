import test from "node:test";
import assert from "node:assert/strict";

import { buildEditableContentFromTextFiles } from "../../src/content/siteTextContent";
import { siteContentSchema } from "../../src/content/siteContentSchema";

function buildBaseContent() {
  return buildEditableContentFromTextFiles({
    "site-settings.txt": `
BRAND_NAME: Dr. Ankita Sharma
BRAND_INITIALS: AS
PRIMARY_ROLE: General Dentist
EMAIL: ankita.omfp@outlook.com
LOCATION: Baldwin, MI (Current Practice)
FULL_NAME: Dr. Ankita Sharma
CREDENTIALS: DMD, MDS
HEADLINE: Board Certified Dentist
CLINIC_NAME: Family Health Care
PHONE:
ADDRESS_LINE_1:
REVIEW_FORM_URL: https://example.com/review
WEBSITE_URL: https://example.com
LINKEDIN_URL:
INSTAGRAM_URL:
FACEBOOK_URL:
X_URL:
YOUTUBE_URL:
DEFAULT_TITLE: Dr. Ankita Sharma Portfolio
TITLE_TEMPLATE: {{pageTitle}} | Dr. Ankita Sharma
DEFAULT_DESCRIPTION: Portfolio of preventive, restorative, and surgical dental care by Dr. Ankita Sharma.
OPEN_GRAPH_IMAGE_ASSET_KEY: seoOgImage
FOOTER_SUMMARY: Board Certified Dentist with 3.5+ years of experience in preventive and restorative dentistry.
FOOTER_PRIMARY_CTA_LABEL: View Portfolio
FOOTER_PRIMARY_CTA_LINK: /about
FOOTER_SECONDARY_CTA_LABEL: Patient Reviews
FOOTER_SECONDARY_CTA_LINK: /reviews
FOOTER_DETAILS_TITLE: Professional Details
FOOTER_BOTTOM_LINK_LABEL: Contact
FOOTER_BOTTOM_LINK: /contact
COPYRIGHT_TEMPLATE: (c) {{year}} Dr. Ankita Sharma. All rights reserved.
NAV_DESKTOP_CTA_LABEL: Get in Touch
NAV_MOBILE_CTA_LABEL: Get in Touch
NAV_MOBILE_MENU_ARIA_LABEL: Toggle menu
SHOW_TESTIMONIALS_SECTION: true
SHOW_REVIEWS_SHARE_CTA: true
SHOW_LANGUAGES_SECTION: false
HOME_FEATURED_SERVICES_COUNT: 4
HOME_FEATURED_TESTIMONIALS_COUNT: 5
HOME_FEATURED_TESTIMONIALS_MIN_RATING: 5

[SPECIALTIES]
- Preventive and Restorative Dentistry

[LANGUAGE_SUMMARY]
- English (Fluent)

[SEO_KEYWORDS]
- Dentist

[NAV_LINKS]
- / | Home
    `.trim(),
    "home.txt": `
HERO_BADGE_TEXT: Board Certified Dentist
HERO_TITLE_PREFIX: Dr. Ankita Sharma
HERO_TITLE_HIGHLIGHT: DMD
HERO_PRIMARY_BUTTON_LABEL: View Portfolio
HERO_PRIMARY_BUTTON_LINK: /about
HERO_SECONDARY_BUTTON_LABEL: Read Patient Reviews
HERO_SECONDARY_BUTTON_LINK: /reviews
HERO_DOCTOR_IMAGE_ASSET_KEY: heroDoctorImage
HERO_DOCTOR_IMAGE_ALT: Dr. Ankita Sharma
PROFILE_CARD_NAME: Dr. Ankita Sharma
PROFILE_CARD_CREDENTIALS: DMD, MDS
FLOATING_REVIEW_LABEL: Verified patient feedback
AREAS_BADGE: Clinical Focus
AREAS_TITLE: Areas of Practice
AREAS_SUBTITLE: Practice areas
TESTIMONIALS_BADGE: Patient Feedback
TESTIMONIALS_TITLE: What Our Patients Say
TESTIMONIALS_SUBTITLE: Real experiences
TESTIMONIALS_AUTOPLAY_MS: 5000
TESTIMONIALS_VERIFIED_LABEL: Verified Patient
TESTIMONIALS_CTA_LABEL: Read All Reviews
TESTIMONIALS_CTA_LINK: /reviews
TESTIMONIALS_PREVIOUS_ARIA_LABEL: Previous review
TESTIMONIALS_NEXT_ARIA_LABEL: Next review
TESTIMONIALS_DOT_ARIA_LABEL_TEMPLATE: Go to review {{index}}
CTA_TITLE: Let's Connect
CTA_PRIMARY_BUTTON_LABEL: Contact Ankita
CTA_PRIMARY_BUTTON_LINK: /contact
CTA_SECONDARY_BUTTON_LABEL: Email ankita.omfp@outlook.com
CTA_SECONDARY_BUTTON_LINK: mailto:ankita.omfp@outlook.com

[HERO_DESCRIPTION]
Clinical care portfolio.

[CTA_DESCRIPTION]
Reach out anytime.

[PROFILE_CARD_TAGS]
- Invisalign Certified

[FLOATING_REVIEW_AVATARS]
- A

[HERO_STATS]
- Clock | 3.5+ Years | Clinical Experience

[SERVICES]
---
  ID: preventive-restorative
  TITLE: Preventive & Restorative Care
  SHORT_DESCRIPTION: Prevention-first care.
  FULL_DESCRIPTION: Tailored treatment plans.
  ICON_KEY: Sparkles
  ICON_IMAGE_KEY: preventiveIcon
  DURATION: Varies by visit
  WHO_IS_IT_FOR: Patients seeking routine care.

  [BENEFITS]
  - Personalized treatment planning
    `.trim(),
    "about.txt": `
HERO_BADGE: Portfolio
HERO_TITLE: Dr. Ankita Sharma, DMD, MDS
HERO_EMAIL:
HERO_LOCATION:
SUMMARY_BADGE: Summary
SUMMARY_TITLE: Professional Overview
CREDENTIALS_BADGE: Credentials
CREDENTIALS_TITLE: Education & Certifications
EDUCATION_TITLE: Education
CERTIFICATIONS_TITLE: Certifications
EXPERIENCE_BADGE: Experience
EXPERIENCE_TITLE: Clinical Roles
EXPERIENCE_EMPTY_BULLETS_FALLBACK: General dentistry role supporting comprehensive patient care.
PUBLICATIONS_BADGE: Research
PUBLICATIONS_TITLE: Publications
LANGUAGES_BADGE: Languages
LANGUAGES_TITLE: Language Proficiency

[HERO_DESCRIPTION]
Board Certified Dentist.

[SUMMARY]
Professional summary.

[EDUCATION]
---
  DEGREE: Doctor of Dental Medicine (DMD), Advanced Standing
  SCHOOL: Henry M. Goldman School of Dental Sciences
  LOCATION: Boston, MA

[CERTIFICATIONS]
- Invisalign Certification

[EXPERIENCE_ROLES]
---
  DATES:
  ROLE: General Dentist
  ORGANIZATION: Family Health Care
  LOCATION: Baldwin, MI

  [BULLETS]
  - Conducted patient assessments

[PUBLICATIONS]
- Paper One

[LANGUAGES]
---
  LANGUAGE: English
  LEVEL: Fluent
    `.trim(),
    "reviews.txt": `
TITLE: Patient Reviews
RATING_OUT_OF_TEXT_TEMPLATE: {{rating}} out of 5
BASED_ON_REVIEWS_TEMPLATE: Based on {{count}} reviews
SHARE_EXPERIENCE_TITLE: Share Your Experience
SHARE_EXPERIENCE_BUTTON_LABEL: Write a Review
SHARE_EXPERIENCE_BUTTON_LINK: https://example.com/review
FILTERS_ALL_LABEL: All
REVIEW_CARD_VERIFIED_LABEL: Verified

[SHARE_EXPERIENCE_DESCRIPTION]
Your feedback helps us provide better care.

[REVIEWS]
    `.trim(),
    "contact.txt": `
TITLE: Contact Ankita

[SUBTITLE]
Patient inquiries are welcome.
    `.trim(),
  });
}

test("schema accepts safe href schemes used by the TXT content workflow", () => {
  const content = buildBaseContent();
  content.externalLinks.website = "https://example.com";
  content.externalLinks.reviewForm = "mailto:reviews@example.com";
  content.contactPage.contactInfo[0].href = "tel:+1234567890";

  const parsed = siteContentSchema.safeParse(content);

  assert.equal(parsed.success, true);
});

test("schema rejects unsafe href schemes from content", () => {
  const content = buildBaseContent();
  content.externalLinks.reviewForm = "javascript:alert(1)";

  const parsed = siteContentSchema.safeParse(content);

  assert.equal(parsed.success, false);
});

test("href safety helpers reject unsafe schemes and preserve safe links", async () => {
  const { isExternalHref, resolveHref } = await import("../../src/content/hrefSafety.ts");

  assert.equal(resolveHref("javascript:alert(1)", "/contact"), "/contact");
  assert.equal(resolveHref("data:text/html,boom", "/contact"), "/contact");
  assert.equal(resolveHref("https://example.com"), "https://example.com");
  assert.equal(resolveHref("mailto:test@example.com"), "mailto:test@example.com");
  assert.equal(resolveHref("tel:+1234567890"), "tel:+1234567890");
  assert.equal(resolveHref("/about"), "/about");
  assert.equal(isExternalHref("https://example.com"), true);
  assert.equal(isExternalHref("mailto:test@example.com"), true);
  assert.equal(isExternalHref("#contact"), true);
  assert.equal(isExternalHref("javascript:alert(1)"), false);
});

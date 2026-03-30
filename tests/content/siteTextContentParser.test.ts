import test from "node:test";
import assert from "node:assert/strict";

import {
  CONTENT_DIRECTORY,
  buildEditableContentFromTextFiles,
  getContentFilePath,
  parseRepeatedBlocks,
  parseSectionedTextFile,
} from "../../src/content/siteTextContent";

test("editable content files live under the content folder", () => {
  assert.equal(CONTENT_DIRECTORY, "content");
  assert.equal(getContentFilePath("site-settings.txt"), "content/site-settings.txt");
  assert.equal(getContentFilePath("reviews.txt"), "content/reviews.txt");
});

test("parseSectionedTextFile reads labels and multiline sections", () => {
  const parsed = parseSectionedTextFile(
    "home.txt",
    `
TITLE: Gentle Dental Care
PRIMARY_BUTTON_LABEL: Book Consultation

[HERO_DESCRIPTION]
Comfort-focused care.
Modern dentistry.

[CTA_DESCRIPTION]
Reach out anytime.
    `.trim(),
  );

  assert.equal(parsed.labels.TITLE, "Gentle Dental Care");
  assert.equal(parsed.labels.PRIMARY_BUTTON_LABEL, "Book Consultation");
  assert.equal(parsed.sections.HERO_DESCRIPTION, "Comfort-focused care.\nModern dentistry.");
  assert.equal(parsed.sections.CTA_DESCRIPTION, "Reach out anytime.");
});

test("parseRepeatedBlocks splits repeated entry blocks", () => {
  const blocks = parseRepeatedBlocks(
    "reviews.txt",
    "REVIEWS",
    `
---
ID: review-1
NAME: Patient One
RATING: 5

[REVIEW]
Excellent care.

---
ID: review-2
NAME: Patient Two
RATING: 4

[REVIEW]
Very professional.
    `.trim(),
  );

  assert.equal(blocks.length, 2);
  assert.equal(blocks[0].labels.ID, "review-1");
  assert.equal(blocks[0].sections.REVIEW, "Excellent care.");
  assert.equal(blocks[1].labels.NAME, "Patient Two");
});

test("buildEditableContentFromTextFiles produces stable shared and page content", () => {
  const content = buildEditableContentFromTextFiles({
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
WEBSITE_URL:
LINKEDIN_URL:
INSTAGRAM_URL:
FACEBOOK_URL:
X_URL:
YOUTUBE_URL:
DEFAULT_TITLE: Dr. Ankita Sharma Portfolio
TITLE_TEMPLATE: {{pageTitle}} | Dr. Ankita Sharma
DEFAULT_DESCRIPTION: Portfolio of preventive, restorative, and surgical dental care by Dr. Ankita Sharma.
OPEN_GRAPH_IMAGE_ASSET_KEY: seoOgImage
FOOTER_SUMMARY: Board Certified Dentist with 3.5+ years of experience in preventive and restorative dentistry, oral surgery, and oral cancer screening.
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
- Oral Surgery
- Oral Cancer Screening

[LANGUAGE_SUMMARY]
- English (Fluent)
- Hindi (Native)

[SEO_KEYWORDS]
- Dentist
- Preventive Dentistry

[NAV_LINKS]
- / | Home
- /about | Portfolio
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
AREAS_SUBTITLE: A portfolio of preventive, restorative, and surgical dental care with an emphasis on patient education and outcomes.
TESTIMONIALS_BADGE: Patient Feedback
TESTIMONIALS_TITLE: What Our Patients Say
TESTIMONIALS_SUBTITLE: Real experiences from patients who have received care from Dr. Ankita Sharma.
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
A portfolio of clinical care with 3.5+ years of experience in preventive and restorative dentistry, oral surgery, and oral cancer screening.

[CTA_DESCRIPTION]
For patient inquiries, professional collaboration, or community outreach, feel free to reach out or share your experience.

[PROFILE_CARD_TAGS]
- Invisalign Certified
- Botox Certified

[FLOATING_REVIEW_AVATARS]
- A
- B
- C
- D

[HERO_STATS]
- Clock | 3.5+ Years | Clinical Experience
- BookOpen | 5 Published | Research Papers
- Star | 4.9 Rating | Patient Reviews

[SERVICES]
---
  ID: preventive-restorative
  TITLE: Preventive & Restorative Care
  SHORT_DESCRIPTION: Comprehensive exams, cleanings, and restorations with a prevention-first focus.
  FULL_DESCRIPTION: Experienced in simple and complex restorations as well as full coverage restorations, with treatment plans tailored to each patient.
  ICON_KEY: Sparkles
  ICON_IMAGE_KEY: endodonticsIcon
  DURATION: Varies by visit
  WHO_IS_IT_FOR: Patients seeking routine care, restorations, or long-term oral health planning.

  [BENEFITS]
  - Personalized treatment planning
  - Evidence-based preventive care
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
CERTIFICATIONS_TITLE: Certifications and Licensure
CERTIFICATIONS_SUBTITLE: Certifications
LICENSURE_TITLE: Licensure
EXPERIENCE_BADGE: Experience
EXPERIENCE_TITLE: Clinical Roles
EXPERIENCE_EMPTY_BULLETS_FALLBACK: General dentistry role supporting comprehensive patient care.
PUBLICATIONS_BADGE: Research
PUBLICATIONS_TITLE: Publications
LANGUAGES_BADGE: Languages
LANGUAGES_TITLE: Language Proficiency

[HERO_DESCRIPTION]
Board Certified Dentist focused on preventive, restorative, and surgical care with a patient-centered approach.

[SUMMARY]
A Board Certified Dentist with over 3.5 years of experience.

[LICENSURE]
- State of Michigan and California

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
  LEVEL: Fluent/Full professional proficiency
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
---
  ID: review-1
  NAME: Patient One
  TREATMENT: Cleaning
  RATING: 5
  DATE: 2026-01-01
  VERIFIED: true

  [REVIEW]
  Excellent care.
    `.trim(),
    "contact.txt": `
TITLE: Contact Ankita

[SUBTITLE]
Patient inquiries, referrals, and professional collaborations are welcome.
    `.trim(),
  });

  assert.equal(content.siteMeta.brandName, "Dr. Ankita Sharma");
  assert.equal(content.doctorProfile.languages[1], "Hindi (Native)");
  assert.equal(content.layout.navbar.navLinks[1].label, "Portfolio");
  assert.equal(content.home.hero.stats[2].iconKey, "Star");
  assert.equal(content.services[0].benefits[1], "Evidence-based preventive care");
  assert.equal(content.aboutPage.credentialsSection.licensure?.[0], "State of Michigan and California");
  assert.equal(content.aboutPage.experienceSection.roles[0].bullets[0], "Conducted patient assessments");
  assert.equal(content.reviews[0].review, "Excellent care.");
  assert.equal(content.contactPage.title, "Contact Ankita");
});

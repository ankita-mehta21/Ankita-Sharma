import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatSiteContentValidationIssues,
  siteContentSchema,
} from "../src/content/siteContentSchema";
import {
  ROOT_CONTENT_FILE_NAMES,
  buildEditableContentFromTextFiles,
  getContentFilePath,
} from "../src/content/siteTextContent";

const KNOWN_ICON_KEYS = new Set([
  "Sparkles",
  "CircleDot",
  "ShieldCheck",
  "Scan",
  "Clock",
  "BookOpen",
  "Star",
  "Mail",
  "MapPin",
  "Briefcase",
  "Languages",
]);

function findDuplicates(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  values.forEach((value) => {
    if (seen.has(value)) {
      duplicates.add(value);
      return;
    }
    seen.add(value);
  });

  return Array.from(duplicates.values());
}

function runValidation() {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const rawFiles = Object.fromEntries(
    ROOT_CONTENT_FILE_NAMES.map((fileName) => [
      fileName,
      fs.readFileSync(path.join(rootDir, getContentFilePath(fileName)), "utf8"),
    ]),
  ) as Record<(typeof ROOT_CONTENT_FILE_NAMES)[number], string>;
  const editableContent = buildEditableContentFromTextFiles(rawFiles);
  const parsed = siteContentSchema.safeParse(editableContent);

  if (!parsed.success) {
    console.error("Content schema validation failed:");
    console.error(formatSiteContentValidationIssues(parsed.error.issues));
    process.exit(1);
  }

  const content = parsed.data;
  const customIssues: string[] = [];
  const imageKeys = new Set(Object.keys(content.assets.images));

  const serviceDuplicates = findDuplicates(content.services.map((service) => service.id));
  if (serviceDuplicates.length > 0) {
    customIssues.push(`services.id contains duplicates: ${serviceDuplicates.join(", ")}`);
  }

  const reviewDuplicates = findDuplicates(content.reviews.map((review) => review.id));
  if (reviewDuplicates.length > 0) {
    customIssues.push(`reviews.id contains duplicates: ${reviewDuplicates.join(", ")}`);
  }

  content.services.forEach((service, index) => {
    if (!KNOWN_ICON_KEYS.has(service.iconKey)) {
      customIssues.push(`services[${index}].iconKey is not supported: ${service.iconKey}`);
    }
    if (service.iconImageKey && !imageKeys.has(service.iconImageKey)) {
      customIssues.push(`services[${index}].iconImageKey is missing in assets.images: ${service.iconImageKey}`);
    }
  });

  content.home.hero.stats.forEach((stat, index) => {
    if (!KNOWN_ICON_KEYS.has(stat.iconKey)) {
      customIssues.push(`home.hero.stats[${index}].iconKey is not supported: ${stat.iconKey}`);
    }
  });

  content.layout.footer.details.forEach((detail, index) => {
    if (!KNOWN_ICON_KEYS.has(detail.iconKey)) {
      customIssues.push(`layout.footer.details[${index}].iconKey is not supported: ${detail.iconKey}`);
    }
  });

  content.contactPage.contactInfo.forEach((item, index) => {
    if (!KNOWN_ICON_KEYS.has(item.iconKey)) {
      customIssues.push(`contactPage.contactInfo[${index}].iconKey is not supported: ${item.iconKey}`);
    }
  });

  if (!imageKeys.has(content.home.hero.doctorImageAssetKey)) {
    customIssues.push(
      `home.hero.doctorImageAssetKey is missing in assets.images: ${content.home.hero.doctorImageAssetKey}`,
    );
  }

  if (!imageKeys.has(content.seo.openGraphImageAssetKey)) {
    customIssues.push(
      `seo.openGraphImageAssetKey is missing in assets.images: ${content.seo.openGraphImageAssetKey}`,
    );
  }

  if (customIssues.length > 0) {
    console.error("Content reference validation failed:");
    customIssues.forEach((issue) => console.error(`- ${issue}`));
    process.exit(1);
  }

  console.log("Site content validation passed.");
}

runValidation();

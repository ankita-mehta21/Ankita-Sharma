import { Helmet } from "react-helmet-async";
import { getImageByKey, getSiteContent, resolveTemplate } from "@/content/siteContent";
import { toAbsoluteUrl } from "./seoUtils";

interface SeoProps {
  pageTitle?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function Seo({ pageTitle, description, keywords, noIndex = false }: SeoProps) {
  const siteContent = getSiteContent();
  const seoContent = siteContent.seo;
  const fullTitle = pageTitle
    ? resolveTemplate(seoContent.titleTemplate, { pageTitle })
    : seoContent.defaultTitle;
  const fullDescription = description?.trim() || seoContent.defaultDescription;
  const keywordList = (keywords && keywords.length > 0 ? keywords : seoContent.keywords).join(", ");

  const ogImagePath = getImageByKey(seoContent.openGraphImageAssetKey) ?? "";
  const canonicalSiteUrl = siteContent.externalLinks.website.trim();
  const ogImageUrl = toAbsoluteUrl(ogImagePath, canonicalSiteUrl);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywordList} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content="website" />
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}

      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}

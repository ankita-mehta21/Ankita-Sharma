export function toAbsoluteUrl(url: string, websiteBaseUrl: string) {
  if (!url.trim()) {
    return "";
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (!websiteBaseUrl.trim()) {
    return "";
  }

  try {
    return new URL(url, websiteBaseUrl).toString();
  } catch {
    return "";
  }
}

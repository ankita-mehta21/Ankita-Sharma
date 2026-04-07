const SAFE_EXTERNAL_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);
const SCHEME_PATTERN = /^[a-z][a-z\d+.-]*:/i;

function getHrefScheme(href: string) {
  const match = href.match(SCHEME_PATTERN);
  return match ? match[0].toLowerCase() : null;
}

export function hasSupportedHref(href: string) {
  const trimmedHref = href.trim();
  if (!trimmedHref) {
    return false;
  }

  if (trimmedHref.startsWith("/") || trimmedHref.startsWith("#")) {
    return true;
  }

  if (trimmedHref.startsWith("//")) {
    return false;
  }

  const scheme = getHrefScheme(trimmedHref);
  return scheme !== null && SAFE_EXTERNAL_SCHEMES.has(scheme);
}

export function hasSupportedOptionalHref(href: string) {
  return href.trim() === "" || hasSupportedHref(href);
}

export function resolveHref(href: string, fallbackHref = "/") {
  const trimmedHref = href.trim();
  if (!trimmedHref) {
    return fallbackHref;
  }

  if (trimmedHref.startsWith("/") || trimmedHref.startsWith("#")) {
    return trimmedHref;
  }

  if (trimmedHref.startsWith("//")) {
    return fallbackHref;
  }

  const scheme = getHrefScheme(trimmedHref);
  if (scheme) {
    return SAFE_EXTERNAL_SCHEMES.has(scheme) ? trimmedHref : fallbackHref;
  }

  return `/${trimmedHref.replace(/^\/+/, "")}`;
}

export function isExternalHref(href: string) {
  const resolvedHref = resolveHref(href, "/");
  return resolvedHref.startsWith("#") || SAFE_EXTERNAL_SCHEMES.has(getHrefScheme(resolvedHref) ?? "");
}

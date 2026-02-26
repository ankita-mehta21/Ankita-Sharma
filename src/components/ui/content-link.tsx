import { forwardRef, type AnchorHTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { isExternalHref, resolveHref } from "@/content/siteContent";

interface ContentLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  fallbackHref?: string;
  newTabForExternal?: boolean;
}

export const ContentLink = forwardRef<HTMLAnchorElement, ContentLinkProps>(
  (
    {
      href,
      children,
      fallbackHref = "/",
      newTabForExternal = false,
      className,
      onClick,
      ...anchorProps
    },
    ref,
  ) => {
    const resolvedHref = resolveHref(href, fallbackHref);
    const shouldUseAnchor = isExternalHref(resolvedHref);

    if (shouldUseAnchor) {
      const shouldOpenInNewTab = newTabForExternal && /^(https?:)?\/\//i.test(resolvedHref);

      return (
        <a
          {...anchorProps}
          href={resolvedHref}
          ref={ref}
          className={className}
          onClick={onClick}
          target={shouldOpenInNewTab ? "_blank" : anchorProps.target}
          rel={shouldOpenInNewTab ? "noopener noreferrer" : anchorProps.rel}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        to={resolvedHref}
        ref={ref}
        className={className}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    );
  },
);

ContentLink.displayName = "ContentLink";

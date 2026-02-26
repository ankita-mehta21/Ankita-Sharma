import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ContentLink } from "@/components/ui/content-link";
import { getPrimaryEmail, getSiteContent, resolveHref } from "@/content/siteContent";

export function Navbar() {
  const siteContent = getSiteContent();
  const navLinks = siteContent.layout.navbar.navLinks;
  const contactLink = navLinks.find((link) => resolveHref(link.href) === "/contact")?.href ?? "/contact";
  const primaryEmail = getPrimaryEmail();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <ContentLink
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-xl font-display font-bold text-primary">{siteContent.siteMeta.brandInitials}</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-semibold text-foreground">
                {siteContent.siteMeta.brandName}
              </span>
              <span className="block text-xs text-muted-foreground -mt-0.5">
                {siteContent.siteMeta.primaryRole}
              </span>
            </div>
          </ContentLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <ContentLink
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === resolveHref(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </ContentLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={primaryEmail ? `mailto:${primaryEmail}` : "mailto:"}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden xl:inline">{siteContent.layout.navbar.desktopEmailText}</span>
            </a>
            <Button asChild size="sm" className="rounded-full px-6">
              <ContentLink href={contactLink}>{siteContent.layout.navbar.desktopCtaLabel}</ContentLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={siteContent.layout.navbar.mobileMenuAriaLabel}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 pb-4" : "max-h-0",
            isOpen && "bg-background/95 backdrop-blur-md border-t border-border/50"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <ContentLink
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === resolveHref(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </ContentLink>
            ))}
            <div className="pt-3 px-4 flex items-center gap-3">
              <Button asChild className="w-full rounded-full">
                <ContentLink href={contactLink}>{siteContent.layout.navbar.mobileCtaLabel}</ContentLink>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

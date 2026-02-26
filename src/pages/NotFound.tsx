import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ContentLink } from "@/components/ui/content-link";
import { Seo } from "@/components/seo/Seo";
import { getSiteContent } from "@/content/siteContent";

const NotFound = () => {
  const notFoundPage = getSiteContent().notFoundPage;
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Seo pageTitle={notFoundPage.code} description={notFoundPage.title} noIndex />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{notFoundPage.code}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{notFoundPage.title}</p>
        <ContentLink href={notFoundPage.homeLinkHref} className="text-primary underline hover:text-primary/90">
          {notFoundPage.homeLinkLabel}
        </ContentLink>
      </div>
    </div>
  );
};

export default NotFound;

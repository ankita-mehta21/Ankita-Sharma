import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/about", label: "Portfolio Overview" },
  { href: "/about#experience", label: "Clinical Experience" },
  { href: "/about#publications", label: "Publications" },
  { href: "/reviews", label: "Patient Reviews" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Preventive & Restorative Care",
  "Extractions & Emergency Care",
  "Endodontic Therapy",
  "Dentures & Prosthodontics",
  "Oral Surgery & Biopsy",
  "Oral Cancer Screening",
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/90">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-xl font-display font-bold text-primary-foreground">AS</span>
                </div>
                <div>
                  <span className="font-display text-lg font-semibold text-background">
                    Dr. Ankita Sharma
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              California Board Certified Dentist with 3.5+ years of experience in preventive, restorative,
              and surgical dental care. Focused on patient-centered outcomes and clear communication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-background mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold text-background mb-4">
              Clinical Focus
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-background/70 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold text-background mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-background/70 text-sm">
                  Baldwin, MI (Current Practice)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:ankita.omfp@outlook.com"
                  className="text-background/70 hover:text-primary text-sm transition-colors"
                >
                  ankita.omfp@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              (c) {currentYear} Dr. Ankita Sharma. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/admin"
                className="text-background/60 hover:text-primary text-sm transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

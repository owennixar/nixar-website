"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Code,
  Zap,
  Users,
  Search,
  PenTool,
  Brain,
  Bot,
  Palette,
  BarChart3,
  Phone,
  ChevronDown,
} from "lucide-react";
import { services } from "@/lib/data/services";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  megaphone: Megaphone,
  code: Code,
  zap: Zap,
  users: Users,
  search: Search,
  "pen-tool": PenTool,
  brain: Brain,
  bot: Bot,
  palette: Palette,
  "bar-chart": BarChart3,
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

const MOBILE_SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/nixarsolutions", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/nixarsolutions", icon: LinkedInIcon },
  { label: "Facebook", href: "https://facebook.com/nixarsolutions", icon: FacebookIcon },
  { label: "X", href: "https://x.com/nixarsolutions", icon: XIcon },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isHomepage, setIsHomepage] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setIsHomepage(window.location.pathname === "/");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleDropdownEnter = useCallback(() => {
    clearTimeout(dropdownTimeoutRef.current);
    setServicesOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  }, []);

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-600 text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
      >
        Skip to content
      </a>

      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isHomepage
              ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222]"
              : "bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 lg:px-8 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 shrink-0"
            aria-label="NIXAR Solutions — Home"
          >
            <Image
              src={isHomepage ? "/logo-white.svg" : "/logo.svg"}
              alt="NIXAR Solutions"
              width={160}
              height={48}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden items-center gap-7 lg:flex" role="menubar">
            {NAV_LINKS.map(({ label, href, ...rest }) => {
              const hasDropdown = "hasDropdown" in rest && rest.hasDropdown;

              if (hasDropdown) {
                return (
                  <div
                    key={label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setServicesOpen((v) => !v);
                        }
                      }}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      className={`nav-link group flex items-center gap-1 text-[14px] font-500 uppercase tracking-[0.05em] transition-colors hover:text-[var(--color-primary)] ${isHomepage ? "text-white" : "text-[#1A1A1A]"}`}
                    >
                      {label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Services dropdown panel */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 rounded-xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                          role="menu"
                        >
                          <div className="grid grid-cols-2 gap-1">
                            {services.map((service) => {
                              const Icon = ICON_MAP[service.icon];
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  role="menuitem"
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-primary-light)]"
                                >
                                  {Icon && (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)]">
                                      <Icon size={16} />
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <span className="block text-[13px] font-500 text-[var(--color-text)] leading-tight">
                                      {service.shortTitle}
                                    </span>
                                    {service.isNew && (
                                      <span className="text-[10px] font-600 uppercase tracking-wider text-[var(--color-primary)]">
                                        New
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={label}
                  href={href}
                  role="menuitem"
                  className={`nav-link relative text-[14px] font-500 uppercase tracking-[0.05em] transition-colors hover:text-[var(--color-primary)] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--color-primary)] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-4 focus-visible:rounded-sm ${isHomepage ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Desktop right: phone + CTA */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="tel:4697593638"
              className={`flex items-center gap-1.5 text-[13px] font-500 transition-colors ${isHomepage ? "text-white/50 hover:text-white" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}
              aria-label="Call us at 469-759-3638"
            >
              <Phone size={14} />
              469-759-3638
            </a>
            <a
              href="#contact"
              className="inline-flex h-10 items-center rounded-full bg-[var(--color-primary)] px-6 text-[13px] font-600 text-white transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:scale-[1.02] hover:shadow-[0_8px_24px_var(--color-primary-glow)]"
            >
              Get Free Audit
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 origin-center ${isHomepage && !mobileOpen ? "bg-white" : "bg-[var(--color-black)]"} ${
                mobileOpen ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${isHomepage && !mobileOpen ? "bg-white" : "bg-[var(--color-black)]"} ${
                mobileOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 origin-center ${isHomepage && !mobileOpen ? "bg-white" : "bg-[var(--color-black)]"} ${
                mobileOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-8 pt-24">
              {/* Nav links */}
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={closeMobile}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="font-[family-name:var(--font-heading)] text-[2rem] font-700 tracking-tight text-[var(--color-black)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:text-[var(--color-primary)]"
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="space-y-6"
              >
                {/* Social icons */}
                <div className="flex gap-4">
                  {MOBILE_SOCIAL.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>

                {/* CTA button */}
                <a
                  href="#contact"
                  onClick={closeMobile}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--color-primary)] text-base font-600 text-white transition-all hover:bg-[var(--color-primary-hover)]"
                >
                  Get Free Audit
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Inline social SVG icons ───────────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

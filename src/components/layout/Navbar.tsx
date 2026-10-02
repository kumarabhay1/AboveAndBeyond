"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { servicesData } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
  ShieldCheck,
  Calendar,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/about", label: "About Us" },
  { href: "/service-areas", label: "Service Area" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = React.useState<number | null>(null);
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Track scroll state for subtle glass depth shifts
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Close mobile menu on desktop resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
      document.documentElement.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
      document.documentElement.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.documentElement.classList.remove("menu-open");
    };
  }, [mobileMenuOpen]);

  // Handle Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (servicesDropdownOpen) setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, servicesDropdownOpen]);

  // Dropdown hover delay helpers
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  // Group services for the 2-column mega menu
  const standardServices = servicesData.filter((s) =>
    ["full-vehicle-detail", "full-interior-detail", "full-exterior-detail"].includes(s.id)
  );
  const specializedServices = servicesData.filter((s) =>
    ["paint-correction", "ceramic-coating", "headlight-restoration"].includes(s.id)
  );

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Floating Glassmorphic Navigation Bar Container (Directly overlaying Hero) */}
      <div className="fixed top-0 left-0 right-0 z-[100] w-full pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <header
          className={`pointer-events-auto max-w-7xl mx-auto rounded-full transition-all duration-300 relative ${
            isScrolled
              ? "bg-white/90 dark:bg-[#0c0c0e]/90 shadow-[0_12px_40px_rgba(0,0,0,0.1),0_0_24px_rgba(255,85,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(255,85,0,0.12)] border border-black/10 dark:border-white/20"
              : "bg-white/80 dark:bg-[#0c0c0e]/75 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_0_16px_rgba(255,85,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_16px_rgba(255,85,0,0.06)] border border-black/10 dark:border-white/15 hover:border-black/20 dark:hover:border-white/25"
          } backdrop-blur-xl`}
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Subtle Ambient Burnt Orange Top Specular Accent */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500]/50 to-transparent pointer-events-none rounded-full" />
          <div className="absolute inset-x-12 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent pointer-events-none rounded-full" />

          <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 lg:gap-4 relative z-10">
            {/* ========================================================================= */}
            {/* ZONE 1: LEFT — Brand Identity */}
            {/* ========================================================================= */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] rounded-full pr-2 py-0.5 transition-transform duration-200 active:scale-98 shrink-0"
              aria-label="Above and Beyond Car Detailing Home"
            >
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-[#ff5500]/40 to-black/10 dark:to-white/10 group-hover:from-[#ff5500] group-hover:to-[#ff7733] transition-all duration-300 shadow-[0_0_12px_rgba(255,85,0,0.3)]">
                <div className="relative w-full h-full rounded-full bg-slate-900 dark:bg-[#0c0c0e] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Above and Beyond Car Detailing"
                    width={44}
                    height={44}
                    className="object-contain filter drop-shadow-[0_0_8px_rgba(255,85,0,0.4)] group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="font-display text-base sm:text-lg lg:text-xl font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white leading-none group-hover:text-[#ff5500] transition-colors duration-200">
                  Above & Beyond
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-[#cbd5e1]/70 leading-none mt-1 group-hover:text-zinc-700 dark:group-hover:text-[#cbd5e1] transition-colors">
                  Car Detailing
                </span>
              </div>
            </Link>

            {/* ========================================================================= */}
            {/* ZONE 2: CENTER — Primary Navigation (Pill Capsule) */}
            {/* ========================================================================= */}
            <nav
              className="hidden lg:flex items-center bg-black/[0.04] dark:bg-black/25 p-1 rounded-full border border-black/[0.06] dark:border-white/[0.08] shadow-inner"
              role="navigation"
              aria-label="Primary Navigation"
            >
              {navLinks.map((link, index) => {
                const active = isLinkActive(link.href);
                const isHovered = hoveredNavIndex === index;

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredNavIndex(index);
                      if (link.hasDropdown) handleDropdownEnter();
                    }}
                    onMouseLeave={() => {
                      setHoveredNavIndex(null);
                      if (link.hasDropdown) handleDropdownLeave();
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-expanded={link.hasDropdown ? servicesDropdownOpen : undefined}
                      aria-haspopup={link.hasDropdown ? "true" : undefined}
                      className={`relative z-10 flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] ${
                        active
                          ? "text-white"
                          : "text-zinc-700 dark:text-[#cbd5e1] hover:text-zinc-950 dark:hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.hasDropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesDropdownOpen
                              ? "rotate-180 text-[#ff5500]"
                              : active
                              ? "text-white"
                              : "text-zinc-500 dark:text-[#cbd5e1]/70"
                          }`}
                        />
                      )}
                    </Link>

                    {/* Smooth Active Pill Indicator */}
                    {active && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] shadow-[0_0_16px_rgba(255,85,0,0.55)]"
                      />
                    )}

                    {/* Subtle Hover Highlight Pill for Inactive Links */}
                    {!active && isHovered && (
                      <motion.div
                        layoutId="navbar-hover-pill"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        className="absolute inset-0 z-0 rounded-full bg-black/[0.06] dark:bg-white/[0.09] border border-black/5 dark:border-white/10"
                      />
                    )}

                    {/* Animated Services Mega-Menu Dropdown */}
                    {link.hasDropdown && (
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px] z-50 pointer-events-auto"
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleDropdownLeave}
                          >
                            <div
                              className="rounded-3xl bg-white/95 dark:bg-[#0c0c0e]/95 border border-black/10 dark:border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.15),0_0_30px_rgba(255,85,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,85,0,0.15)] p-5.5 backdrop-blur-xl relative overflow-hidden"
                              style={{
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                              }}
                            >
                              {/* Ambient internal lighting accent */}
                              <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff5500]/10 rounded-full blur-2xl pointer-events-none" />

                              <div className="grid grid-cols-2 gap-5 relative z-10">
                                {/* Column 1: Complete Detailing */}
                                <div>
                                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#ff5500] pb-2 mb-2.5 border-b border-black/10 dark:border-white/10">
                                    <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
                                    <span>Complete Detailing</span>
                                  </div>
                                  <ul className="space-y-1.5">
                                    {standardServices.map((item) => (
                                      <li key={item.id}>
                                        <Link
                                          href={`/services#${item.id}`}
                                          onClick={() => setServicesDropdownOpen(false)}
                                          className="p-2.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] border border-transparent hover:border-black/5 dark:hover:border-white/15 transition-all block group"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="font-bold text-xs text-zinc-900 dark:text-white group-hover:text-[#ff5500] transition-colors">
                                              {item.title}
                                            </span>
                                            <span className="text-[10px] font-extrabold text-[#ff5500] bg-[#ff5500]/10 px-2 py-0.5 rounded-full border border-[#ff5500]/25">
                                              ${item.startingPrice}
                                            </span>
                                          </div>
                                          <p className="text-[11px] text-zinc-500 dark:text-[#cbd5e1]/70 line-clamp-1 mt-0.5 group-hover:text-zinc-800 dark:group-hover:text-[#cbd5e1] transition-colors">
                                            {item.tagline}
                                          </p>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Column 2: Specialized Protection */}
                                <div>
                                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#ff5500] pb-2 mb-2.5 border-b border-black/10 dark:border-white/10">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500]" />
                                    <span>Paint & Protection</span>
                                  </div>
                                  <ul className="space-y-1.5">
                                    {specializedServices.map((item) => (
                                      <li key={item.id}>
                                        <Link
                                          href={`/services#${item.id}`}
                                          onClick={() => setServicesDropdownOpen(false)}
                                          className="p-2.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] border border-transparent hover:border-black/5 dark:hover:border-white/15 transition-all block group"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="font-bold text-xs text-zinc-900 dark:text-white group-hover:text-[#ff5500] transition-colors">
                                              {item.title}
                                            </span>
                                            <span className="text-[10px] font-extrabold text-[#ff5500] bg-[#ff5500]/10 px-2 py-0.5 rounded-full border border-[#ff5500]/25">
                                              ${item.startingPrice}
                                            </span>
                                          </div>
                                          <p className="text-[11px] text-zinc-500 dark:text-[#cbd5e1]/70 line-clamp-1 mt-0.5 group-hover:text-zinc-800 dark:group-hover:text-[#cbd5e1] transition-colors">
                                            {item.tagline}
                                          </p>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Dropdown Footer Bar */}
                                <div className="col-span-2 pt-3 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-xs">
                                  <span className="text-zinc-500 dark:text-[#cbd5e1]/70 text-[11px]">
                                    Self-contained mobile rig with spot-free water & power onboard.
                                  </span>
                                  <Link
                                    href="/services"
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="font-bold text-[#ff5500] hover:text-[#ff7733] flex items-center gap-1 group transition-colors"
                                  >
                                    <span>View All Services</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ========================================================================= */}
            {/* ZONE 3: RIGHT — Actions & CTAs */}
            {/* ========================================================================= */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
              {/* Phone Quick Action */}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-white text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500]"
                title="Call Above & Beyond"
              >
                <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                <span className="hidden xl:inline text-zinc-700 dark:text-[#cbd5e1] hover:text-zinc-950 dark:hover:text-white">{siteConfig.phone}</span>
                <span className="xl:hidden">Call</span>
              </a>

              {/* WhatsApp Quick Action */}
              <a
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                title="WhatsApp Message"
                aria-label="Contact on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Book Detail CTA Pill */}
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-xs uppercase tracking-wider px-4.5 py-2 shadow-[0_0_18px_rgba(255,85,0,0.4)] hover:shadow-[0_0_26px_rgba(255,85,0,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/20"
              >
                <Link href="/contact" className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Detail</span>
                </Link>
              </Button>
            </div>

            {/* ========================================================================= */}
            {/* MOBILE: Right Action Controls */}
            {/* ========================================================================= */}
            <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
              <ThemeToggle />

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center justify-center w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors"
                title="Call Us"
                aria-label="Call Above and Beyond"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff5500]" />
              </a>

              <a
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                title="WhatsApp Us"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow-[0_0_14px_rgba(255,85,0,0.4)] transition-transform active:scale-95 cursor-pointer border border-white/20"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
              >
                {mobileMenuOpen ? (
                  <>
                    <span>CLOSE</span>
                    <X className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>MENU</span>
                    <Menu className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE FULL-SCREEN GLASS DRAWER OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-white/98 dark:bg-[#0c0c0e]/98 backdrop-blur-2xl flex flex-col pt-24 sm:pt-28 h-screen h-[100dvh] w-screen overflow-hidden text-zinc-900 dark:text-white"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-[#ff5500]/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-[260px] h-[260px] bg-[#ff5500]/10 rounded-full blur-[70px] pointer-events-none" />

            <nav className="flex flex-col px-6 sm:px-8 gap-4 overflow-y-auto pb-24 h-full relative z-10 custom-scrollbar">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease: "easeOut" }}
                  >
                    {link.hasDropdown ? (
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-2xl sm:text-3xl tracking-wide font-display uppercase transition-colors ${
                              active ? "text-[#ff5500] font-extrabold" : "text-zinc-900 dark:text-white hover:text-[#ff5500]"
                            }`}
                          >
                            {link.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                            aria-label="Toggle services list"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileServicesOpen ? "rotate-180 text-[#ff5500]" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {/* Collapsible Mobile Services List */}
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-3 mt-2 space-y-1.5 border-l border-black/10 dark:border-white/15 overflow-hidden"
                            >
                              {servicesData.map((svc) => (
                                <Link
                                  key={svc.id}
                                  href={`/services#${svc.id}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-600 dark:text-[#cbd5e1] hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                                >
                                  <span>{svc.title}</span>
                                  <span className="text-[10px] text-[#ff5500] font-bold">
                                    From ${svc.startingPrice}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-2xl sm:text-3xl tracking-wide font-display uppercase transition-colors ${
                          active ? "text-[#ff5500] font-extrabold" : "text-zinc-900 dark:text-white hover:text-[#ff5500]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Mobile Drawer Bottom Action Hub */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.3 }}
                className="mt-auto pt-6 border-t border-black/10 dark:border-white/10 flex flex-col gap-3"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 text-sm font-extrabold uppercase tracking-wider rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] text-white shadow-[0_0_20px_rgba(255,85,0,0.4)] border border-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book Detailing Appointment</span>
                  </Link>
                </Button>

                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full h-11 bg-black/[0.04] dark:bg-white/[0.05] border-black/10 dark:border-white/15 text-zinc-900 dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.1] rounded-full text-xs font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>Call Now</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full h-11 bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 rounded-full text-xs font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a
                      href={siteConfig.getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </Button>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

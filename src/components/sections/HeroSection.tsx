"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/ui/hero-background";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  MapPin,
  Truck,
  Clock,
  ArrowRight,
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 sm:pt-32 md:pt-36 pb-16 overflow-hidden bg-[#0c0c0e]">
      {/* Cinematic Automotive Visual Canvas */}
      <HeroBackground />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl lg:max-w-4xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {/* Service Area & Mobile Eyebrow Badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff5500]/30 bg-[#ff5500]/10 text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] mb-4 sm:mb-6 backdrop-blur-md shadow-[0_0_16px_rgba(255,85,0,0.2)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>We Come To You — Inland Empire & SoCal</span>
            </motion.div>

            {/* Editorial Luxury Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold uppercase tracking-tight text-balance leading-[0.93] mb-5 sm:mb-7"
            >
              <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                NOT JUST CLEAN.
              </span>
              <span className="block bg-gradient-to-r from-[#ff5500] via-[#ff7733] to-[#ffaa66] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,85,0,0.35)]">
                BEYOND PERFECTION.
              </span>
            </motion.h1>

            {/* Concise Supporting Copy */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="text-sm sm:text-base md:text-lg text-[#cbd5e1] max-w-2xl leading-relaxed mb-7 sm:mb-9 font-normal drop-shadow-sm"
            >
              Professional mobile car detailing delivered directly to your home or workplace in Riverside, the Inland Empire, and Southern California. We bring showroom-quality transformation with 100% self-powered mobile units with spot-free water.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-11"
            >
              {/* Primary Book Detail CTA */}
              <Button
                asChild
                size="lg"
                className="h-12 sm:h-13.5 px-7 sm:px-8 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,85,0,0.45)] hover:shadow-[0_0_34px_rgba(255,85,0,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/20 flex items-center justify-center gap-2"
              >
                <Link href="/contact">
                  <Calendar className="w-4 h-4" />
                  <span>Book Detail</span>
                </Link>
              </Button>

              {/* Secondary Explore Services Link */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 sm:h-13.5 px-6 sm:px-7 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <Link href="/services">
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Quick Contact Micro-Actions (Phone & WhatsApp) */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0 sm:ml-2">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white text-xs font-semibold backdrop-blur-md transition-all"
                  title="Call Us"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Call Now</span>
                </a>

                <a
                  href={siteConfig.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md transition-all"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Authenticated Trust Row (Verified Details Only) */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.7 } },
              }}
              className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 pt-5 sm:pt-6 border-t border-white/15 text-xs sm:text-sm text-[#cbd5e1]/85 font-medium"
            >
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>100% Mobile Service</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>Riverside & Inland Empire</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>7 Days a Week (7 AM - 8 PM)</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Smooth Section Transition Divider */}
      <SectionDivider variant="hero" />
    </section>
  );
}

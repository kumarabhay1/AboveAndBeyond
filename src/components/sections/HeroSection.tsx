"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/ui/hero-background";
import { SectionDivider } from "@/components/ui/section-divider";
import { ShieldCheck, Clock, MapPin, Star, Phone, MessageCircle, Truck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-start sm:items-center pt-20 sm:pt-28 md:pt-36 pb-12 overflow-hidden bg-[#0c0c0e]">
      {/* Cinematic Car Detailing Video Stage */}
      <HeroBackground />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Location & Mobile Badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/20 text-[#ff8542] text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6 backdrop-blur-md shadow-md"
            >
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>We Come To You — Inland Empire & SoCal</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold uppercase tracking-tight mb-4 sm:mb-6 text-balance leading-[1.05] text-white drop-shadow-md"
            >
              DON’T JUST WASH YOUR VEHICLE, <br />
              <span className="text-gradient-primary">GO ABOVE AND BEYOND.</span>
            </motion.h1>

            {/* Sub-paragraph */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="text-base sm:text-lg lg:text-xl text-zinc-200 dark:text-zinc-300 mb-6 sm:mb-8 lg:mb-10 text-balance max-w-2xl leading-relaxed drop-shadow-sm font-medium"
            >
              Professional mobile car detailing delivered directly to your home or workplace in Riverside, the Inland Empire, and Southern California. We bring showroom-quality results with 100% self-powered mobile units.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12"
            >
              <Button
                asChild
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-extrabold uppercase tracking-wider shadow-xl shadow-primary/30 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
              >
                <Link href="/contact">Book Your Detail</Link>
              </Button>

              <div className="grid grid-cols-2 sm:flex gap-2.5 sm:gap-4 w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-3 sm:px-6 text-xs sm:text-base font-semibold bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white hover:-translate-y-0.5 transition-all duration-200 w-full"
                >
                  <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 shrink-0 text-primary" />
                    <span>Call Now</span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-3 sm:px-6 text-xs sm:text-base font-semibold bg-white/10 backdrop-blur-md border-white/20 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200 w-full"
                >
                  <a href={siteConfig.getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 shrink-0 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Key Trust Badges */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.8 } },
              }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 lg:pt-8 border-t border-white/20"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-white/90">100% Mobile Service</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-white/90">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="text-xs sm:text-sm font-medium text-white/90">5-Star Rated Service</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-white/90">7 Days (6 AM - 9 PM)</span>
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

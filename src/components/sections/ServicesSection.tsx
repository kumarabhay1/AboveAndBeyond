"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, vehicleCategories } from "@/data/services";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import {
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  ChevronDown,
  Car,
  Layers,
  Calendar,
} from "lucide-react";

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Packages" },
    { id: "full", label: "Signature Full Detail" },
    { id: "coating", label: "Ceramic Coatings" },
    { id: "interior", label: "Interior Deep Restoration" },
    { id: "exterior", label: "Exterior Wash & Wax" },
  ];

  const filteredServices =
    activeCategory === "all"
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <SectionAtmosphere />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-4">
            <Shield className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Pinnacle Detailing Packages
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-foreground tracking-tight">
            Tailored Detailing <span className="text-gradient-orange">For Every Vehicle</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Whether you need showroom-grade paint correction or a deep cabin refresh, our technicians arrive with state-of-the-art steam and ceramic equipment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#ff5500] to-[#ff7733] text-white shadow-lg shadow-[#ff5500]/30 scale-105"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-Column Independent Masonry Streams: Expanding one card NEVER creates empty voids in adjacent column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column Stream (Even items) */}
          <div className="flex flex-col gap-8">
            {filteredServices
              .filter((_, index) => index % 2 === 0)
              .map((service) => renderServiceCard(service))}
          </div>

          {/* Right Column Stream (Odd items) */}
          <div className="flex flex-col gap-8">
            {filteredServices
              .filter((_, index) => index % 2 === 1)
              .map((service) => renderServiceCard(service))}
          </div>
        </div>

      </div>
    </section>
  );

  function renderServiceCard(service: (typeof servicesData)[0]) {
    const isExpanded = expandedCardId === service.id;

    return (
      <TiltCard
        key={service.id}
        id={service.id}
        className={`bg-card border rounded-3xl overflow-hidden glass-card transition-all duration-300 flex flex-col group ${
          isExpanded
            ? "border-[#ff5500] shadow-[0_20px_50px_rgba(255,85,0,0.2)]"
            : "border-border hover:border-[#ff5500]/50 shadow-xl"
        }`}
      >
        {/* Image Stage with Gradient & Badges */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.title} - Above and Beyond Car Detailing`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
              {service.duration}
            </span>

            {service.badge && (
              <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] text-white shadow-lg">
                {service.badge}
              </span>
            )}
          </div>

          {/* Card Title Header Overlay */}
          <div className="absolute bottom-4 left-5 right-5 z-10">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase tracking-wide group-hover:text-[#ff5500] transition-colors">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 font-medium line-clamp-1 mt-0.5">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Compact Preview Checklist (First 3 Key Features) */}
          {!isExpanded && (
            <div className="space-y-2 pt-1">
              {service.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-foreground/85">
                  <div className="w-4 h-4 rounded-full bg-[#ff5500]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#ff5500]" />
                  </div>
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Expanding View Transition Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden space-y-5 pt-2 border-t border-border"
              >
                {/* Complete Package Feature Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff5500] mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Complete Inclusions Checklist:</span>
                  </h4>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/85">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#ff5500]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#ff5500]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vehicle Categories Serviced */}
                <div className="p-4 rounded-2xl bg-secondary/50 dark:bg-black/40 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                      <Car className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>Vehicles We Service:</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">Price differs by size & condition</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                    {vehicleCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-2.5 rounded-xl bg-card border border-border flex items-center gap-2"
                      >
                        <Car className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                        <span className="text-xs font-bold text-foreground line-clamp-1">{cat.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
                    * Base starting price mentioned below. Exact price varies according to vehicle size and condition.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanding Toggle Button & Bottom Actions */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold block">
                Base Starting Price
              </span>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500] leading-none mt-0.5">
                ${service.startingPrice}
              </div>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
                * Differs by size & condition
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* View Transition Expand Button */}
              <button
                type="button"
                onClick={() => toggleExpand(service.id)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-foreground font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Collapse" : "Full Details"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#ff5500] transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Direct Booking CTA */}
              <Link
                href={`/contact?service=${service.id}`}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#ff661a] hover:to-[#ff884d] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </TiltCard>
    );
  }
}

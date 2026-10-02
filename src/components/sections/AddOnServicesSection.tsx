"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { addOnServices } from "@/data/pricing";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  PlusCircle,
  Sparkles,
  Clock,
  Zap,
  Dog,
  Sun,
  Shield,
  Wind,
  Droplets,
  ChevronDown,
  ArrowRight,
  Check,
} from "lucide-react";

export function AddOnServicesSection() {
  const [expandedAddonId, setExpandedAddonId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-4 h-4 text-[#ff5500]" />;
      case "Dog":
        return <Dog className="w-4 h-4 text-[#ff5500]" />;
      case "Sun":
        return <Sun className="w-4 h-4 text-[#ff5500]" />;
      case "Shield":
        return <Shield className="w-4 h-4 text-[#ff5500]" />;
      case "Wind":
        return <Wind className="w-4 h-4 text-[#ff5500]" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4 text-[#ff5500]" />;
      default:
        return <Droplets className="w-4 h-4 text-[#ff5500]" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedAddonId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="add-ons" className="py-20 bg-background relative overflow-hidden border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
              <PlusCircle className="w-4 h-4 text-[#ff5500]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
                Custom Enhancements
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-foreground">
              Specialized <span className="text-gradient-orange">Add-On Services</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-xl">
              Combine these specialized treatments with any main detailing package for maximum vehicle protection and freshness.
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-secondary border border-border text-xs font-bold text-foreground hover:bg-muted transition-colors"
          >
            <span>Customize Booking</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ff5500]" />
          </Link>
        </div>

        {/* Add-ons 3-Column Independent Streams: Expanding one card NEVER creates empty voids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col gap-6">
            {addOnServices
              .filter((_, i) => i % 3 === 0)
              .map((addon) => renderAddonCard(addon))}
          </div>
          <div className="flex flex-col gap-6">
            {addOnServices
              .filter((_, i) => i % 3 === 1)
              .map((addon) => renderAddonCard(addon))}
          </div>
          <div className="flex flex-col gap-6">
            {addOnServices
              .filter((_, i) => i % 3 === 2)
              .map((addon) => renderAddonCard(addon))}
          </div>
        </div>

      </div>
    </section>
  );

  function renderAddonCard(addon: (typeof addOnServices)[0]) {
    const isExpanded = expandedAddonId === addon.id;

    return (
      <TiltCard
        key={addon.id}
        className={`rounded-3xl bg-card border glass-card transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
          isExpanded
            ? "border-[#ff5500] shadow-[0_15px_40px_rgba(255,85,0,0.18)]"
            : "border-border hover:border-[#ff5500]/50 shadow-xl"
        }`}
      >
        <div>
          {/* Image Stage */}
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={addon.image}
              alt={`${addon.name} - Above and Beyond Detailing`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Badge & Icon */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center">
                {getIcon(addon.iconName)}
              </div>
            </div>

            <span className="absolute top-3.5 right-3.5 text-xs font-display font-extrabold px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] text-white shadow-lg z-10">
              {addon.price}
            </span>

            {/* Title Overlay */}
            <div className="absolute bottom-3 left-4 right-4 z-10">
              <h3 className="font-outfit font-bold text-lg text-white group-hover:text-[#ff5500] transition-colors">
                {addon.name}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {addon.description}
            </p>

            {/* Expanding View Transition Details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pt-3 mt-3 border-t border-border space-y-2 text-xs text-foreground/85"
                >
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                    <span>Professional grade chemicals & dedicated equipment.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                    <span>Can be seamlessly bundled with any package.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-5 pt-0">
          <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
            <span className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>{addon.duration}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleExpand(addon.id)}
                className="px-2.5 py-1 rounded-full bg-secondary hover:bg-muted text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer border border-border"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Less" : "Info"}</span>
                <ChevronDown
                  className={`w-3 h-3 text-[#ff5500] transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <Link
                href="/contact"
                className="px-3 py-1 rounded-full bg-[#ff5500]/15 hover:bg-[#ff5500] text-[#ff5500] hover:text-white font-bold text-[11px] uppercase tracking-wider transition-all"
              >
                + Add
              </Link>
            </div>
          </div>
        </div>
      </TiltCard>
    );
  }
}

"use client";

import React from "react";
import { coverageStats } from "@/data/serviceAreas";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { ServiceAreaMap } from "@/components/ui/ServiceAreaMap";
import { Navigation, Clock } from "lucide-react";

export function ServiceAreaSection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <SectionAtmosphere />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
            <Navigation className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Inland Empire, Orange County & Greater SoCal
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-foreground tracking-tight">
            Where We <span className="text-gradient-orange">Operate</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            We bring our 100% self-powered mobile detailing rig directly to your home, office, or jobsite across 14+ major cities with water & power onboard.
          </p>

          {/* Operating Hours & Days Banner */}
          <div className="mt-5 inline-flex items-center gap-4 bg-card border border-border px-5 py-2 rounded-full text-xs text-foreground shadow-sm">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>7:00 AM – 8:00 PM</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-[#ff5500] font-bold">7 Days a Week (Mon - Sun)</span>
          </div>
        </div>

        {/* Coverage Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border glass-card text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              {coverageStats.radiusMiles}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-semibold">Service Radius</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border glass-card text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              {coverageStats.citiesServed}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-semibold">Suburbs & Cities</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border glass-card text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              7 Days
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-semibold">7:00 AM - 8:00 PM</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border glass-card text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              {coverageStats.satisfactionRate}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-semibold">Customer Satisfaction</div>
          </div>
        </div>

        {/* Interactive Google Map Showcase */}
        <div>
          <ServiceAreaMap />
        </div>

      </div>
    </section>
  );
}



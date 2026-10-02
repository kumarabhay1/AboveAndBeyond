"use client";

import React, { useState } from "react";
import Link from "next/link";
import { serviceCities, coverageStats } from "@/data/serviceAreas";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { MapPin, Navigation, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function ServiceAreaSection() {
  const [selectedCityId, setSelectedCityId] = useState<string>(serviceCities[0].id);

  const selectedCity = serviceCities.find(c => c.id === selectedCityId) || serviceCities[0];

  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] relative overflow-hidden">
      <SectionAtmosphere />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
            <Navigation className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Inland Empire & SoCal Coverage
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            Where We <span className="text-gradient-orange">Operate</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base">
            We provide full mobile detailing service across Riverside, San Bernardino, Moreno Valley, and surrounding Southern California communities.
          </p>
        </div>

        {/* Coverage Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-[#121214] border border-white/10 glass-card text-center">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              {coverageStats.radiusMiles}
            </div>
            <div className="text-xs text-zinc-400 mt-1 font-semibold">Service Radius</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#121214] border border-white/10 glass-card text-center">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              {coverageStats.citiesServed}
            </div>
            <div className="text-xs text-zinc-400 mt-1 font-semibold">Suburbs & Cities</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#121214] border border-white/10 glass-card text-center">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              $0
            </div>
            <div className="text-xs text-zinc-400 mt-1 font-semibold">Travel Surcharges</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#121214] border border-white/10 glass-card text-center">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
              {coverageStats.satisfactionRate}
            </div>
            <div className="text-xs text-zinc-400 mt-1 font-semibold">Customer Satisfaction</div>
          </div>
        </div>

        {/* Interactive Cities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* City Selection Pills Column */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            {serviceCities.map((city) => {
              const active = selectedCityId === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityId(city.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    active
                      ? "bg-[#ff5500]/15 border-[#ff5500] text-white shadow-lg shadow-[#ff5500]/20 scale-[1.02]"
                      : "bg-[#121214] border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className={`w-5 h-5 ${active ? "text-[#ff5500]" : "text-zinc-500"}`} />
                    <div>
                      <div className="font-outfit font-bold text-sm text-white">{city.name}</div>
                      <div className="text-[11px] text-zinc-400">{city.county}</div>
                    </div>
                  </div>
                  {city.popular && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#ff5500] text-white uppercase">
                      Hub
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected City Detail Card */}
          <div className="lg:col-span-7 bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-8 glass-card">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="text-xs font-extrabold uppercase text-[#ff5500] tracking-wider">
                  Active Service Zone
                </div>
                <h3 className="text-3xl font-display font-extrabold text-white uppercase">
                  {selectedCity.name} <span className="text-zinc-500 text-lg">({selectedCity.county})</span>
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                {selectedCity.travelFee}
              </span>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {selectedCity.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase text-zinc-400 mb-3">Popular Neighborhoods Served:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCity.landmarks.map((lm, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-200">
                    📍 {lm}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase text-zinc-400 mb-3">Zip Codes Included:</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCity.zipCodes.map((zip) => (
                  <span key={zip} className="px-2.5 py-1 rounded-lg bg-[#ff5500]/10 text-[#ff5500] font-mono text-xs font-bold">
                    {zip}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/contact?area=${selectedCity.id}`}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e64a19] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Book Mobile Detail in {selectedCity.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

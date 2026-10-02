"use client";

import React, { useState } from "react";
import Link from "next/link";
import { serviceCities, coverageStats } from "@/data/serviceAreas";
import { siteConfig } from "@/data/site";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Car
} from "lucide-react";

export function ServiceAreaMap() {
  const [activeCityId, setActiveCityId] = useState<string>("riverside");
  const activeCity = serviceCities.find(c => c.id === activeCityId) || serviceCities[0];

  // Dynamic Google Maps Embed Query based on active selected city
  const mapQuery = encodeURIComponent(
    `${activeCity.name}, CA, USA`
  );

  return (
    <div className="w-full bg-card border border-border rounded-3xl overflow-hidden glass-card shadow-2xl relative">
      {/* Top Banner Info */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-secondary/80 via-card to-secondary/80 border-b border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ff5500]/15 border border-[#ff5500]/30 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-[#ff5500]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase text-[#ff5500] tracking-wider">
                100% Mobile & Self-Powered Van
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-foreground uppercase">
              Southern California Coverage Map
            </h3>
          </div>
        </div>

        {/* Operating Hours & Days Badge */}
        <div className="flex items-center gap-3 bg-secondary border border-border px-3.5 py-1.5 rounded-2xl text-xs text-muted-foreground">
          <Clock className="w-4 h-4 text-[#ff5500]" />
          <div>
            <span className="font-bold text-foreground">7:00 AM – 8:00 PM</span>
            <span className="text-muted-foreground ml-1.5">(7 Days a Week)</span>
          </div>
        </div>
      </div>

      {/* Main Map Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Interactive City List (Scrollable / Selectable) */}
        <div className="lg:col-span-4 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-border max-h-[480px] overflow-y-auto space-y-2 custom-scrollbar">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1 flex items-center justify-between">
            <span>Select Service Location ({serviceCities.length})</span>
            <span className="text-[#ff5500]">Click to view map</span>
          </div>

          <div className="space-y-1.5">
            {serviceCities.map((city) => {
              const isSelected = activeCityId === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setActiveCityId(city.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#ff5500]/15 border border-[#ff5500] text-foreground shadow-md shadow-[#ff5500]/20 scale-[1.01]"
                      : "bg-secondary/40 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#ff5500]" : "text-muted-foreground"}`} />
                    <div>
                      <div className={`font-outfit text-xs sm:text-sm font-bold ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                        {city.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{city.county}</div>
                    </div>
                  </div>

                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "text-[#ff5500] translate-x-0.5" : "text-muted-foreground opacity-0 group-hover:opacity-100"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Embedded Google Map & Location Details */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          
          {/* Responsive Map Container */}
          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] bg-background">
            <iframe
              title={`Above and Beyond Detailing Service Area - ${activeCity.name}`}
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0 filter grayscale-[25%] contrast-[110%] opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
              allowFullScreen
            />

            {/* Overlay Active City Badge */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-card/95 backdrop-blur-md border border-border p-3 rounded-2xl shadow-xl z-10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#ff5500] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground uppercase">{activeCity.name}, CA</div>
                <div className="text-[10px] text-muted-foreground">Mobile Unit Stationed & Dispatched Daily</div>
              </div>
            </div>
          </div>

          {/* Location Summary Bar */}
          <div className="p-4 sm:p-5 bg-card border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Serving: </span>
              {activeCity.landmarks.slice(0, 3).join(", ")}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="px-4 py-2 rounded-xl bg-secondary hover:bg-muted border border-border text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>Call Dispatch</span>
              </a>

              <Link
                href={`/contact?area=${activeCity.id}`}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#ff661a] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#ff5500]/25 transition-all"
              >
                <span>Book in {activeCity.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Vehicles & Pricing Disclaimer Footer */}
      <div className="p-4 bg-secondary/40 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-[#ff5500] shrink-0" />
          <span>
            <strong className="text-foreground">Supported Vehicles:</strong> Sedan, Small SUV, Big SUV, Truck, Semi-Truck, Van, RVs
          </span>
        </div>

        <div className="text-[11px] text-muted-foreground font-medium">
          * Starting price shown. Final pricing differs based on vehicle size & condition.
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { Check, Clock, Sparkles, ArrowRight, Shield } from "lucide-react";

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Packages" },
    { id: "full", label: "Signature Full Detail" },
    { id: "coating", label: "Ceramic Coatings" },
    { id: "interior", label: "Interior Deep Restoration" },
    { id: "exterior", label: "Exterior Wash & Wax" },
  ];

  const filteredServices = activeCategory === "all"
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] relative overflow-hidden">
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
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            Tailored Detailing <span className="text-gradient-orange">For Every Vehicle</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Whether you need showroom-grade paint correction or a deep cabin refresh, our technicians use state-of-the-art steam and ceramic equipment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/30 scale-105"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service Cards Grid with 3D Tilt Multi-Layer Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <TiltCard
              key={service.id}
              id={service.id}
              className="bg-[#121214] border border-white/10 rounded-3xl overflow-hidden glass-card transition-all duration-300 hover:border-[#ff5500]/50 flex flex-col group h-full"
            >
              {/* Image & Badge Layer */}
              <div className="relative h-64 w-full overflow-hidden">
                <div data-parallax-img className="w-full h-full relative transition-transform duration-500">
                  <Image
                    src={service.image}
                    alt={`${service.title} - Above and Beyond Car Detailing`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent" />
                
                {service.badge && (
                  <span className="absolute top-4 right-4 text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#ff5500] text-white shadow-lg z-10">
                    {service.badge}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white uppercase">{service.title}</h3>
                    <p className="text-xs text-zinc-300 font-medium">{service.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Package Content Layer Floating in Z-Space */}
              <div data-parallax-content className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                
                {/* Description & Features List */}
                <div>
                  <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff5500] mb-3">
                    Package Features Includes:
                  </h4>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
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

                {/* Footer Price & CTA */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-1 text-xs text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="text-2xl font-display font-extrabold text-[#ff5500] mt-0.5">
                      Starting at ${service.startingPrice}
                    </div>
                  </div>

                  <Link
                    href={`/contact?service=${service.id}`}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e64a19] hover:to-[#ff5500] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/25 transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}

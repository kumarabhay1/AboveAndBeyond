import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { assetsData } from "@/data/assets";
import { ServicesList } from "@/components/sections/ServicesList";
import { AddOnServicesSection } from "@/components/sections/AddOnServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { Sparkles, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Mobile Detailing & Ceramic Coatings | Inland Empire & SoCal",
  description: "Explore our complete range of mobile auto detailing packages in Riverside, Moreno Valley, San Bernardino, and Southern California. 100% self-powered mobile units with purified water and onboard power.",
  keywords: [
    "mobile car detailing services Riverside",
    "interior car detailing Inland Empire",
    "paint correction San Bernardino",
    "9H ceramic coating Moreno Valley",
    "mobile auto wash and wax SoCal"
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Rich Dark Hero Stage - Vehicle Image Fully Visible with Crisp White Text */}
      <section className="relative min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden bg-[#0c0c0e] pt-28 md:pt-36 lg:pt-40 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={assetsData.ceramicCoatingBg}
            alt="Above and Beyond Mobile Detailing Services"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Rich Dark Backdrop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/60" />
        </div>

        <SectionAtmosphere />
        
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/20 text-[#ff8542] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Pinnacle Care For Every Vehicle</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-4 text-white drop-shadow-md">
            OUR DETAILING <span className="text-gradient-orange">PACKAGES</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 dark:text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Professional mobile detailing brought directly to your home or office across Riverside, the Inland Empire, and Southern California.
          </p>
        </div>

        {/* Localized Bottom Transition Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
      </section>

      {/* Main Interactive Services List with Search & Filtering */}
      <ServicesList />

      {/* Specialized Add-ons */}
      <AddOnServicesSection />

      {/* 4-Step Process */}
      <ProcessSection />

      {/* Final Call to Action */}
      <CTASection />
    </>
  );
}

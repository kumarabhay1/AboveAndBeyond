import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { assetsData } from "@/data/assets";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { MobileHighlightSection } from "@/components/sections/MobileHighlightSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { MapPin, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas | Riverside, Inland Empire & Southern California",
  description: "Above and Beyond Car Detailing provides 100% self-powered mobile auto detailing across Riverside, Moreno Valley, San Bernardino, Fontana, Chino, Ontario, and Southern California.",
  keywords: [
    "mobile detailing Riverside CA",
    "mobile car detailing Inland Empire",
    "auto detailing Moreno Valley",
    "mobile car wash San Bernardino",
    "car detailing Fontana"
  ],
  alternates: {
    canonical: `${siteConfig.url}/service-areas`,
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      {/* Rich Dark Hero Stage */}
      <section className="relative min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden bg-[#0c0c0e] pt-28 md:pt-36 lg:pt-40 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={assetsData.mobileVanImage}
            alt="Mobile Detailing Service Areas"
            fill
            className="object-cover opacity-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/60" />
        </div>

        <SectionAtmosphere />
        
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/20 text-[#ff8542] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Navigation className="w-3.5 h-3.5 text-primary" />
            <span>We Come Directly To Your Doorstep</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-4 text-white drop-shadow-md">
            SERVICE <span className="text-gradient-orange">AREAS</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 dark:text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Providing fully equipped mobile car detailing across Riverside, San Bernardino, and surrounding Southern California areas.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
      </section>

      {/* Interactive Service Area Zone Browser */}
      <ServiceAreaSection />

      {/* Mobile Van Capability Showcase */}
      <MobileHighlightSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Call to Action */}
      <CTASection />
    </>
  );
}

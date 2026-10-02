import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { assetsData } from "@/data/assets";
import { GalleryList } from "@/components/gallery/GalleryList";
import { CTASection } from "@/components/sections/CTASection";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { Sparkles, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Transformation Gallery | Above and Beyond Car Detailing",
  description: "View our recent auto detailing, 9H ceramic coating, paint correction, and interior steam restoration transformations across Riverside, Inland Empire, and Southern California.",
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <>
      {/* Rich Dark Hero Stage */}
      <section className="relative min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden bg-[#0c0c0e] pt-28 md:pt-36 lg:pt-40 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={assetsData.gallery[0]?.image || assetsData.heroBgImage}
            alt="Mobile Detailing Transformation Gallery"
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
            <Camera className="w-3.5 h-3.5 text-primary" />
            <span>Real Showroom Transformations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-4 text-white drop-shadow-md">
            OUR WORK <span className="text-gradient-orange">GALLERY</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 dark:text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Explore real vehicle transformations delivered directly to client driveways and office locations across Riverside, San Bernardino, and Southern California.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
      </section>

      {/* Filterable Gallery with Lightbox */}
      <section className="py-16 md:py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <GalleryList />
        </div>
      </section>

      {/* Call to Action */}
      <CTASection />
    </>
  );
}

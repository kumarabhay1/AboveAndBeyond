"use client";

import React, { useState } from "react";
import Image from "next/image";
import { testimonialsData, overallStats } from "@/data/testimonials";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { SectionDivider } from "@/components/ui/section-divider";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const activeReview = testimonialsData[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-background relative border-t border-b border-border overflow-hidden">
      <SectionAtmosphere />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#ff5500] text-[#ff5500]" />
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Verified Customer Reviews
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-foreground tracking-tight">
            WHAT OUR <span className="text-gradient-orange">CLIENTS SAY</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base">
            Trusted by luxury car owners, busy families, and auto collectors across the Inland Empire & Southern California.
          </p>
        </div>

        {/* Testimonial Spotlight Slider */}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 sm:p-12 glass-card relative shadow-2xl">
          
          <Quote className="w-16 h-16 text-[#ff5500]/15 absolute top-6 right-6 pointer-events-none" />

          <div className="flex items-center space-x-1 mb-4">
            {[...Array(activeReview.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#ff5500] text-[#ff5500]" />
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl font-outfit font-bold text-foreground mb-4">
            "{activeReview.title}"
          </h3>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 italic">
            "{activeReview.comment}"
          </p>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {activeReview.avatar && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff5500]/60 shrink-0">
                  <Image
                    src={activeReview.avatar}
                    alt={activeReview.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="font-outfit font-bold text-base text-foreground flex items-center gap-1.5">
                  <span>{activeReview.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#ff5500]" />
                </div>
                <div className="text-xs text-muted-foreground">
                  {activeReview.vehicle} • <span className="text-muted-foreground/80">{activeReview.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end space-x-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary border border-border text-[#ff5500]">
                {activeReview.serviceUsed}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={prevReview}
                  className="p-2.5 rounded-xl bg-secondary hover:bg-[#ff5500]/20 hover:text-[#ff5500] text-muted-foreground border border-border transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-2.5 rounded-xl bg-secondary hover:bg-[#ff5500]/20 hover:text-[#ff5500] text-muted-foreground border border-border transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
      <SectionDivider variant="subtle" className="absolute bottom-0 left-0 right-0 pointer-events-none" />
    </section>
  );
}

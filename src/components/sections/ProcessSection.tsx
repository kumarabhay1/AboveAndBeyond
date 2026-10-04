"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { TiltCard } from "@/components/ui/TiltCard";
import { Calendar, Truck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Select Service & Schedule",
      description: "Pick your vehicle type, select your detailing package & add-ons, and choose your preferred date and arrival window.",
      icon: <Calendar className="w-6 h-6 text-[#ff5500]" />,
    },
    {
      step: "02",
      title: "Mobile Van Arrives On-Site",
      description: "Harbaz Hundal & our mobile detailing team arrive at your home or workplace with our fully self-contained unit (water & power onboard).",
      icon: <Truck className="w-6 h-6 text-[#ff5500]" />,
    },
    {
      step: "03",
      title: "Precision Cleaning & Protection",
      description: "We perform careful pre-washing, deep interior vacuuming, surface sanitization, stain extraction, and high-gloss wax or ceramic sealant application.",
      icon: <CheckCircle2 className="w-6 h-6 text-[#ff5500]" />,
    },
    {
      step: "04",
      title: "Final Inspection & Reveal",
      description: "We conduct a thorough quality inspection with you to ensure your vehicle looks spotless and truly goes Above and Beyond.",
      icon: <CheckCircle2 className="w-6 h-6 text-[#ff5500]" />,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <SectionAtmosphere />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              The Above & Beyond Difference
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-foreground tracking-tight">
            How Our Mobile <span className="text-gradient-orange">Process Works</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base">
            From booking to final inspection, we make professional car care effortless and convenient across Southern California.
          </p>
        </motion.div>

        {/* 4-Step Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <TiltCard
                className="h-full p-6 rounded-3xl bg-card border border-border glass-card relative flex flex-col justify-between hover:border-[#ff5500]/50 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#ff5500]/10 border border-[#ff5500]/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-display text-4xl font-extrabold text-muted-foreground/30 dark:text-zinc-700 group-hover:text-[#ff5500]/60 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-outfit font-bold text-xl text-foreground mb-2 group-hover:text-[#ff5500] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center text-[11px] font-bold text-[#ff5500] space-x-1">
                  <span>Step {item.step} Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

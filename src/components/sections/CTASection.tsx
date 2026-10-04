"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Phone, ShieldCheck, ArrowRight, Truck } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff5500]/10 via-transparent to-[#ff5500]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ff5500]/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-zinc-900 via-[#141417] to-zinc-950 border border-[#ff5500]/40 rounded-3xl p-8 sm:p-14 glass-card shadow-2xl relative overflow-hidden text-center text-white"
        >
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#ff5500]/15 border border-[#ff5500]/30 mb-6">
            <Truck className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Mobile Detailing Unit Standing By in SoCal
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase text-white tracking-tight max-w-4xl mx-auto">
            DON’T JUST WASH YOUR VEHICLE, <br />
            <span className="text-gradient-orange">GO ABOVE AND BEYOND.</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base md:text-lg">
            Book your appointment online or call Harbaz Hundal directly at <span className="text-white font-bold">{siteConfig.phone}</span>. Mobile service available 7:00 AM - 8:00 PM (7 Days a Week) across the Inland Empire & Southern California!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e64a19] hover:to-[#ff5500] text-white font-extrabold text-base tracking-wider uppercase shadow-2xl shadow-[#ff5500]/40 transition-all flex items-center justify-center space-x-2 hover:scale-105 cursor-pointer"
            >
              <span>Book Your Detail Now</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>

            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-base transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Phone className="w-5 h-5 text-[#ff5500]" />
              <span>Call {siteConfig.phone}</span>
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" /> 100% Satisfaction Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" /> 100% Self-Powered Mobile Rig
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" /> 7:00 AM - 8:00 PM Seven Days a Week
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

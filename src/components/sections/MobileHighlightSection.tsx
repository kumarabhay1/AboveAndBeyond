import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { assetsData } from "@/data/assets";
import { Truck, Droplets, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

export function MobileHighlightSection() {
  const highlights = [
    {
      title: "100% Self-Contained Water Supply",
      desc: "Our mobile rigs carry onboard purified water tanks. No water hookups or outdoor faucets needed!",
      icon: <Droplets className="w-5 h-5 text-[#ff5500]" />
    },
    {
      title: "Onboard Generator Power",
      desc: "Commercial high-power extractors, steam sanitizers, and dual-action polishers operate independently.",
      icon: <Zap className="w-5 h-5 text-[#ff5500]" />
    },
    {
      title: "Professional Steam & Shampoo Cleaning",
      desc: "Heated steam and hot-water extraction lift stubborn stains, spills, road grime, and odors effortlessly.",
      icon: <CheckCircle2 className="w-5 h-5 text-[#ff5500]" />
    },
    {
      title: "Serving Inland Empire & SoCal",
      desc: "Riverside, Moreno Valley, San Bernardino, Fontana, Ontario, Chino, Victorville, OC, and Los Angeles.",
      icon: <ShieldCheck className="w-5 h-5 text-[#ff5500]" />
    }
  ];

  return (
    <section className="py-20 bg-[#09090b] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25">
              <Truck className="w-4 h-4 text-[#ff5500]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
                Professional Mobile Detailing
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white leading-tight">
              WE BRING THE <span className="text-gradient-orange">DETAILING SHOP TO YOU</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              No waiting in line or spending hours at a traditional detailing shop. Harbaz Hundal & the Above & Beyond Car Detailing mobile unit arrive directly at your driveway or corporate workplace fully equipped with water, power, and professional equipment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 glass-card">
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    {h.icon}
                    <h3 className="font-outfit font-bold text-sm text-white">{h.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-400">{h.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#e64a19] hover:to-[#ff5500] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#ff5500]/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Book Mobile Unit Now</span>
              </Link>

              <a
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>WhatsApp Harbaz Directly</span>
              </a>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/10 glass-card shadow-2xl">
              <Image
                src={assetsData.mobileVanImage}
                alt="Above and Beyond Car Detailing Mobile Van Unit"
                fill
                className="object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#121214]/90 backdrop-blur-md border border-white/15">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff5500] flex items-center justify-center text-white font-bold text-lg">
                    ★
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-white text-base">Hassle-Free Mobile Service</h4>
                    <p className="text-xs text-zinc-300">Parked at your home or office. Done while you relax or work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

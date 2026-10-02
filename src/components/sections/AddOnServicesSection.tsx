import React from "react";
import Image from "next/image";
import Link from "next/link";
import { addOnServices } from "@/data/pricing";
import { TiltCard } from "@/components/ui/TiltCard";
import { PlusCircle, Sparkles, Clock, Zap, Dog, Sun, Shield, Wind, Droplets } from "lucide-react";

export function AddOnServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-4 h-4 text-[#ff5500]" />;
      case "Dog": return <Dog className="w-4 h-4 text-[#ff5500]" />;
      case "Sun": return <Sun className="w-4 h-4 text-[#ff5500]" />;
      case "Shield": return <Shield className="w-4 h-4 text-[#ff5500]" />;
      case "Wind": return <Wind className="w-4 h-4 text-[#ff5500]" />;
      case "Sparkles": return <Sparkles className="w-4 h-4 text-[#ff5500]" />;
      default: return <Droplets className="w-4 h-4 text-[#ff5500]" />;
    }
  };

  return (
    <section id="add-ons" className="py-20 bg-[#09090b] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
              <PlusCircle className="w-4 h-4 text-[#ff5500]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
                Custom Enhancements
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white">
              Specialized <span className="text-gradient-orange">Add-On Services</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Combine these specialized treatments with any main detailing package for maximum vehicle protection and freshness.
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors"
          >
            <span>Customize Booking</span>
          </Link>
        </div>

        {/* Add-ons Grid with TiltCard and Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOnServices.map((addon) => (
            <TiltCard
              key={addon.id}
              className="rounded-3xl bg-[#121214] border border-white/10 glass-card hover:border-[#ff5500]/50 transition-all duration-300 flex flex-col justify-between group h-full overflow-hidden shadow-xl"
            >
              <div>
                {/* Image Stage */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div data-parallax-img className="w-full h-full relative transition-transform duration-500">
                    <Image
                      src={addon.image}
                      alt={`${addon.name} - Above and Beyond Detailing`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/25 to-transparent" />
                  
                  {/* Badge & Icon */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <div className="w-9 h-9 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      {getIcon(addon.iconName)}
                    </div>
                  </div>

                  <span className="absolute top-3.5 right-3.5 text-xs font-display font-extrabold px-3 py-1 rounded-full bg-[#ff5500] text-white shadow-lg z-10">
                    {addon.price}
                  </span>
                </div>

                {/* Content */}
                <div data-parallax-content className="p-6">
                  <h3 className="font-outfit font-bold text-lg text-white group-hover:text-[#ff5500] transition-colors">
                    {addon.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{addon.duration}</span>
                  </span>
                  <Link
                    href="/contact"
                    className="text-[#ff5500] font-bold group-hover:underline"
                  >
                    + Add to Package
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

import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { assetsData } from "@/data/assets";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Award, 
  Star, 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  HeartHandshake, 
  Clock, 
  MapPin, 
  Truck,
  Droplets,
  Zap,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Above & Beyond Car Detailing | Owner Harbaz Hundal",
  description: "Learn about Above & Beyond Car Detailing, professional mobile car detailing serving the Inland Empire, Riverside, Moreno Valley, San Bernardino, Orange County, and Los Angeles.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const values = [
    { title: "Quality Workmanship", desc: "We take pride in doing every detail right the first time with high-end tools, techniques, and premium chemical sealants.", icon: <Award className="w-5 h-5 text-primary" /> },
    { title: "Attention to Detail", desc: "From deep crevices in door jambs to carpet fiber extraction and streak-free windows, no spot is overlooked.", icon: <CheckCircle2 className="w-5 h-5 text-primary" /> },
    { title: "Honest & Reliable Service", desc: "Transparent upfront pricing, honest vehicle condition assessments, and dependability you can count on.", icon: <Shield className="w-5 h-5 text-primary" /> },
    { title: "Professionalism", desc: "Punctual arrivals, respectful client communication, and utmost care for your vehicle as if it were our own.", icon: <Star className="w-5 h-5 text-primary" /> },
    { title: "Customer Convenience", desc: "We bring our 100% self-contained mobile detailing rig directly to your home, office, or job site.", icon: <Clock className="w-5 h-5 text-primary" /> },
    { title: "Customer Satisfaction", desc: "Our primary objective is 100% customer delight. We don't consider the job done until you are thrilled.", icon: <HeartHandshake className="w-5 h-5 text-primary" /> },
  ];

  const expertise = [
    "Interior car detailing & deep steam sanitization",
    "High-temperature commercial steam cleaning",
    "Carpet and upholstery hot shampoo extraction",
    "Two-bucket pH-neutral exterior hand washing",
    "Paint enhancement & multi-stage machine scratch reduction",
    "Headlight restoration & UV clear coat sealing",
    "Windshield hydrophobic glass cleaning & coating",
    "Engine bay degreasing & protective dressing",
    "Pet hair extraction & organic odor elimination",
    "Full complete vehicle transformation packages",
  ];

  return (
    <>
      {/* Rich Dark Hero Stage */}
      <section className="relative min-h-[380px] md:min-h-[440px] flex items-center justify-center overflow-hidden bg-[#0c0c0e] pt-28 md:pt-36 lg:pt-40 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={assetsData.heroBgImage}
            alt="About Above and Beyond Car Detailing"
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
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Southern California Mobile Detailing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-4 text-white drop-shadow-md">
            ABOUT <span className="text-gradient-orange">ABOVE & BEYOND</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 dark:text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
      </section>

      {/* Main Story & Founder Spotlight */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            
            <div className="lg:col-span-5 relative">
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-border glass-card shadow-2xl">
                <Image
                  src={assetsData.mobileVanImage}
                  alt="Above and Beyond Car Detailing Specialist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-xl">
                  <div className="font-outfit font-bold text-lg text-foreground">{siteConfig.owner}</div>
                  <div className="text-xs text-primary font-bold">Owner & Lead Detailing Specialist</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Inland Empire & Southern California</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  The Founder's Story
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-foreground leading-tight">
                HOW ABOVE & BEYOND <span className="text-gradient-orange">STARTED</span>
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Above & Beyond Car Detailing is a professional mobile car detailing company serving the Inland Empire and surrounding areas of Southern California. We bring high-quality automotive detailing directly to your home, workplace, or preferred location, making it easier and more convenient to keep your vehicle looking its best.
              </p>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Founded by {siteConfig.owner}, our mission is built on precision, honesty, and unmatched convenience. Instead of spending hours in waiting rooms, our clients relax or continue working while our self-contained mobile units meticulously restore their vehicles from bumper to bumper.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book an Appointment <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href={`tel:${siteConfig.phoneRaw}`}>
                    <Phone className="w-4 h-4 mr-2 text-primary" /> Call {siteConfig.phone}
                  </a>
                </Button>
              </div>

            </div>

          </div>

          {/* Why We Are Different */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-foreground">
                Why We're <span className="text-primary">Different</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Engineered for maximum client convenience and showroom-level perfection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border glass-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase text-foreground mb-2">100% Mobile Service</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    We arrive with our own spot-free purified water supply and commercial power generators. You don't need to provide any utility hookups.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border glass-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Droplets className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase text-foreground mb-2">Studio-Grade Chemicals</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    We use top-tier pH-neutral shampoos, heated steam sanitizers, 9H nano-ceramic coatings, and gentle non-abrasive microfiber towels.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border glass-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase text-foreground mb-2">7 Days a Week Availability</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Operating from 7:00 AM to 8:00 PM every day of the week to fit around busy family and executive work schedules.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-foreground">
                Our Core <span className="text-primary">Values</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                The standards that guide every vehicle detail we perform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div key={i} className="p-6 rounded-3xl bg-card border border-border glass-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {v.icon}
                    </div>
                    <h3 className="font-outfit font-bold text-base text-foreground">{v.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 10-Point Expertise Checklist */}
          <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border glass-card shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-foreground mb-6">
              Our Professional <span className="text-primary">Detailing Expertise</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertise.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4-Step Process Section */}
      <ProcessSection />

      {/* Final Call to Action */}
      <CTASection />
    </>
  );
}

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tierComparisons } from "@/data/pricing";
import { assetsData } from "@/data/assets";
import { siteConfig } from "@/data/site";
import { AddOnServicesSection } from "@/components/sections/AddOnServicesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { Button } from "@/components/ui/button";
import { Check, X, Shield, ArrowRight, Star, Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Package Comparison | Inland Empire & SoCal Mobile Detailing",
  description: "Transparent auto detailing pricing and package comparison table for Above and Beyond Car Detailing in Riverside, San Bernardino, and Southern California.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Rich Dark Hero Stage */}
      <section className="relative min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden bg-[#0c0c0e] pt-28 md:pt-36 lg:pt-40 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={assetsData.heroBgImage}
            alt="Mobile Detailing Pricing Packages"
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
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Zero Hidden Fees • 100% Mobile Service</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-4 text-white drop-shadow-md">
            TRANSPARENT <span className="text-gradient-orange">PRICING</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 dark:text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Professional mobile car detailing delivered directly to your doorstep in Southern California. Clear packages, honest rates, and showroom results.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
      </section>

      {/* Main Tier Cards Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Important Pricing & Condition Banner */}
          <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-primary/10 border border-primary/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-foreground/90">
                <span className="font-bold text-primary uppercase block sm:inline sm:mr-1">Transparent Pricing Notice:</span>
                Prices shown below are base starting rates. Final quotes differ based on vehicle size (<strong className="text-foreground">Sedan, Small SUV, Big SUV, Truck, Semi-Truck, Van, RVs</strong>) and paint/interior condition.
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-foreground font-semibold shrink-0">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>7:00 AM – 8:00 PM (7 Days)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
            
            {/* Exterior Care Card */}
            <div className="p-8 rounded-3xl bg-card border border-border glass-card flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Exterior Care
                </span>
                <h3 className="text-2xl font-display font-bold uppercase text-foreground">
                  Full Exterior Detail
                </h3>
                
                <div className="mt-4 flex items-baseline gap-1 text-primary">
                  <span className="text-4xl font-display font-extrabold">$69</span>
                  <span className="text-xs text-muted-foreground font-semibold">/ starting</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Estimated: 1 - 2 Hours</span>
                </div>

                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Pre-wash soak, oils/grease removal, hand contact wash, wheel & rim scrub, and 4-6 month wax coat.
                </p>
              </div>

              <div className="pt-8">
                <Button asChild variant="outline" className="w-full h-12 font-bold uppercase text-xs tracking-wider">
                  <Link href="/contact?service=full-exterior-detail">
                    Select Exterior ($69) <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Featured Tier - Full Vehicle Detail */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-primary/15 via-card to-card border-2 border-primary glass-card flex flex-col justify-between relative shadow-2xl scale-100 md:scale-105">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full bg-primary text-white shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Most Popular • Best Value
              </span>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Complete 360° Package
                </span>
                <h3 className="text-2xl font-display font-bold uppercase text-foreground">
                  Full Vehicle Detail
                </h3>

                <div className="mt-4 flex items-baseline gap-1 text-primary">
                  <span className="text-4xl font-display font-extrabold">$169</span>
                  <span className="text-xs text-muted-foreground font-semibold">/ starting</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Estimated: 3 - 5 Hours</span>
                </div>

                <p className="text-sm text-foreground/90 mt-4 leading-relaxed font-medium">
                  Combines both Full Exterior Detail & Full Interior Detail for a complete showroom-fresh vehicle transformation.
                </p>
              </div>

              <div className="pt-8">
                <Button asChild size="lg" className="w-full h-12 font-extrabold uppercase text-xs tracking-wider shadow-lg shadow-primary/30">
                  <Link href="/contact?service=full-vehicle-detail">
                    Select Full Detail ($169) <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Interior Care Card */}
            <div className="p-8 rounded-3xl bg-card border border-border glass-card flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Deep Cabin Clean
                </span>
                <h3 className="text-2xl font-display font-bold uppercase text-foreground">
                  Full Interior Detail
                </h3>

                <div className="mt-4 flex items-baseline gap-1 text-primary">
                  <span className="text-4xl font-display font-extrabold">$129</span>
                  <span className="text-xs text-muted-foreground font-semibold">/ starting</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Estimated: 2 - 3 Hours</span>
                </div>

                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Deep vacuum, seat & carpet clean, dashboard & console wax conditioning, and full steam sanitization.
                </p>
              </div>

              <div className="pt-8">
                <Button asChild variant="outline" className="w-full h-12 font-bold uppercase text-xs tracking-wider">
                  <Link href="/contact?service=full-interior-detail">
                    Select Interior ($129) <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>

          {/* Feature Comparison Table */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 glass-card overflow-x-auto shadow-sm mb-16">
            <div className="mb-6">
              <h3 className="text-2xl font-display font-bold uppercase text-foreground">
                Detailed Package Feature Comparison
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Compare treatments included across each detailing level.
              </p>
            </div>

            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-xs font-extrabold uppercase text-muted-foreground">
                  <th className="py-4 px-4">Feature / Treatment</th>
                  <th className="py-4 px-4 text-center">Exterior ($69)</th>
                  <th className="py-4 px-4 text-center">Interior ($129)</th>
                  <th className="py-4 px-4 text-center text-primary bg-primary/5 rounded-t-xl">Full Vehicle ($169)</th>
                  <th className="py-4 px-4 text-center">Correction / Ceramic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tierComparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-secondary/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-foreground/90">{row.feature}</td>
                    
                    <td className="py-3.5 px-4 text-center text-xs">
                      {typeof row.exterior === "boolean" ? (
                        row.exterior ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground font-semibold">{row.exterior}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center text-xs">
                      {typeof row.interior === "boolean" ? (
                        row.interior ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground font-semibold">{row.interior}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center text-xs bg-primary/5">
                      {typeof row.fullVehicle === "boolean" ? (
                        row.fullVehicle ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      ) : (
                        <span className="text-primary font-bold">{row.fullVehicle}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center text-xs">
                      {typeof row.ceramicCorrection === "boolean" ? (
                        row.ceramicCorrection ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                      ) : (
                        <span className="text-foreground font-semibold">{row.ceramicCorrection}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Add-on Services Section */}
      <AddOnServicesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}

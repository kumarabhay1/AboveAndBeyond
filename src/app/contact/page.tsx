import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { assetsData } from "@/data/assets";
import { ContactForm } from "@/components/forms/ContactForm";
import { ServiceAreaMap } from "@/components/ui/ServiceAreaMap";
import { FAQSection } from "@/components/sections/FAQSection";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Shield, 
  ShieldCheck,
  Truck,
  Sparkles 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Book Auto Detailing Appointment | Above and Beyond Car Detailing",
  description: "Schedule your mobile detailing or ceramic coating service with Above and Beyond Car Detailing in Riverside, San Bernardino, and the Inland Empire. Call +1 (951) 529-0564 or book online.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Rich Dark Hero Stage */}
      <section className="relative min-h-[360px] md:min-h-[420px] flex items-center justify-center overflow-hidden bg-[#0c0c0e] pt-28 md:pt-36 lg:pt-40 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={assetsData.heroBgImage}
            alt="Book Detailing Appointment"
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
            <span>Direct Concierge Reservation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-4 text-white drop-shadow-md">
            BOOK YOUR <span className="text-gradient-orange">APPOINTMENT</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-zinc-200 dark:text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Reserve your preferred date & time window below or contact Harbaz Hundal directly via phone or WhatsApp.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
      </section>

      {/* Main Booking Content */}
      <section className="py-16 md:py-24 bg-background min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Main Booking Wizard Column */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>

            {/* Direct Contact Details Side Card */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 glass-card space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

                <h3 className="text-xl font-display font-bold text-foreground uppercase border-b border-border pb-4">
                  Direct Contact
                </h3>

                <div className="space-y-4">
                  <a 
                    href={`tel:${siteConfig.phoneRaw}`} 
                    className="flex items-center gap-4 group p-3.5 rounded-2xl bg-secondary/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Direct Call / SMS</div>
                      <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {siteConfig.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={siteConfig.getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 group p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[11px] text-emerald-500 font-bold uppercase tracking-wider">Instant Response</div>
                      <div className="text-sm font-bold text-emerald-400 group-hover:underline">
                        WhatsApp Harbaz Hundal
                      </div>
                    </div>
                  </a>

                  <a 
                    href={`mailto:${siteConfig.email}`} 
                    className="flex items-center gap-4 group p-3.5 rounded-2xl bg-secondary/30 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Email Inquiries</div>
                      <div className="text-xs font-bold text-foreground hover:text-primary transition-colors break-all">
                        {siteConfig.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-secondary/20 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Primary Service Area</div>
                      <div className="text-xs font-bold text-foreground">
                        {siteConfig.address.region}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-secondary/20 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Operating Hours</div>
                      <div className="text-xs font-bold text-foreground">
                        7 Days a Week (7:00 AM - 8:00 PM)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>100% Satisfaction Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <span>Self-powered mobile van (water & electricity onboard)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Service Area & Coverage Map Section */}
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                Where We Detail
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-foreground">
                Mobile Service <span className="text-primary">Coverage Map</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Serving Riverside, Moreno Valley, Fontana, San Bernardino, Victorville, Chino, Rancho Cucamonga, Ontario, Orange, Yorba Linda, Santa Ana, Los Angeles, Santa Monica, & surrounding areas.
              </p>
            </div>

            <ServiceAreaMap />
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FAQSection />
    </>
  );
}

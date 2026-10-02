import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { servicesData, vehicleCategories } from "@/data/services";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { CTASection } from "@/components/sections/CTASection";
import { 
  Check, 
  ChevronRight, 
  Clock, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Truck,
  Car
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    return {
      title: "Package Not Found",
    };
  }

  return {
    title: `${service.title} | ${siteConfig.name}`,
    description: `${service.tagline} Professional mobile detailing delivered directly to your home or office in Inland Empire & SoCal.`,
    alternates: {
      canonical: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Service Hero Banner Stage */}
      <section className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-end pb-12 pt-32 md:pt-36 lg:pt-40 overflow-hidden bg-[#0c0c0e]">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-80"
            sizes="100vw"
            priority
          />
          {/* Dark Backdrop Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/60" />
        </div>

        <SectionAtmosphere />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-xs sm:text-sm text-zinc-300 mb-4 font-semibold drop-shadow-sm">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-zinc-400" />
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-zinc-400" />
            <span className="text-primary font-bold">{service.title}</span>
          </div>
          
          <div className="max-w-3xl">
            {service.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-extrabold uppercase tracking-wider mb-3 shadow-md">
                {service.badge}
              </span>
            )}
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white uppercase mb-3 drop-shadow-md">
              {service.title}
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-200 font-medium mb-6 leading-relaxed drop-shadow-sm max-w-2xl">
              {service.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="px-5 py-2.5 rounded-2xl bg-[#ff5500]/20 border border-[#ff5500]/40 backdrop-blur-md">
                <span className="text-[10px] uppercase font-bold text-zinc-300 block">Starting at</span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#ff5500]">
                  ${service.startingPrice}
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold">
                <Clock className="w-4 h-4 text-primary" />
                <span>Estimated: {service.duration}</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold">
                <Truck className="w-4 h-4 text-primary" />
                <span>100% Mobile Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Localized Bottom Transition Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
      </section>

      {/* Main Details & Inclusions */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Package Overview */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-foreground mb-4">
                  Package <span className="text-primary">Overview</span>
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Inclusions Checklist */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border glass-card shadow-sm">
                <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider mb-6 pb-3 border-b border-border">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Comprehensive Checklist What's Included:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle Size Price Guide */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-foreground">
                      Vehicle Size <span className="text-primary">Pricing Guide</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Pricing scales based on vehicle surface area, cabin volume, and time required.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {vehicleCategories.slice(0, 4).map((vc) => {
                    const estimatedPrice = Math.round(service.startingPrice * vc.multiplier);
                    return (
                      <div key={vc.id} className="p-4 rounded-2xl bg-card border border-border text-center">
                        <Car className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-outfit font-bold text-sm text-foreground">{vc.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{vc.description}</div>
                        <div className="mt-3 text-xl font-display font-extrabold text-primary">
                          ${estimatedPrice}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Sticky Booking Sidebar */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border glass-card shadow-2xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Selected Package
                  </span>
                  <h3 className="text-2xl font-display font-bold uppercase text-foreground">
                    {service.title}
                  </h3>
                  <div className="text-3xl font-display font-extrabold text-primary mt-2">
                    Starting at ${service.startingPrice}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    * Final price depends on vehicle condition and size tier.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <Button asChild size="lg" className="w-full h-12 text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/25">
                    <Link href={`/contact?service=${service.id}`}>
                      Book This Package <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full h-12 text-sm font-semibold">
                    <a href={`tel:${siteConfig.phoneRaw}`}>
                      <Phone className="w-4 h-4 mr-2 text-primary" /> Call {siteConfig.phone}
                    </a>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full h-12 text-sm font-semibold border-emerald-500/30 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
                    <a href={siteConfig.getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2 text-emerald-500" /> WhatsApp Harbaz
                    </a>
                  </Button>
                </div>

                <div className="pt-4 border-t border-border space-y-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>100% Satisfaction Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <span>We come to your home or workplace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>Available 7 Days (6:00 AM - 9:00 PM)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}

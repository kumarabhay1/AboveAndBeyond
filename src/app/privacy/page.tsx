import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Above and Beyond Car Detailing",
  description: "Privacy policy for Above and Beyond Car Detailing mobile car detailing services in Southern California.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen relative overflow-hidden">
      <SectionAtmosphere />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border glass-card shadow-xl space-y-8">
          <div className="border-b border-border pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Legal Protection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-foreground tracking-tight">
              PRIVACY <span className="text-primary">POLICY</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Last updated: October 2026</p>
          </div>

          <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
            <p>
              At <strong className="text-foreground">{siteConfig.name}</strong>, owned and operated by <strong className="text-foreground">{siteConfig.owner}</strong>, we respect your privacy and are committed to protecting the personal information you share with us when booking our mobile car detailing services.
            </p>

            <div>
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">1. Information We Collect</h2>
              <p>
                When you submit an appointment request via our online booking wizard, WhatsApp, or phone call, we collect information such as your name, phone number, email address, vehicle type, and service address in Southern California.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">2. How We Use Your Information</h2>
              <p>
                We use your information exclusively to schedule, confirm, and perform mobile detailing appointments, communicate route arrival updates via SMS or WhatsApp, and provide customer support. We do NOT sell, rent, or distribute your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">3. Information Security</h2>
              <p>
                We implement appropriate electronic and physical safeguards to maintain the safety of your personal details. Access to appointment records is restricted to authorized personnel managing dispatch and service delivery.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">4. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact Harbaz Hundal directly:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li>• Email: <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline font-semibold">{siteConfig.email}</a></li>
                <li>• Phone: <a href={`tel:${siteConfig.phoneRaw}`} className="text-primary hover:underline font-semibold">{siteConfig.phone}</a></li>
                <li>• Location: {siteConfig.address.region}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

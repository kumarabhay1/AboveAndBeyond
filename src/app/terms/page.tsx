import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Above and Beyond Car Detailing",
  description: "Terms of service for Above and Beyond Car Detailing mobile detailing appointments in Southern California.",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
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
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Service Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-foreground tracking-tight">
              TERMS OF <span className="text-primary">SERVICE</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Last updated: October 2026</p>
          </div>

          <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
            <p>
              Welcome to <strong className="text-foreground">{siteConfig.name}</strong>. By scheduling an appointment or using our mobile car detailing services in Southern California, you agree to the following terms and conditions.
            </p>

            <div>
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">1. Appointment Requests & Confirmation</h2>
              <p>
                Online booking submissions represent requested time windows. Our owner Harbaz Hundal or dispatch team will contact you via your selected notification method (SMS text or WhatsApp) to confirm your exact arrival window based on daily route scheduling.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">2. Vehicle Condition & Pricing</h2>
              <p>
                Starting prices reflect standard condition vehicles. Heavy bio-hazards, extreme pet hair, excessive mud, or severe stains may require additional time and cost, which will be transparently discussed and approved with you prior to commencing work.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">3. Mobile Service Access & Utilities</h2>
              <p>
                Our mobile detailing van is 100% self-powered with onboard water and electricity. Clients must ensure adequate parking space and safe vehicle access at the provided home or workplace address.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">4. Cancellations & Rescheduling</h2>
              <p>
                We kindly request at least 24 hours notice for cancellations or rescheduling to allow us to open the mobile van slot to other waiting clients across Southern California.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-xl font-display font-bold uppercase text-foreground mb-2">5. Contact Information</h2>
              <p>
                For inquiries regarding our service terms, please contact:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li>• Owner: {siteConfig.owner}</li>
                <li>• Email: <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline font-semibold">{siteConfig.email}</a></li>
                <li>• Phone: <a href={`tel:${siteConfig.phoneRaw}`} className="text-primary hover:underline font-semibold">{siteConfig.phone}</a></li>
                <li>• Region: {siteConfig.address.region}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

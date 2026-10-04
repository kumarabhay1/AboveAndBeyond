"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Phone, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background relative overflow-hidden px-4 py-24 sm:py-32">
      <SectionAtmosphere />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full bg-card border border-border rounded-3xl p-8 sm:p-12 glass-card space-y-6 text-center shadow-2xl relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl sm:text-7xl font-display font-extrabold text-primary tracking-tight block">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground uppercase tracking-tight">
            Page Not Found
          </h1>
        </div>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          The detailing page or route you are looking for does not exist or has been relocated. Let's get your vehicle back on track.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="font-extrabold uppercase text-xs tracking-wider shadow-lg shadow-primary/25">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="font-bold text-xs uppercase tracking-wider">
            <Link href="/services">
              <Sparkles className="w-4 h-4 mr-2 text-primary" /> All Services
            </Link>
          </Button>
        </div>

        <div className="pt-6 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Need immediate assistance?</span>
          <a href={`tel:${siteConfig.phoneRaw}`} className="text-primary hover:underline font-bold inline-flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

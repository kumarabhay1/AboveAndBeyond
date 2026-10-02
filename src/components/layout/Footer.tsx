import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  ArrowUpRight 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-white/10 text-zinc-400 text-sm relative overflow-hidden">
      {/* Background Subtle Orange Aura */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center shrink-0 group">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Above and Beyond Car Detailing Logo"
                  fill
                  className="object-contain filter drop-shadow-[0_0_15px_rgba(255,85,0,0.3)]"
                />
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-[#ff5500]/20 hover:border-[#ff5500] hover:text-[#ff5500] text-zinc-300 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-[#ff5500]/20 hover:border-[#ff5500] hover:text-[#ff5500] text-zinc-300 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-emerald-400 text-zinc-300 flex items-center justify-center transition-all cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-zinc-500">
              Owned & Operated by <span className="text-zinc-300 font-bold">{siteConfig.owner}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-outfit font-bold uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="hover:text-[#ff5500] transition-colors flex items-center space-x-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#ff5500] transition-colors">
                  Detailing Packages
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#ff5500] transition-colors">
                  Pricing & Add-ons
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-[#ff5500] transition-colors">
                  Service Areas (SoCal)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#ff5500] transition-colors">
                  Transformation Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ff5500] transition-colors">
                  About Harbaz & Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ff5500] transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Detailing Services */}
          <div className="space-y-4">
            <h4 className="text-white font-outfit font-bold uppercase tracking-wider text-sm">
              Core Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services#full-vehicle-detail" className="hover:text-[#ff5500] transition-colors">
                  Full Vehicle Detail ($169)
                </Link>
              </li>
              <li>
                <Link href="/services#full-interior-detail" className="hover:text-[#ff5500] transition-colors">
                  Full Interior Detail ($129)
                </Link>
              </li>
              <li>
                <Link href="/services#full-exterior-detail" className="hover:text-[#ff5500] transition-colors">
                  Full Exterior Detail ($69)
                </Link>
              </li>
              <li>
                <Link href="/services#paint-correction" className="hover:text-[#ff5500] transition-colors">
                  Paint Correction ($249)
                </Link>
              </li>
              <li>
                <Link href="/services#ceramic-coating" className="hover:text-[#ff5500] transition-colors">
                  Ceramic Coating ($399)
                </Link>
              </li>
              <li>
                <Link href="/services#headlight-restoration" className="hover:text-[#ff5500] transition-colors">
                  Headlight Restoration ($89)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-white font-outfit font-bold uppercase tracking-wider text-sm">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="text-white hover:text-[#ff5500] font-bold transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <span>{siteConfig.address.region}</span>
              </li>
              <li className="flex items-start space-x-3 pt-2">
                <Clock className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  {siteConfig.hours.map((h, i) => (
                    <div key={i} className="text-zinc-300">
                      <span className="font-semibold">{h.days}:</span> {h.time}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Quality That Shows.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

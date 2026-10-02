"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/ui/search-bar";
import { FilterChips } from "@/components/ui/filter-chips";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock, Phone, Sparkles } from "lucide-react";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/data/site";
import { TiltCard } from "@/components/ui/TiltCard";

export function ServicesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Category mapping for readable labels
  const categoryLabels: Record<string, string> = {
    full: "Full Detailing",
    interior: "Interior",
    exterior: "Exterior",
    coating: "Ceramic Coating",
    restoration: "Restoration"
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(servicesData.map(s => s.category)));
    return cats.map(c => categoryLabels[c] || c);
  }, []);

  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
      const label = categoryLabels[service.category] || service.category;
      const matchesSearch = 
        searchQuery === "" || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        activeCategory === null || 
        label === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Search & Filter Controls */}
        <div className="mb-14 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search detailing packages..."
            />
            <div className="flex-shrink-0 w-full md:w-auto">
              <FilterChips 
                categories={categories} 
                activeCategory={activeCategory} 
                onSelect={setActiveCategory} 
              />
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center justify-between">
            <span>Showing {filteredServices.length} {filteredServices.length === 1 ? 'package' : 'packages'}</span>
            {(searchQuery || activeCategory) && (
              <button onClick={clearFilters} className="text-primary hover:underline font-semibold cursor-pointer">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Showcase */}
        <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    key={service.id}
                    className="group"
                  >
                    <TiltCard className="p-6 sm:p-8 lg:p-10 bg-card border border-border rounded-3xl glass-card transition-all duration-300 hover:border-primary/40 shadow-xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                      
                      {/* Image Stage */}
                      <div className={`w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div data-parallax-img className="w-full h-full relative transition-transform duration-500">
                          <Image 
                            src={service.image} 
                            alt={`${service.title} - Mobile Auto Detailing Transformation`} 
                            fill 
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Price Badge */}
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10">
                          <div>
                            <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest block mb-0.5">Starting at</span>
                            <span className="text-3xl font-display font-extrabold text-white drop-shadow-md">
                              ${service.startingPrice}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span>{service.duration}</span>
                          </div>
                        </div>

                        {service.badge && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-extrabold uppercase tracking-wider shadow-lg">
                              {service.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Stage */}
                      <div data-parallax-content className={`w-full lg:w-1/2 flex flex-col justify-between space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">
                              {categoryLabels[service.category] || service.category}
                            </span>
                          </div>
                          
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-foreground uppercase mb-2">
                            <Link href={`/services/${service.slug}`} className="hover:text-primary transition-colors">
                              {service.title}
                            </Link>
                          </h2>
                          
                          <p className="text-sm font-medium text-muted-foreground mb-4">
                            {service.tagline}
                          </p>
                          
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Features Checklist */}
                          <div className="space-y-2.5 pt-2 border-t border-border/80">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                              Package Highlights:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-foreground/90">
                              {service.features.slice(0, 6).map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                  <span className="line-clamp-2">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-border/80 flex flex-wrap items-center gap-3">
                          <Button asChild size="lg" className="flex-1 sm:flex-none">
                            <Link href={`/contact?service=${service.id}`}>
                              Book Service <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          
                          <Button asChild variant="outline" size="lg" className="flex-1 sm:flex-none">
                            <Link href={`/services/${service.slug}`}>
                              View Details
                            </Link>
                          </Button>

                          <Button asChild variant="ghost" size="lg" className="hidden sm:inline-flex">
                            <a href={`tel:${siteConfig.phoneRaw}`}>
                              <Phone className="w-4 h-4 mr-2 text-primary" /> Call Direct
                            </a>
                          </Button>
                        </div>

                      </div>

                    </TiltCard>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-card border border-border rounded-3xl">
                <p className="text-xl font-bold mb-2">No detailing packages found</p>
                <p className="text-muted-foreground text-sm mb-6">Try adjusting your search criteria or category filter.</p>
                <Button onClick={clearFilters} variant="outline">Reset Filters</Button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

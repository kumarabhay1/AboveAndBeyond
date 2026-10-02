"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assetsData } from "@/data/assets";
import { TiltCard } from "@/components/ui/TiltCard";
import { X, Sparkles, Maximize2 } from "lucide-react";

export function GalleryList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof assetsData.gallery[0] | null>(null);

  const categories = ["All", "Ceramic Coating", "Interior Detail", "Paint Correction", "Exterior Wash", "Engine Bay"];

  const filteredItems = activeCategory === "All"
    ? assetsData.gallery
    : assetsData.gallery.filter(item => item.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter Chips */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? "bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/30 scale-105"
                : "bg-secondary text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid with Framer Motion popLayout */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard
                onClick={() => setSelectedImage(item)}
                className="bg-card border border-border rounded-3xl overflow-hidden glass-card group transition-all duration-300 hover:border-[#ff5500]/60 flex flex-col h-full shadow-lg"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <div data-parallax-img className="w-full h-full relative transition-transform duration-500">
                    <Image
                      src={item.image}
                      alt={`${item.title} - Above and Beyond Auto Detailing`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  <span className="absolute top-4 right-4 text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#ff5500] text-white shadow-md z-10">
                    {item.tag}
                  </span>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#ff5500] text-white flex items-center justify-center shadow-xl">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div data-parallax-content className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500]">
                      {item.category}
                    </span>
                    <h3 className="font-outfit font-bold text-xl text-foreground mt-1 group-hover:text-[#ff5500] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Immersive Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-card border border-border rounded-3xl overflow-hidden glass-card shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#ff5500] transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-[65vh] w-full">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
                    {selectedImage.category} • {selectedImage.tag}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-foreground uppercase mt-1">
                    {selectedImage.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

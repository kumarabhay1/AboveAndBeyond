"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal, Sparkles } from "lucide-react";

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export function BeforeAfter({
  beforeImage = "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
  afterImage = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
  beforeLabel = "BEFORE (Paint Swirls & Oxidation)",
  afterLabel = "AFTER (2-Stage Correction & 9H Ceramic)",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden select-none border border-white/10 glass-card shadow-2xl cursor-ew-resize group"
    >
      {/* AFTER Image (Full Layer) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt="After Paint Correction"
          fill
          className="object-cover"
        />
        <span className="absolute top-4 right-4 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full bg-[#ff5500] text-white shadow-lg z-10 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {afterLabel}
        </span>
      </div>

      {/* BEFORE Image (Clipped Overlay Layer) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage}
          alt="Before Paint Restoration"
          fill
          className="object-cover filter brightness-90 contrast-90"
        />
        <span className="absolute top-4 left-4 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/20 text-zinc-300 backdrop-blur-md shadow-lg z-10">
          {beforeLabel}
        </span>
      </div>

      {/* Vertical Slider Handle Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff5500] via-[#ff7700] to-[#ff5500] z-20 shadow-[0_0_15px_rgba(255,85,0,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Floating Grab Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#121214] border-2 border-[#ff5500] text-[#ff5500] flex items-center justify-center shadow-xl shadow-[#ff5500]/40 group-hover:scale-110 transition-transform">
          <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

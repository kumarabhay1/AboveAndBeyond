"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetsData } from "@/data/assets";

interface HeroBackgroundProps {
  videoUrl?: string;
  posterUrl?: string;
}

export function HeroBackground({
  videoUrl = assetsData.heroVideo,
  posterUrl = assetsData.heroBgImage,
}: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Only attempt video load on client after idle or slight delay to keep TTI instant
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;

      video.src = videoUrl;
      video.load();
      video.play().catch(() => {});
    }, 200);

    return () => clearTimeout(timer);
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#0c0c0e]">
      {/* High-Performance Masterpiece Photography Layer */}
      <Image
        src={posterUrl}
        alt="Above and Beyond Luxury Mobile Car Detailing"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-right sm:object-[70%_center] md:object-[80%_center] lg:object-right filter brightness-[0.88] contrast-[1.08] transition-opacity duration-700 ${
          videoLoaded ? "opacity-0" : "opacity-90"
        }`}
      />

      {/* Lightweight Background Video Overlay (Smooth fade when ready) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        onPlaying={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover object-right filter brightness-[0.88] contrast-[1.10] transition-opacity duration-700 ${
          videoLoaded ? "opacity-75" : "opacity-0"
        }`}
      />

      {/* Cinematic Multi-Directional Gradient Vignettes for Maximum Typography Contrast */}
      {/* Left-to-right vignette: Deep black behind text on left, translucent over vehicle on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e] via-[#0c0c0e]/85 sm:via-[#0c0c0e]/60 md:via-[#0c0c0e]/50 to-transparent pointer-events-none z-10" />

      {/* Top-to-bottom vignette: Seamless blend beneath floating navbar and bottom section transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0e]/90 via-transparent to-[#0c0c0e] pointer-events-none z-10" />

      {/* Signature Atmospheric Vivid Burnt Orange Ambient Lighting */}
      <div
        className="absolute -top-24 -left-24 w-[550px] h-[550px] pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, rgba(255,85,0,0.18) 0%, rgba(255,85,0,0.03) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, rgba(255,85,0,0.12) 0%, rgba(255,85,0,0.02) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}

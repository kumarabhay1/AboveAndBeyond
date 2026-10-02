"use client";

import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: any = null;

    if (videoUrl.endsWith(".m3u8")) {
      import("hls.js")
        .then((HlsModule) => {
          const Hls = HlsModule.default;
          if (Hls.isSupported()) {
            hlsInstance = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
            });
            hlsInstance.loadSource(videoUrl);
            hlsInstance.attachMedia(video);
            hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play().catch(() => {});
            });
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoUrl;
            video.addEventListener("loadedmetadata", () => {
              video.play().catch(() => {});
            });
          }
        })
        .catch(() => {
          video.src = videoUrl;
        });
    } else {
      video.src = videoUrl;
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#0c0c0e]">
      {/* Background Video (Instant load with HLS or Direct MP4 fallback) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-80 filter brightness-90 contrast-110 transition-opacity duration-700"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Cinematic Multi-Directional Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-[#0c0c0e]/60 to-black/30 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0e]/70 via-transparent to-[#0c0c0e] pointer-events-none z-10" />

      {/* Signature Atmospheric Vivid Burnt Orange Ambient Lighting */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-[#ff5500]/12 rounded-full blur-[140px] pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#ff5500]/08 rounded-full blur-[160px] pointer-events-none z-10" />
    </div>
  );
}

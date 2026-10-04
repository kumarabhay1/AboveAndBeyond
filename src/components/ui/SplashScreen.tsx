"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("STARTING MOBILE RIG ENGINE...");

  useEffect(() => {
    // Prevent background scrolling while splash is active
    document.body.style.overflow = "hidden";

    // 60FPS High-Precision Animation Loop using requestAnimationFrame
    const startTime = performance.now();
    const DURATION = 1800; // 1.8 seconds smooth glide
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / DURATION, 1);

      // Smooth custom easeInOut curve for organic sports car acceleration & deceleration
      const eased =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      const currentPercent = Math.min(Math.round(eased * 100), 100);
      setProgress(currentPercent);

      // Dynamic cinematic status updates matching the car speed
      if (currentPercent < 25) {
        setStatusText("IGNITING MOBILE RIG ENGINE...");
      } else if (currentPercent < 55) {
        setStatusText("LOADING SPOT-FREE WATER & ONBOARD POWER...");
      } else if (currentPercent < 85) {
        setStatusText("CALIBRATING 9H CERAMIC & STEAM RESTORATION...");
      } else if (currentPercent < 100) {
        setStatusText("APPLYING ULTRA SHOWROOM GLOSS...");
      } else {
        setStatusText("READY FOR PERFECTION.");
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Hold at 100% briefly (350ms) so user perceives complete transformation, then dismiss smoothly
        const exitTimer = setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "";
        }, 350);

        return () => clearTimeout(exitTimer);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setIsVisible(false);
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070709] text-white select-none overflow-hidden will-change-transform"
        >
          {/* Background Ambient Glow Nebulas */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff5500]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[380px] h-[380px] bg-[#ff7733]/10 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#ff3300]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Precision Laser Grid Background Texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"
            style={{
              maskImage:
                "radial-gradient(ellipse 65% 55% at 50% 50%, #000 70%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 55% at 50% 50%, #000 70%, transparent 100%)",
            }}
          />

          {/* Quick Skip Button (Top-Right) */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-300 hover:text-white text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
            aria-label="Skip intro splash screen"
          >
            <span>Skip</span>
            <span className="text-[#ff5500]">➔</span>
          </button>

          {/* Center Brand Showcase Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full">
            {/* High-Resolution Emblem with Dual Orbiting Holographic Rings */}
            <div className="relative mb-6 sm:mb-8">
              {/* Outer Spinning Dash Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 sm:-inset-8 rounded-full border border-[#ff5500]/30 border-dashed pointer-events-none"
              />
              {/* Counter-Spinning Subtle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 sm:-inset-12 rounded-full border border-white/10 pointer-events-none"
              />

              {/* Central Glowing Emblem */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center justify-center"
                style={{ width: "130px", height: "130px", maxWidth: "100%" }}
              >
                <Image
                  src="/logo.png"
                  alt="Above and Beyond Car Detailing"
                  width={130}
                  height={130}
                  priority
                  className="w-28 h-28 sm:w-32 sm:h-32 object-contain filter drop-shadow-[0_0_35px_rgba(255,85,0,0.7)] drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                />
              </motion.div>
            </div>

            {/* Editorial Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-1 mb-8"
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-white">
                ABOVE & BEYOND
              </h1>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-[#ff5500]">
                <span>CAR DETAILING</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-zinc-300">SOUTHERN CALIFORNIA</span>
              </div>
            </motion.div>

            {/* ========================================================= */}
            {/* 🏎️ CAR-THEMED DRIVING PROGRESS LOADER STAGE               */}
            {/* ========================================================= */}
            <div className="w-full max-w-sm sm:max-w-md space-y-3 px-2">
              
              {/* Car Driving Runway Container */}
              <div className="relative w-full pt-8 pb-2">
                
                {/* 🚗 The Aerodynamic Exotic Sports Car (Glides 0% -> 100% perfectly bounded) */}
                <div
                  className="absolute top-0 pointer-events-none will-change-transform z-20 flex items-center"
                  style={{
                    left: `${progress}%`,
                    transform: `translateX(-${progress}%)`,
                  }}
                >
                  {/* Nitro Fire / Exhaust Boost Trail Behind Car */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center gap-0.5 pr-1 opacity-90">
                    <span className="w-4 h-1 rounded-full bg-gradient-to-l from-[#ff5500] to-transparent animate-pulse" />
                    <span className="w-2 h-0.5 rounded-full bg-[#ffaa00]" />
                  </div>

                  {/* High-Performance Sports Car SVG */}
                  <svg
                    viewBox="0 0 120 40"
                    className="w-12 h-6 sm:w-14 sm:h-7 text-[#ff5500] filter drop-shadow-[0_0_12px_rgba(255,85,0,0.95)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Laser Headlight Gradient */}
                      <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="40%" stopColor="#ff9944" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
                      </linearGradient>
                      {/* Car Body Paint Metallic Finish */}
                      <linearGradient id="carBodyPaint" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff3300" />
                        <stop offset="50%" stopColor="#ff661a" />
                        <stop offset="100%" stopColor="#ff8833" />
                      </linearGradient>
                    </defs>

                    {/* Forward Laser Headlight Beam shooting ahead */}
                    <polygon
                      points="114,23 138,18 138,28"
                      fill="url(#headlightBeam)"
                    />

                    {/* Sports Car Aerodynamic Body Profile */}
                    <path
                      d="M 6,27 L 16,27 C 17.5,22 22,19 27,19 C 32,19 36.5,22 38,27 L 77,27 C 78.5,22 83,19 88,19 C 93,19 97.5,22 99,27 L 111,27 C 114,27 117,24 115,20 L 107,12 C 104,8 97,6 87,6 L 46,6 C 37,6 29,10 23,16 L 9,21 C 5,23 4,27 6,27 Z"
                      fill="url(#carBodyPaint)"
                    />

                    {/* Glass Windshield & Tinted Canopy */}
                    <path
                      d="M 47,8 L 74,8 C 81,8 85,10 87,13 L 95,14 C 92,10 86,8 79,8 L 47,8 Z"
                      fill="#ffffff"
                      opacity="0.9"
                    />
                    <path
                      d="M 29,16 L 45,10 L 45,18 L 25,18 C 26,17.2 27.5,16.5 29,16 Z"
                      fill="#ffffff"
                      opacity="0.55"
                    />

                    {/* Rear Wheel with Glowing Rim */}
                    <circle cx="27" cy="27" r="6.5" fill="#09090b" stroke="#ff5500" strokeWidth="1.8" />
                    <circle cx="27" cy="27" r="2.5" fill="#ffffff" />

                    {/* Front Wheel with Glowing Rim */}
                    <circle cx="88" cy="27" r="6.5" fill="#09090b" stroke="#ff5500" strokeWidth="1.8" />
                    <circle cx="88" cy="27" r="2.5" fill="#ffffff" />

                    {/* Crisp Front LED Headlight */}
                    <circle cx="114" cy="23" r="2" fill="#ffffff" className="animate-pulse" />
                    
                    {/* Tail Light Laser LED */}
                    <circle cx="7" cy="24" r="1.5" fill="#ff2200" />
                  </svg>
                </div>

                {/* 🛣️ The Glowing Highway Tarmac Track */}
                <div className="relative h-2.5 w-full bg-zinc-900/90 rounded-full overflow-hidden p-[1px] border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                  {/* Highway Dashed Center Line */}
                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#ffffff_6px,#ffffff_12px)]"
                  />

                  {/* Active Neon Orange Nitro Track Fill */}
                  <div
                    className="h-full bg-gradient-to-r from-[#ff2200] via-[#ff5500] to-[#ffaa33] rounded-full relative transition-none shadow-[0_0_16px_#ff5500]"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Glowing Leading Laser Edge */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
                  </div>
                </div>

              </div>

              {/* Status Readout & Speedometer-Style Percentage */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-wider pt-1">
                <div className="flex items-center gap-1.5 text-zinc-400 font-semibold truncate pr-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-ping shrink-0" />
                  <span className="truncate">{statusText}</span>
                </div>
                
                <div className="flex items-center gap-1 text-[#ff5500] font-black text-sm shrink-0 drop-shadow-[0_0_8px_rgba(255,85,0,0.6)]">
                  <span>{progress}</span>
                  <span className="text-[10px] text-zinc-400 font-bold">%</span>
                </div>
              </div>

            </div>

            {/* Bottom Motto Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-zinc-400"
            >
              <span className="flex items-center gap-1 text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" /> NOT JUST CLEAN
              </span>
              <span className="text-[#ff5500]">•</span>
              <span className="text-[#ff5500]">BEYOND PERFECTION</span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


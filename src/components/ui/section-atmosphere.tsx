"use client";

import React from "react";

interface SectionAtmosphereProps {
  className?: string;
}

/**
 * Reusable Section Atmosphere Component
 * Adds an extremely subtle, premium atmospheric light overlay at the top of major sections
 * to bridge section transitions smoothly with Harbaz's signature Burnt Orange tone.
 */
export function SectionAtmosphere({ className = "" }: SectionAtmosphereProps) {
  return (
    <div 
      aria-hidden="true"
      className={`section-atmosphere ${className}`} 
    />
  );
}

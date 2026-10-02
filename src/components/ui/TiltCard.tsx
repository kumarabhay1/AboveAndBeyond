"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  tiltMaxX?: number;
  tiltMaxY?: number;
  glareEnabled?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltMaxX = 1.8,
  tiltMaxY = 1.8,
  glareEnabled = false,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDisabled(reducedMotionMq.matches);

    const checkState = () => setIsDisabled(reducedMotionMq.matches);
    reducedMotionMq.addEventListener("change", checkState);
    return () => {
      reducedMotionMq.removeEventListener("change", checkState);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (card) {
        rectRef.current = card.getBoundingClientRect();
        // Remove transform transition during live tracking to eliminate mouse lag
        card.style.transition = "box-shadow 0.25s ease, border-color 0.25s ease";
      }
      onMouseEnter?.(e);
    },
    [onMouseEnter]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      const card = cardRef.current;
      if (!card) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        let rect = rectRef.current;
        if (!rect) {
          rect = card.getBoundingClientRect();
          rectRef.current = rect;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        if (centerX <= 0 || centerY <= 0) return;

        // Subtle, elegant 3D tilt without distortion
        const rotateX = Math.max(-tiltMaxX, Math.min(tiltMaxX, ((y - centerY) / centerY) * -tiltMaxX));
        const rotateY = Math.max(-tiltMaxY, Math.min(tiltMaxY, ((x - centerX) / centerX) * tiltMaxY));

        card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
      });

      onMouseMove?.(e);
    },
    [isDisabled, tiltMaxX, tiltMaxY, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      rectRef.current = null;
      const card = cardRef.current;
      if (card) {
        // Smooth snap back animation when cursor leaves
        card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease";
        card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      }
      onMouseLeave?.(e);
    },
    [onMouseLeave]
  );

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu will-change-transform ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

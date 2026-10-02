"use client";

import React, { useRef, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search packages (e.g. ceramic, interior, wax)...",
  className = ""
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isExpanded = isFocused || Boolean(value);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative flex items-center justify-start ${className}`}>
      {/* Pure CSS Expanding Search Container */}
      <div
        className={`group relative flex items-center h-12 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
          isExpanded
            ? "w-full md:w-[420px] bg-card border border-[#ff5500] shadow-[0_0_24px_rgba(255,85,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] text-foreground"
            : "w-full md:w-[280px] hover:md:w-[340px] bg-secondary/80 dark:bg-white/[0.05] border border-border hover:border-[#ff5500]/50 hover:bg-secondary dark:hover:bg-white/[0.08]"
        }`}
      >
        {/* Animated Magnifying Glass / Morph Icon Button */}
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="relative z-10 w-12 h-12 flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-foreground group-focus-within:text-[#ff5500] transition-colors duration-300 cursor-pointer"
          aria-label="Search"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Search
              className={`w-4 h-4 transition-all duration-500 ease-out ${
                isExpanded ? "scale-110 text-[#ff5500] rotate-90" : "scale-100 text-muted-foreground rotate-0"
              }`}
            />
          </div>
        </button>

        {/* Dynamic Expanding Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClear();
              inputRef.current?.blur();
            }
          }}
          placeholder={placeholder}
          className="w-full h-full bg-transparent text-foreground placeholder:text-muted-foreground text-xs sm:text-sm font-medium pr-10 focus:outline-none transition-all duration-300"
        />

        {/* Morphing Clear (X) Button when query is present */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-secondary dark:bg-white/10 hover:bg-[#ff5500] text-muted-foreground hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:rotate-90"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Ambient Top Highlight */}
        <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-border dark:via-white/20 to-transparent pointer-events-none opacity-50 group-focus-within:via-[#ff5500]/60 transition-opacity" />
      </div>
    </div>
  );
}

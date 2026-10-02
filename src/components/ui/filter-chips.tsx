"use client";

import React from "react";

interface FilterChipsProps {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function FilterChips({ categories, activeCategory, onSelect }: FilterChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
          activeCategory === null
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
            : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
        }`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeCategory === category
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

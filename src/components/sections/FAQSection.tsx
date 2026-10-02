"use client";

import React, { useState } from "react";
import { faqData } from "@/data/faq";
import { SectionAtmosphere } from "@/components/ui/section-atmosphere";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-mobile-1");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "mobile", label: "Mobile Service" },
    { id: "booking", label: "Booking & Hours" },
    { id: "ceramic", label: "Ceramic Coatings" },
    { id: "general", label: "General Questions" },
  ];

  const filteredFaqs = activeCategory === "all"
    ? faqData
    : faqData.filter(f => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0c0c0e] relative overflow-hidden">
      <SectionAtmosphere />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
            <HelpCircle className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Got Questions? We Have Answers.
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            FREQUENTLY ASKED <span className="text-gradient-orange">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base">
            Everything you need to know about our mobile detailing van, 9H ceramic coatings, and booking policies.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#121214] border border-white/10 rounded-2xl overflow-hidden glass-card transition-all duration-200 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer"
                >
                  <span className="font-outfit font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#ff5500]/20 text-[#ff5500]" : "text-zinc-400"}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

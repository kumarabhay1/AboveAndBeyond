"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <SectionAtmosphere />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/25 mb-3">
            <HelpCircle className="w-4 h-4 text-[#ff5500]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500]">
              Got Questions? We Have Answers.
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-foreground tracking-tight">
            FREQUENTLY ASKED <span className="text-gradient-orange">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base">
            Everything you need to know about our mobile detailing van, 9H ceramic coatings, and booking policies.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-card border border-border rounded-2xl overflow-hidden glass-card transition-all duration-200 hover:border-[#ff5500]/40 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer"
                >
                  <span className="font-outfit font-bold text-base sm:text-lg text-foreground">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#ff5500]/20 text-[#ff5500]" : "text-muted-foreground"}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

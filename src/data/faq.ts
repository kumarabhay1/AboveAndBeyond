export interface FAQItem {
  id: string;
  category: "general" | "booking" | "ceramic" | "mobile";
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq-mobile-1",
    category: "mobile",
    question: "Do I need to provide water or electricity for your mobile detailing van?",
    answer: "No! Above and Beyond Car Detailing operates a fully equipped, self-contained mobile detailing rig with onboard spot-free purified water and power. We can detail your car right in your driveway, apartment parking spot, or office lot with zero hassle."
  },
  {
    id: "faq-booking-1",
    category: "booking",
    question: "How does the appointment scheduling work?",
    answer: "When you submit our online booking form, your selected date and time window is recorded as your preferred requested slot. Harbaz Hundal and our team will promptly review our daily route and reach out via your preferred method (WhatsApp or SMS text) to confirm your exact arrival window or offer the nearest available slot."
  },
  {
    id: "faq-services-1",
    category: "general",
    question: "What is included in the Full Vehicle Detail?",
    answer: "Our Full Vehicle Detail ($169 starting) combines our Full Exterior Detail (foam pre-wash, road oils & grease removal, wheel scrub, and 4-6 month wax coating) and Full Interior Detail (high-power vacuuming, seats & carpets cleaning, dashboard & door panel wax conditioning, steering wheel & control sanitization, and crystal glass cleaning)."
  },
  {
    id: "faq-ceramic-1",
    category: "ceramic",
    question: "What is Ceramic Coating and why should I get it?",
    answer: "Ceramic coating ($399 starting) is a liquid nano-ceramic formula that chemically bonds with your vehicle's factory clear coat. It creates an ultra-durable, hydrophobic glass shield that protects against harsh Southern California sun UV damage, oxidation, bird droppings, and light micro-marring while giving your car an incredible candy-like gloss that lasts for years."
  },
  {
    id: "faq-mobile-2",
    category: "mobile",
    question: "What areas in Southern California do you serve?",
    answer: "We proudly serve the entire Inland Empire (Riverside, Moreno Valley, San Bernardino, Fontana, Ontario, Chino, Rancho Cucamonga) as well as Victorville, Yucca Valley, Orange County, and Los Angeles / Santa Monica."
  },
  {
    id: "faq-addons-1",
    category: "general",
    question: "Can I add Pet Hair Removal or Headlight Restoration to my package?",
    answer: "Absolutely! We offer specialized add-on services including Pet Hair Removal ($49), Engine Bay Restoration ($49), Headlight Restoration ($89), Carpet Shampooing ($49), and Windshield Glass Coating ($39) which can be added to any main detail package."
  },
  {
    id: "faq-general-hours",
    category: "general",
    question: "What are your operating hours?",
    answer: "We operate 7 days a week from 6:00 AM to 9:00 PM, giving you maximum flexibility to have your car detailed before work, during office hours, or over the weekend."
  },
  {
    id: "faq-payment-1",
    category: "booking",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, Apple Pay, Zelle, Cash, and Venmo upon completion and inspection of your vehicle."
  }
];

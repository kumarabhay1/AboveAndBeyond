export interface ServiceCity {
  id: string;
  name: string;
  county: string;
  zipCodes: string[];
  travelFee: string;
  popular: boolean;
  description: string;
  landmarks: string[];
}

export const serviceCities: ServiceCity[] = [
  {
    id: "riverside",
    name: "Riverside",
    county: "Inland Empire / Riverside County",
    zipCodes: ["92501", "92503", "92504", "92506", "92507", "92508", "92509"],
    travelFee: "FREE (Primary Hub)",
    popular: true,
    description: "Full mobile detailing van service across Downtown Riverside, Canyon Crest, Orangecrest, Woodcrest, Mission Inn district, and surrounding neighborhoods.",
    landmarks: ["Downtown Riverside", "Mission Inn", "Canyon Crest", "Orangecrest"]
  },
  {
    id: "moreno-valley",
    name: "Moreno Valley",
    county: "Riverside County",
    zipCodes: ["92551", "92553", "92555", "92557"],
    travelFee: "FREE",
    popular: true,
    description: "Mobile auto detailing delivered directly to your driveway or workplace in Sunnymead, Ranch Verde, Box Springs, and Moreno Beach.",
    landmarks: ["Moreno Beach", "Sunnymead Ranch", "Box Springs", "March Air Field area"]
  },
  {
    id: "san-bernardino",
    name: "San Bernardino",
    county: "San Bernardino County",
    zipCodes: ["92401", "92404", "92405", "92407", "92408", "92410"],
    travelFee: "FREE",
    popular: true,
    description: "Complete interior shampoo extraction and exterior gloss wax protection for car owners in San Bernardino, Arrowhead, and Del Rosa.",
    landmarks: ["CSUSB area", "Arrowhead", "Hospitality Lane", "Del Rosa"]
  },
  {
    id: "fontana",
    name: "Fontana",
    county: "San Bernardino County",
    zipCodes: ["92335", "92336", "92337"],
    travelFee: "FREE",
    popular: true,
    description: "High-grade paint correction, ceramic coatings, and truck detailing across Sierra Lakes, Southridge, and North Fontana.",
    landmarks: ["Sierra Lakes", "Auto Club Speedway area", "Southridge", "Summit"]
  },
  {
    id: "chino",
    name: "Chino & Chino Hills",
    county: "San Bernardino County",
    zipCodes: ["91710", "91708", "91709"],
    travelFee: "FREE",
    popular: true,
    description: "Luxury mobile detailing and paint enhancement for residential and executive vehicles in Chino, Chino Hills, and Eastvale borders.",
    landmarks: ["The Shoppes at Chino Hills", "Chino Spectrum", "Los Serranos"]
  },
  {
    id: "ontario",
    name: "Ontario & Rancho Cucamonga",
    county: "San Bernardino County",
    zipCodes: ["91761", "91762", "91764", "91730", "91739"],
    travelFee: "FREE",
    popular: false,
    description: "On-site corporate and home car detailing across Ontario Mills, Haven Ave corridor, Victoria Gardens, and Rancho Cucamonga.",
    landmarks: ["Victoria Gardens", "Ontario Mills", "Haven Avenue", "Guasti"]
  },
  {
    id: "victorville",
    name: "Victorville & Yucca Valley",
    county: "High Desert / San Bernardino County",
    zipCodes: ["92392", "92394", "92395", "92284"],
    travelFee: "Available",
    popular: false,
    description: "Specialized dust mitigation, heavy exterior decon, and interior steam sanitation for High Desert and Morongo Basin vehicle owners.",
    landmarks: ["Spring Valley Lake", "Bear Valley", "Mojave River area", "Yucca Valley"]
  },
  {
    id: "orange-county",
    name: "Orange County",
    county: "Orange County",
    zipCodes: ["92602", "92612", "92618", "92660", "92801", "92805"],
    travelFee: "Available",
    popular: true,
    description: "Serving Irvine, Anaheim, Newport Beach, Orange, and surrounding OC cities with top-tier paint correction and 9H ceramic coating protection.",
    landmarks: ["Irvine Spectrum", "Newport Beach", "Anaheim Hills", "Costa Mesa"]
  },
  {
    id: "los-angeles",
    name: "Los Angeles & Santa Monica",
    county: "Los Angeles County",
    zipCodes: ["90001", "90025", "90401", "90403", "90405", "90210"],
    travelFee: "Available",
    popular: true,
    description: "Mobile concierge auto detailing for luxury, exotic, and daily driver vehicles across Greater Los Angeles, Santa Monica, and Westside.",
    landmarks: ["Santa Monica Pier area", "West LA", "Culver City", "Beverly Hills border"]
  }
];

export const coverageStats = {
  radiusMiles: "50+ Miles",
  region: "Inland Empire & SoCal",
  citiesServed: "10+ Major Zones",
  vanEquipped: "100% Mobile & Self-Powered",
  satisfactionRate: "100% Guaranteed",
};

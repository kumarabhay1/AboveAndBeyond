export interface ServiceCity {
  id: string;
  name: string;
  county: string;
  zipCodes: string[];
  popular: boolean;
  description: string;
  landmarks: string[];
  lat?: number;
  lng?: number;
}

export const serviceCities: ServiceCity[] = [
  {
    id: "riverside",
    name: "Riverside",
    county: "Inland Empire / Riverside County",
    zipCodes: ["92501", "92503", "92504", "92506", "92507", "92508", "92509"],
    popular: true,
    description: "Full mobile detailing unit stationed locally. We arrive with water and electricity onboard across Downtown, Canyon Crest, Orangecrest, Woodcrest, and Mission Inn district.",
    landmarks: ["Downtown Riverside", "Mission Inn", "Canyon Crest", "Orangecrest", "UCR area"],
    lat: 33.9533,
    lng: -117.3962
  },
  {
    id: "moreno-valley",
    name: "Moreno Valley",
    county: "Riverside County",
    zipCodes: ["92551", "92553", "92555", "92557"],
    popular: true,
    description: "Professional doorstep auto detailing for driveways and corporate parking in Sunnymead, Ranch Verde, Box Springs, and Moreno Beach.",
    landmarks: ["Moreno Beach", "Sunnymead Ranch", "Box Springs", "March Air Field area"],
    lat: 33.9375,
    lng: -117.2306
  },
  {
    id: "fontana",
    name: "Fontana",
    county: "San Bernardino County",
    zipCodes: ["92335", "92336", "92337"],
    popular: true,
    description: "High-grade paint correction, ceramic coatings, and truck/semi detailing across Sierra Lakes, Southridge, and North Fontana.",
    landmarks: ["Sierra Lakes", "Auto Club Speedway area", "Southridge", "Summit"],
    lat: 34.0922,
    lng: -117.4350
  },
  {
    id: "san-bernardino",
    name: "San Bernardino",
    county: "San Bernardino County",
    zipCodes: ["92401", "92404", "92405", "92407", "92408", "92410"],
    popular: true,
    description: "Complete interior shampoo extraction and exterior gloss wax protection for car owners in San Bernardino, Arrowhead, CSUSB, and Del Rosa.",
    landmarks: ["CSUSB area", "Arrowhead", "Hospitality Lane", "Del Rosa"],
    lat: 34.1083,
    lng: -117.2898
  },
  {
    id: "victorville",
    name: "Victorville",
    county: "High Desert / San Bernardino County",
    zipCodes: ["92392", "92394", "92395"],
    popular: false,
    description: "Specialized high desert dust mitigation, heavy exterior decontamination, and interior steam sanitation across Spring Valley Lake and Bear Valley.",
    landmarks: ["Spring Valley Lake", "Bear Valley", "Mojave River area", "High Desert Corridor"],
    lat: 34.5362,
    lng: -117.2928
  },
  {
    id: "chino",
    name: "Chino",
    county: "San Bernardino County",
    zipCodes: ["91710", "91708", "91709"],
    popular: true,
    description: "Luxury mobile detailing and paint enhancement for residential and executive vehicles in Chino, Chino Hills, and surrounding ranch communities.",
    landmarks: ["The Shoppes at Chino Hills", "Chino Spectrum", "Los Serranos", "College Park"],
    lat: 34.0122,
    lng: -117.6889
  },
  {
    id: "rancho-cucamonga",
    name: "Rancho Cucamonga",
    county: "San Bernardino County",
    zipCodes: ["91701", "91730", "91737", "91739"],
    popular: true,
    description: "Showroom ceramic coatings, paint polish, and interior deep restoration across Victoria Gardens, Haven corridor, and Alta Loma.",
    landmarks: ["Victoria Gardens", "Haven Avenue", "Alta Loma", "Red Hill"],
    lat: 34.1064,
    lng: -117.5931
  },
  {
    id: "ontario",
    name: "Ontario",
    county: "San Bernardino County",
    zipCodes: ["91761", "91762", "91764"],
    popular: true,
    description: "On-site corporate and home car detailing across Ontario Mills, Convention Center district, Guasti, and Creekside.",
    landmarks: ["Ontario Mills", "Ontario Airport Corridor", "Guasti", "Creekside"],
    lat: 34.0633,
    lng: -117.6509
  },
  {
    id: "orange",
    name: "Orange",
    county: "Orange County",
    zipCodes: ["92865", "92866", "92867", "92868", "92869"],
    popular: true,
    description: "Premium mobile auto detailing throughout Old Towne Orange, Orange Park Acres, Villa Park borders, and Santiago Canyon.",
    landmarks: ["Old Towne Orange Plaza", "Orange Park Acres", "Chapman University area", "Santiago Canyon"],
    lat: 33.7879,
    lng: -117.8531
  },
  {
    id: "yorba-linda",
    name: "Yorba Linda",
    county: "Orange County",
    zipCodes: ["92886", "92887"],
    popular: true,
    description: "Concierge ceramic coatings and luxury vehicle preservation for estates and homes across East Lake, Hidden Hills, and Vista Del Verde.",
    landmarks: ["Vista Del Verde", "East Lake Village", "Nixon Presidential Library area", "Kerrigan Ranch"],
    lat: 33.8886,
    lng: -117.8131
  },
  {
    id: "santa-ana",
    name: "Santa Ana",
    county: "Orange County",
    zipCodes: ["92701", "92703", "92704", "92705", "92706", "92707"],
    popular: false,
    description: "Full interior sanitization, stain extraction, and high-gloss paint waxing across Floral Park, South Coast Metro, and Downtown Arts District.",
    landmarks: ["South Coast Metro", "Floral Park", "Downtown Arts District", "Morrison Park"],
    lat: 33.7455,
    lng: -117.8677
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    county: "Los Angeles County",
    zipCodes: ["90001", "90012", "90015", "90025", "90036", "90046", "90069"],
    popular: true,
    description: "Mobile concierge auto detailing for luxury, exotic, and daily driver vehicles across Downtown LA, Hollywood, West LA, and Century City.",
    landmarks: ["Downtown LA", "West Los Angeles", "Century City", "Mid-Wilshire", "Culver City border"],
    lat: 34.0522,
    lng: -118.2437
  },
  {
    id: "santa-monica",
    name: "Santa Monica",
    county: "Los Angeles County",
    zipCodes: ["90401", "90402", "90403", "90404", "90405"],
    popular: true,
    description: "Coastal salt air paint protection, ceramic sealing, and interior detailing for vehicles in Ocean Park, North of Montana, and Downtown Santa Monica.",
    landmarks: ["Ocean Park", "North of Montana", "Montana Avenue", "Pacific Palisades border"],
    lat: 34.0195,
    lng: -118.4912
  },
  {
    id: "surrounding-areas",
    name: "& Surrounding Areas",
    county: "Southern California Coverage",
    zipCodes: ["Inland Empire", "Orange County", "East LA", "High Desert"],
    popular: true,
    description: "We cover adjacent neighborhoods and communities across Southern California. Contact us directly to confirm same-day or scheduled mobile availability.",
    landmarks: ["Eastvale", "Corona", "Norco", "Upland", "Redlands", "Irvine", "Anaheim"],
    lat: 33.9800,
    lng: -117.5000
  }
];

export const coverageStats = {
  radiusMiles: "60+ Miles",
  region: "Inland Empire & Greater SoCal",
  citiesServed: "14+ Major Zones",
  vanEquipped: "100% Mobile & Self-Powered",
  satisfactionRate: "100% Guaranteed",
  operatingHours: "7:00 AM - 8:00 PM (7 Days a Week)",
};



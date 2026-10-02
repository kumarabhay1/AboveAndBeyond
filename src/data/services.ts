export interface VehicleCategoryMultiplier {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export const vehicleCategories: VehicleCategoryMultiplier[] = [
  { id: "sedan", name: "Sedan / Coupe", multiplier: 1.0, description: "Compact & mid-size 2-door or 4-door cars" },
  { id: "small-suv", name: "Small SUV / Crossover", multiplier: 1.15, description: "5-passenger compact SUVs & crossovers" },
  { id: "big-suv", name: "Big SUV / 3-Row", multiplier: 1.3, description: "Full-size 7-8 passenger SUVs & family haulers" },
  { id: "truck", name: "Truck / Pickup", multiplier: 1.35, description: "Single, extended & crew cab pickup trucks" },
  { id: "semi-truck", name: "Semi-Truck / Heavy Duty", multiplier: 1.8, description: "Commercial semi cabs, flatbeds & heavy rigs" },
  { id: "van", name: "Van / Minivan", multiplier: 1.4, description: "Passenger minivans & commercial cargo vans" },
  { id: "rv", name: "RVs / Motorhomes", multiplier: 1.9, description: "Recreational vehicles, campers & motorhomes" },
];

export interface ServicePackage {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  startingPrice: number;
  duration: string;
  badge?: string;
  popular?: boolean;
  category: "full" | "interior" | "exterior" | "coating" | "restoration";
  image: string;
  features: string[];
  description: string;
}

export const servicesData: ServicePackage[] = [
  {
    id: "full-vehicle-detail",
    slug: "full-vehicle-detail",
    title: "Full Vehicle Detail",
    tagline: "Complete 360° interior deep transformation + exterior hand gloss wash",
    startingPrice: 169,
    duration: "3 - 5 Hours",
    badge: "Best Value",
    popular: true,
    category: "full",
    image: "/images/services/full-vehicle-detail.webp",
    description: "Our complete bumper-to-bumper detailing package combines everything from our Full Exterior Detail and Full Interior Detail to bring your vehicle back to pristine showroom condition.",
    features: [
      "Thorough cabin vacuuming, floor mats & deep carpet clean",
      "Seats & upholstery cleaned (shampoo extraction available as add-on)",
      "Dashboard, center console & cup holders sanitized & UV wax protected",
      "Door jambs, trunk seals & door panels cleaned and wax conditioned",
      "Steering wheel, gear shifter & emergency brake sanitized",
      "Streak-free interior & exterior glass clarity polish",
      "Exterior foam pre-wash, road oils, grease & fallout removal",
      "Hand contact wash with premium microfiber scratch-free towels",
      "Wheel faces, rims & full inner wheel wells thoroughly scrubbed",
      "Protective high-gloss wax application for 4 to 6 months of durability"
    ]
  },
  {
    id: "full-interior-detail",
    slug: "full-interior-detail",
    title: "Full Interior Detail",
    tagline: "Deep cabin vacuum, sanitization & UV wax protection",
    startingPrice: 129,
    duration: "2 - 3 Hours",
    badge: "Popular",
    popular: false,
    category: "interior",
    image: "/images/services/full-interior-detail.webp",
    description: "A complete interior restoration designed to clean, disinfect, and protect every square inch of your vehicle cabin, removing embedded dust, grime, and body oils.",
    features: [
      "Thorough high-power vacuuming of seats, floor mats, carpets & trunk",
      "Seats and carpets meticulously cleaned (shampoo extraction add-on available)",
      "Dashboard, instrument cluster & center console detailed & wax protected",
      "Door panels, storage pockets & trim cleaned and UV protected",
      "Door jambs thoroughly cleaned & wiped dry",
      "Steering wheel, turn signal stalks, gear shifter & parking brake sanitized",
      "Interior streak-free crystal clear window cleaning",
      "Fresh cabin neutralizer finish"
    ]
  },
  {
    id: "full-exterior-detail",
    slug: "full-exterior-detail",
    title: "Full Exterior Detail",
    tagline: "Pre-wash, road grime & grease removal, wheel scrub & 4-6 mo wax",
    startingPrice: 69,
    duration: "1 - 2 Hours",
    badge: "Essential Refresh",
    popular: false,
    category: "exterior",
    image: "/images/services/full-exterior-detail.webp",
    description: "A meticulous exterior hand wash that gently strips away road film, brake dust, and grease, finishing with an ultra-slick wax coating protecting your clear coat.",
    features: [
      "Pre-wash soak to safely loosen heavy dirt, oils, grease and road grime",
      "Gentle two-bucket contact hand wash with pH-balanced soap",
      "Wheels, rims, and entire wheel cover arch areas thoroughly cleaned",
      "Tire scrub and satin finish conditioning dressing",
      "Door jambs rinsed and wiped clean",
      "Streak-free exterior window & side mirror cleaning",
      "High-grade synthetic wax coating providing 4 to 6 months of paint protection"
    ]
  },
  {
    id: "paint-correction",
    slug: "paint-correction",
    title: "Paint Correction & Scratch Removal",
    tagline: "Machine polishing to eliminate major swirl marks, scratches & faded haze",
    startingPrice: 249,
    duration: "5 - 7 Hours",
    badge: "Showroom Transformation",
    popular: false,
    category: "restoration",
    image: "/images/services/paint-correction.webp",
    description: "Over time, automatic car washes and improper wiping leave swirl marks and fine scratches that make vehicle paint look dull and faded. Our multi-stage machine compound and polish removes imperfections to restore deep mirror gloss.",
    features: [
      "Chemical decontamination & clay bar smooth paint prep",
      "Multi-stage machine compounding to remove 80-90%+ of swirls & scratches",
      "High-gloss finishing polish for liquid-like reflection and depth",
      "Hand-polished panels and delicate edge tape masking protection",
      "Elimination of dull oxidation to bring paint color back to life",
      "Protective hydrophobic sealant coat included"
    ]
  },
  {
    id: "ceramic-coating",
    slug: "ceramic-coating",
    title: "Professional Ceramic Coating",
    tagline: "Ultra-durable nano-ceramic barrier with extreme hydrophobic water beading",
    startingPrice: 399,
    duration: "6 - 8 Hours",
    badge: "Flagship Protection",
    popular: true,
    category: "coating",
    image: "/images/services/ceramic-coating.webp",
    description: "Ceramic coating is a liquid polymer applied to your clear coat that chemically bonds with the factory paint. It creates a semi-permanent sacrificial glass layer that shields against UV rays, bird droppings, road chemicals, and harsh weather while making washing effortless.",
    features: [
      "Complete paint decontamination prep & single-stage polish enhancement",
      "Pure surface panel wipe down for 100% bond adhesion",
      "Professional-grade 9H Nano-Ceramic Coating applied to all painted body panels",
      "Intense hydrophobic lotus-effect water and dirt repelling",
      "Long-lasting UV ray defense preventing clear coat oxidation & fading",
      "High-gloss liquid candy appearance that lasts for years",
      "Wheel face and glass hydrophobic protection"
    ]
  },
  {
    id: "headlight-restoration",
    slug: "headlight-restoration",
    title: "Headlight Restoration",
    tagline: "Remove yellowing, haze & oxidation — restore headlights to brand new",
    startingPrice: 89,
    duration: "1 - 2 Hours",
    badge: "Safety & Clarity",
    popular: false,
    category: "restoration",
    image: "/images/services/headlight-restoration.webp",
    description: "Sunlight and road debris turn plastic headlight lenses cloudy, yellow, and dangerously dim. We wet sand, compound, polish, and seal headlights to crystal clarity.",
    features: [
      "Multi-stage wet sanding to strip cloudy yellowed oxidation layer",
      "Precision compound polishing to restore optical clarity",
      "High-speed machine jeweling polish",
      "UV-blocking clear ceramic sealant to prevent future yellowing",
      "Significantly improves nighttime visibility and front-end aesthetics"
    ]
  }
];

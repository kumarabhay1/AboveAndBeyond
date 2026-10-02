export interface AddOnService {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  duration: string;
  description: string;
  popular?: boolean;
  iconName: string;
  image: string;
}

export const addOnServices: AddOnService[] = [
  {
    id: "pet-hair",
    name: "Pet Hair Removal",
    price: "$49",
    priceNum: 49,
    duration: "30 - 45 mins",
    description: "All tough, stubborn pet hairs trapped deep in carpet fibers and upholstery are carefully hand-extracted and eliminated.",
    popular: true,
    iconName: "Dog",
    image: "/images/addons/pet-hair-removal.webp"
  },
  {
    id: "engine-bay",
    name: "Engine Bay Restoration",
    price: "$49",
    priceNum: 49,
    duration: "1 Hour",
    description: "Full engine bay degreasing, steam wash, and satin heat-resistant dressing on all plastic covers and hoses.",
    popular: true,
    iconName: "Zap",
    image: "/images/addons/engine-bay-restoration.webp"
  },
  {
    id: "headlight-restoration-addon",
    name: "Headlight Restoration",
    price: "$89",
    priceNum: 89,
    duration: "1 - 2 Hours",
    description: "Multi-stage wet sanding and precision polishing to remove yellow haze and restore crystal clarity with protective UV sealant.",
    popular: true,
    iconName: "Sun",
    image: "/images/addons/headlight-restoration.webp"
  },
  {
    id: "baby-seat",
    name: "Baby Seat Cleaned",
    price: "$29",
    priceNum: 29,
    duration: "20 - 30 mins",
    description: "Complete eco-friendly steam sanitization and stain removal for child car seats, ensuring a hygienic and safe seat for children.",
    popular: false,
    iconName: "Sparkles",
    image: "/images/addons/baby-seat-cleaned.webp"
  },
  {
    id: "glass-water-repellent",
    name: "Glass Water Repellent",
    price: "$29",
    priceNum: 29,
    duration: "20 mins",
    description: "Hydrophobic exterior glass and windshield treatment that repels rainwater, dust, and road spray for superior driving clarity.",
    popular: false,
    iconName: "Droplets",
    image: "/images/addons/glass-water-repellent.webp"
  }
];

export interface TierComparison {
  feature: string;
  exterior: boolean | string;
  interior: boolean | string;
  fullVehicle: boolean | string;
  ceramicCorrection: boolean | string;
}

export const tierComparisons: TierComparison[] = [
  { feature: "Exterior Pre-Wash (Oils, Grease & Dust)", exterior: true, interior: false, fullVehicle: true, ceramicCorrection: true },
  { feature: "Two-Bucket Microfiber Hand Contact Wash", exterior: true, interior: false, fullVehicle: true, ceramicCorrection: true },
  { feature: "Wheels, Rims & Wheel Arches Cleaned", exterior: true, interior: false, fullVehicle: true, ceramicCorrection: true },
  { feature: "4 to 6 Months Wax Paint Protection", exterior: true, interior: false, fullVehicle: true, ceramicCorrection: "9H Ceramic (Years)" },
  { feature: "High-Power Cabin & Trunk Vacuuming", exterior: false, interior: true, fullVehicle: true, ceramicCorrection: true },
  { feature: "Seats & Carpets Deep Cleaning", exterior: false, interior: true, fullVehicle: true, ceramicCorrection: true },
  { feature: "Dashboard, Console & Door Panels Wax Protected", exterior: false, interior: true, fullVehicle: true, ceramicCorrection: true },
  { feature: "Steering Wheel, Shifter & Brake Sanitized", exterior: false, interior: true, fullVehicle: true, ceramicCorrection: true },
  { feature: "Door Jambs Cleaned & Dried", exterior: true, interior: true, fullVehicle: true, ceramicCorrection: true },
  { feature: "Interior & Exterior Glass Polished", exterior: true, interior: true, fullVehicle: true, ceramicCorrection: true },
  { feature: "Machine Swirl & Scratch Removal", exterior: false, interior: false, fullVehicle: false, ceramicCorrection: "Multi-Stage Polish" },
  { feature: "Free Mobile Service to Your Doorstep", exterior: true, interior: true, fullVehicle: true, ceramicCorrection: true },
];

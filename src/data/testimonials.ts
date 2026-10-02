export interface Testimonial {
  id: string;
  name: string;
  location: string;
  vehicle: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  serviceUsed: string;
  avatar?: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "review-1",
    name: "Marcus Vance",
    location: "Carmel, IN",
    vehicle: "2023 Porsche 911 GT3",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolute perfection - Paint correction & Ceramic coating",
    comment: "Harmanbir and the Above and Beyond Details team transformed my GT3! The paint had minor micro-swirls from dealership prep. After their 2-stage correction and 9H ceramic coating, the depth and gloss are surreal. Water slides off like glass. True master craftsmen!",
    serviceUsed: "Paint Correction & Ceramic Coating",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "review-2",
    name: "Elena Rostova",
    location: "Fishers, IN",
    vehicle: "2024 BMW X7",
    rating: 5,
    date: "1 month ago",
    title: "Saved our interior after family road trip!",
    comment: "With 3 kids and a dog, our X7 interior was in desperate shape with coffee spills and pet hair. Above and Beyond Details brought their mobile unit right to our driveway. In 3.5 hours, the interior looked and smelled brand new. Absolutely blown away by the steam extraction!",
    serviceUsed: "Signature Full Detail",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "review-3",
    name: "David Miller",
    location: "Indianapolis, IN",
    vehicle: "2022 Ford F-150 Raptor",
    rating: 5,
    date: "3 weeks ago",
    title: "Top tier mobile service in Indy",
    comment: "Super convenient mobile setup. They showed up on time, brought their own water and electricity, and worked non-stop on my Raptor. Wheel wells, engine bay, interior—every inch was scrubbed. Will definitely set up a monthly maintenance plan!",
    serviceUsed: "Signature Full Detail + Engine Bay",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "review-4",
    name: "Sophia Chen",
    location: "Zionsville, IN",
    vehicle: "2023 Audi RS e-tron GT",
    rating: 5,
    date: "2 months ago",
    title: "Unmatched attention to detail",
    comment: "Above and Beyond Details is the only company I trust with my EV. Harmanbir was extremely professional, polite, and explained every chemical used on the matte aluminum trim. The car looks sleeker than the day I picked it up from the showroom!",
    serviceUsed: "Exterior Decon & Gloss Shield",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "review-5",
    name: "Brian K. Higgins",
    location: "Greenwood, IN",
    vehicle: "1969 Chevrolet Camaro SS",
    rating: 5,
    date: "1 month ago",
    title: "Classic car detailing experts",
    comment: "Took my 69 Camaro for show prep. They handled the single-stage paint with immense precision and care. They didn't just wash it; they babied it. Won 1st place in class at the weekend car show!",
    serviceUsed: "Paint Correction & Ceramic Coating",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

export const overallStats = {
  ratingScore: "5.0",
  totalReviews: "180+",
  googleStars: 5.0,
};

export const siteConfig = {
  name: "Above and Beyond Car Detailing",
  shortName: "Above & Beyond Detailing",
  tagline: "Don’t just wash your vehicle, Go Above and Beyond.",
  subTagline: "Quality That Shows — Professional Mobile Car Detailing in Southern California",
  description: "Professional mobile car detailing serving the Inland Empire, Riverside, Moreno Valley, San Bernardino, Orange County, Los Angeles, and surrounding Southern California communities. We bring showroom-quality detailing directly to your home or workplace.",
  owner: "Harbaz Hundal",
  phone: "+1 (951) 529-0564",
  phoneRaw: "19515290564",
  email: "anbcardetailz@gmail.com",
  url: "https://aboveandbeyondcardetailing.com",
  address: {
    city: "Riverside",
    state: "CA",
    region: "Inland Empire & Southern California",
    country: "USA",
  },
  hours: [
    { days: "Monday - Sunday (7 Days a Week)", time: "7:00 AM - 8:00 PM" },
  ],
  socials: {
    instagram: "https://www.instagram.com/aboveandbeyond_detailz?stkn=N2hkN2Z2NHJ6MzZm&utm_source=qr",
    facebook: "https://www.facebook.com/profile.php?id=61594313920644&mibextid=wwXIfr&mibextid=wwXIfr",
    google: "https://g.page/aboveandbeyondcardetailing",
    tiktok: "https://tiktok.com/@aboveandbeyond_detailz",
  },
  whatsappPrefilledMessage: "Hello Harbaz! I would like to inquire about booking a mobile detailing service with Above and Beyond Car Detailing.",
  getWhatsAppUrl: (message?: string) => {
    const text = encodeURIComponent(message || siteConfig.whatsappPrefilledMessage);
    return `https://wa.me/${siteConfig.phoneRaw}?text=${text}`;
  }
};

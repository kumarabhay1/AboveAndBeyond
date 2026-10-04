import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/ui/SplashScreen";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Professional Mobile Car Detailing Southern California`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Mobile Car Detailing Inland Empire",
    "Car Detailing Riverside CA",
    "Auto Detailing Moreno Valley",
    "Mobile Car Wash San Bernardino",
    "Ceramic Coating Fontana",
    "Paint Correction Chino",
    "Car Detailing Orange County",
    "Mobile Auto Detailing Los Angeles",
    "Above and Beyond Car Detailing Harbaz Hundal",
    "Headlight Restoration Inland Empire",
    "Pet Hair Removal Car Detailing Riverside"
  ],
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.owner,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: siteConfig.name,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  "name": siteConfig.name,
  "image": `${siteConfig.url}/images/services/full-vehicle-detail.webp`,
  "@id": `${siteConfig.url}/#organization`,
  "url": siteConfig.url,
  "telephone": siteConfig.phone,
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": siteConfig.address.city,
    "addressRegion": siteConfig.address.state,
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.9806,
    "longitude": -117.3755
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    siteConfig.socials.instagram,
    siteConfig.socials.facebook,
    siteConfig.socials.tiktok
  ],
  "areaServed": [
    { "@type": "City", "name": "Riverside" },
    { "@type": "City", "name": "Moreno Valley" },
    { "@type": "City", "name": "San Bernardino" },
    { "@type": "City", "name": "Fontana" },
    { "@type": "City", "name": "Chino" },
    { "@type": "City", "name": "Ontario" },
    { "@type": "City", "name": "Orange County" },
    { "@type": "City", "name": "Los Angeles" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${bebasNeue.variable} ${manrope.variable} antialiased`} 
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 font-sans overflow-x-hidden selection:bg-primary selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SplashScreen />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

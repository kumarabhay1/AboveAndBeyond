import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Above & Beyond",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0e",
    theme_color: "#ff5500",
    icons: [
      {
        src: "/logo.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}

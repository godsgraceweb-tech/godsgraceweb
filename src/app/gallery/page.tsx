"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import FinalCTA from "@/components/sections/FinalCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Gallery & Portfolio",
  description: "Browse our portfolio of beautifully planned luxury weddings and gracefully celebrated events in Thiruvalla, Kerala.",
  alternates: { canonical: `${siteConfig.url}/gallery` }
};

// Placeholder gallery images
const galleryImages = [
  { id: 1, category: "Weddings", src: "/images/gallery-1.jpg", span: "md:col-span-2 md:row-span-2" },
  { id: 2, category: "Décor", src: "/images/gallery-2.jpg", span: "md:col-span-1 md:row-span-1" },
  { id: 3, category: "Details", src: "/images/gallery-3.jpg", span: "md:col-span-1 md:row-span-1" },
  { id: 4, category: "Events", src: "/images/gallery-4.jpg", span: "md:col-span-1 md:row-span-2" },
  { id: 5, category: "Weddings", src: "/images/gallery-5.jpg", span: "md:col-span-1 md:row-span-1" },
  { id: 6, category: "Celebrations", src: "/images/gallery-6.jpg", span: "md:col-span-2 md:row-span-1" },
];

export default function GalleryPage() {
  return (
    <div className="pt-24 bg-ivory">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-6">A Glimpse Into<br /><span className="italic text-gold">The Celebrations</span></h1>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
        </div>
        
        <div className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative group overflow-hidden bg-charcoal/5 ${img.span}`}
              >
                <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-ivory font-heading text-xl tracking-wider uppercase">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <FinalCTA />
    </div>
  );
}

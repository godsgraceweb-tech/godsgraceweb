"use client";

import { motion } from "framer-motion";

interface GalleryImage {
  id: number;
  category: string;
  src: string;
  span: string;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
      {images.map((img, i) => (
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
  );
}

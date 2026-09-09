"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Kerala() {
  return (
    <section className="relative py-32 md:py-48 bg-kerala-green overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/kerala-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-kerala-green via-kerala-green/90 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center text-ivory">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl mb-6 leading-tight">
              ROOTED IN CELEBRATION.<br />
              <span className="italic text-champagne/90">DESIGNED FOR TODAY.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-ivory/80 leading-relaxed mb-12 font-light">
              We bring the warmth of Kerala's traditions into contemporary celebrations, blending meaningful customs with modern, refined aesthetics.
            </p>
            
            <Button asChild variant="gold" size="lg">
              <Link href="/about">Discover Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function FinalCTA() {
  return (
    <section className="relative py-32 bg-charcoal overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />
      
      <div className="container relative z-10 mx-auto px-6 text-center text-ivory">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">
            YOUR DAY.<br />
            <span className="italic text-champagne/90">YOUR STORY.</span><br />
            BEAUTIFULLY PLANNED.
          </h2>
          
          <p className="text-lg md:text-xl text-ivory/80 mb-12 font-light italic">
            Let's create a celebration that feels uniquely yours.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto bg-ivory text-charcoal hover:bg-champagne">
              <Link href="/book">Book Your Event</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-ivory border-ivory hover:bg-ivory hover:text-charcoal">
              <a href={`https://wa.me/${siteConfig.contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

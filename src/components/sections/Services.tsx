"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <section className="py-24 md:py-32 bg-champagne">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gold mb-4">
            Services
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal">
            What We Create
          </h3>
        </motion.div>

        <div className="space-y-32">
          {siteConfig.services.map((service, index) => (
            <div 
              key={service.id}
              className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 aspect-[4/5] relative bg-charcoal/5"
              >
                <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply" />
                {/* Image placeholder - in a real app would use next/image */}
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              </motion.div>

              {/* Content side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 flex flex-col items-start"
              >
                <span className="text-gold font-heading text-xl italic mb-4">
                  0{index + 1}
                </span>
                <h4 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
                  {service.title}
                </h4>
                <p className="text-lg text-charcoal/80 mb-6 italic">
                  {service.shortDescription}
                </p>
                <p className="text-charcoal/70 mb-10 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-10 text-sm text-charcoal/80">
                  {service.items.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {service.items.length > 5 && (
                    <li className="flex items-start gap-3 text-charcoal/50 italic">
                      <span>+ more tailored services</span>
                    </li>
                  )}
                </ul>

                <Button asChild variant="outline" className="group">
                  <Link href={`/book?service=${encodeURIComponent(service.title)}`}>
                    Enquire About This Service
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

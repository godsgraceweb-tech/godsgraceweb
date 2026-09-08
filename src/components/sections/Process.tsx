"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function Process() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gold mb-4">
            Our Process
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
            From Vision to Celebration
          </h3>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto italic">
            A seamless journey to create your perfect event.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {siteConfig.process.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center relative group"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center mb-6 text-xl font-heading text-gold group-hover:bg-gold group-hover:text-ivory transition-colors">
                  {step.id}
                </div>
                <h4 className="font-heading text-xl text-charcoal mb-3 uppercase tracking-wider">
                  {step.title}
                </h4>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {step.description}
                </p>
                {/* Connecting Line */}
                {index < siteConfig.process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gold/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

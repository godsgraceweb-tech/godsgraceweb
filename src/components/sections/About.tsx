"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gold mb-6">
              The God's Grace Experience
            </h2>
            <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-10 leading-tight">
              Creating Moments <br className="hidden md:block" />
              <span className="italic text-charcoal/80">That Stay Forever</span>
            </h3>
            
            <p className="text-lg text-charcoal/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              God's Grace Wedding & Event Planners is a complete event planning and coordination company based in Thiruvalla, Kerala. From venue styling and decoration to food, entertainment, transportation, and guest support, we manage every essential detail under one trusted name.
            </p>
            
            <p className="text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
              Our approach blends thoughtful planning, refined styling, and seamless execution—so every celebration feels beautiful, effortless, and truly memorable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            {[
              {
                title: "Thoughtful Planning",
                desc: "Every detail is carefully considered.",
              },
              {
                title: "Refined Styling",
                desc: "Every space is designed with elegance.",
              },
              {
                title: "Seamless Execution",
                desc: "Every element is coordinated with care.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <h4 className="font-heading text-2xl text-charcoal mb-4">{pillar.title}</h4>
                <div className="w-12 h-[1px] bg-gold/50 mb-4" />
                <p className="text-sm text-charcoal/60 uppercase tracking-wider">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

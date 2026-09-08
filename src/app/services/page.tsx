import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Our Services | ${siteConfig.name}`,
  description: "Explore our comprehensive wedding and event planning services.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 bg-champagne">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-heading text-5xl md:text-6xl text-center mb-8">What We Create</h1>
        <div className="w-24 h-[1px] bg-gold mx-auto mb-4" />
      </div>
      <Services />
      <Process />
      <FinalCTA />
    </div>
  );
}

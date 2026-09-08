import About from "@/components/sections/About";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: "Learn about the God's Grace Experience and our mission to create moments that stay forever.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 bg-ivory">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-heading text-5xl md:text-6xl text-center mb-8">The God's Grace Experience</h1>
        <div className="w-24 h-[1px] bg-gold mx-auto mb-16" />
      </div>
      <About />
      
      <section className="py-24 bg-champagne">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-heading text-4xl mb-6 text-charcoal">Our Values</h2>
            <p className="text-charcoal/70">The principles that guide every celebration we plan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.values.map((value) => (
              <div key={value.title} className="bg-ivory p-8 rounded-sm text-center">
                <h3 className="font-heading text-2xl text-gold mb-4">{value.title}</h3>
                <p className="text-charcoal/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

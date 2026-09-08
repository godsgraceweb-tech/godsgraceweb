import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: "Get in touch with God's Grace Wedding & Event Planners in Thiruvalla, Kerala.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-ivory">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-6">
              Let's Create Something<br />
              <span className="italic text-gold">Beautiful Together</span>
            </h1>
            <p className="text-lg text-charcoal/70 max-w-xl mx-auto">
              We'd love to hear about your upcoming celebration. Contact us directly or fill out our event enquiry form to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 shadow-xl shadow-charcoal/5 rounded-sm border border-charcoal/5">
            {/* Contact Details */}
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-gold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-charcoal mt-1 shrink-0" />
                    <div>
                      <p className="text-sm uppercase tracking-wider text-charcoal/50 mb-1">Call / WhatsApp</p>
                      {siteConfig.contact.phones.map(p => (
                        <p key={p} className="text-charcoal font-medium">{p}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-charcoal mt-1 shrink-0" />
                    <div>
                      <p className="text-sm uppercase tracking-wider text-charcoal/50 mb-1">Email</p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-charcoal font-medium hover:text-gold transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-charcoal mt-1 shrink-0" />
                    <div>
                      <p className="text-sm uppercase tracking-wider text-charcoal/50 mb-1">Address</p>
                      <p className="text-charcoal font-medium whitespace-pre-line">{siteConfig.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-gold mb-6">Connect</h3>
                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Action Area */}
            <div className="bg-champagne/30 p-8 rounded-sm flex flex-col justify-center text-center">
              <h3 className="font-heading text-3xl text-charcoal mb-4">Start Planning</h3>
              <p className="text-charcoal/70 mb-8">
                Use our guided event enquiry form to share your vision with us, and we'll connect with you on WhatsApp.
              </p>
              
              <div className="flex flex-col gap-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/book">Book Your Event</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory">
                  <a href={`https://wa.me/${siteConfig.contact.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

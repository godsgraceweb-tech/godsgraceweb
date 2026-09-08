import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src="/logo.jpg" 
              alt="God's Grace Logo" 
              className="h-16 w-auto object-contain mb-6 rounded-sm"
            />
            <p className="font-heading italic text-xl text-champagne max-w-xs mb-6">
              Beautifully Planned. Gracefully Celebrated.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gold">Contact</h3>
            <ul className="space-y-4 text-sm text-ivory/80">
              <li className="whitespace-pre-line">{siteConfig.contact.address}</li>
              <li>
                {siteConfig.contact.phones.map((phone, i) => (
                  <div key={i}>
                    <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-gold transition-colors">
                      {phone}
                    </a>
                  </div>
                ))}
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gold">Navigation</h3>
            <ul className="space-y-4 text-sm text-ivory/80">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Gallery", path: "/gallery" },
                { name: "Book an Event", path: "/book" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gold">Social</h3>
            <ul className="space-y-4 text-sm text-ivory/80">
              <li>
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/50">
          <p>&copy; {new Date().getFullYear()} God's Grace Wedding & Event Planners. All rights reserved.</p>
          <p>
            <Link href="/privacy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

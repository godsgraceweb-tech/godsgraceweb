"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export default function WhatsAppFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!siteConfig.contact.whatsappNumber) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative group flex items-center justify-center">
        {/* Animated Ping Ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-60 duration-1000"></div>
        
        {/* Main Button */}
        <a
          href={`https://wa.me/${siteConfig.contact.whatsappNumber.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center hover:scale-110 transition-transform duration-300"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-16 h-16 drop-shadow-2xl">
            <path fill="#25D366" d="M12.01 2.002c-5.514 0-10 4.486-10 10 0 1.765.457 3.428 1.282 4.887l-1.374 5.02 5.138-1.348a9.96 9.96 0 004.954 1.327h.005c5.51 0 10-4.486 10-10 0-5.514-4.486-10-10-10z"/>
            <path fill="#FFF" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
          </svg>
        </a>

        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-charcoal text-xs font-semibold px-4 py-2.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:block">
          Talk to God's Grace
          {/* Tooltip arrow */}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-white"></span>
        </span>
      </div>
    </div>
  );
}

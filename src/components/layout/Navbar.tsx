"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHome
          ? "bg-ivory/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group relative z-50 flex items-center">
          <img 
            src="/logo-transparent.png" 
            alt="God's Grace Logo" 
            className={cn(
              "h-16 md:h-20 w-auto object-contain transition-all duration-300",
              (isScrolled || !isHome || mobileMenuOpen) ? "opacity-100" : "opacity-90 invert brightness-0"
            )}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm uppercase tracking-wider transition-colors hover:opacity-70",
                    (isScrolled || !isHome) ? "text-charcoal" : "text-ivory",
                    pathname === link.href && "opacity-50"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <Button 
            asChild 
            variant={(isScrolled || !isHome) ? "default" : "outline"}
            className={cn(
              !isScrolled && isHome && "text-ivory border-ivory hover:bg-ivory hover:text-charcoal"
            )}
          >
            <Link href="/book">Book Your Event</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-charcoal" />
          ) : (
            <Menu className={cn(
              "w-6 h-6 transition-colors",
              (isScrolled || !isHome) ? "text-charcoal" : "text-ivory"
            )} />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-ivory z-40 flex flex-col justify-center px-6 transition-transform duration-500 ease-in-out md:hidden",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-8 text-center mt-20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-heading tracking-widest text-charcoal"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8">
              <Button asChild size="lg" className="w-full">
                <Link href="/book">Book Your Event</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

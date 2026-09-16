import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingCTA from "@/components/ui/WhatsAppFloatingCTA";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Wedding & Event Planners in ${siteConfig.location}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Wedding Planners Kerala",
    "Event Planners Thiruvalla",
    "Luxury Weddings Kerala",
    "Destination Weddings India",
    "Gods Grace Events",
    "Premium Event Planning",
    "Corporate Events Kerala",
    "Wedding Decorators"
  ],
  authors: [{ name: "God's Grace Wedding & Event Planners" }],
  creator: "God's Grace Wedding & Event Planners",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "God's Grace Wedding & Event Planners Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.location}`,
    description: siteConfig.description,
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate LocalBusiness JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "image": `${siteConfig.url}/logo.jpg`,
    "@id": siteConfig.url,
    "url": siteConfig.url,
    "telephone": siteConfig.contact.phones[0],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thiruvalla",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "description": siteConfig.description,
    "sameAs": [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook
    ],
    "priceRange": "$$$",
    "areaServed": {
      "@type": "State",
      "name": "Kerala"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${manrope.variable} font-sans antialiased bg-ivory text-charcoal min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingCTA />
      </body>
    </html>
  );
}

import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import BookingWizard from "@/components/sections/BookingWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Event",
  description: "Start planning your dream wedding or luxury event with God's Grace. Tell us about your vision, and we'll create an unforgettable experience.",
  alternates: { canonical: `${siteConfig.url}/book` }
};

export default function BookPage() {
  return (
    <div className="pt-24 min-h-screen bg-ivory">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <BookingWizard />
      </Suspense>
    </div>
  );
}

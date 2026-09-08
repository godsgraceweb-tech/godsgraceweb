import { Suspense } from "react";
import BookingWizard from "@/components/sections/BookingWizard";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Book Your Event | ${siteConfig.name}`,
  description: "Start planning your celebration with God's Grace. Tell us about your vision and event details.",
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

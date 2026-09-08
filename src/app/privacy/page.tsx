import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: "Privacy policy and data handling information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-ivory">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-charcoal/80">
          <p className="mb-6">Last updated: [DATE]</p>
          
          <h2 className="font-heading text-2xl mt-8 mb-4 text-charcoal">1. Information We Collect</h2>
          <p className="mb-6">
            When you use our event enquiry form, we collect the information you provide, such as your name, phone number, email address, and event details. Your information will only be used to respond to your event enquiry.
          </p>
          
          <h2 className="font-heading text-2xl mt-8 mb-4 text-charcoal">2. How We Use Your Information</h2>
          <p className="mb-6">
            We use the information we collect to communicate with you regarding your event planning needs, provide quotes, and facilitate WhatsApp conversations via our click-to-chat integration.
          </p>

          <h2 className="font-heading text-2xl mt-8 mb-4 text-charcoal">3. WhatsApp Integration</h2>
          <p className="mb-6">
            Our booking system generates a WhatsApp message using the details you provide. By clicking "Continue on WhatsApp," you agree to share these details with us via the WhatsApp platform.
          </p>

          <h2 className="font-heading text-2xl mt-8 mb-4 text-charcoal">4. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact us at {siteConfig.contact.email} or call us at {siteConfig.contact.phones[0]}.
          </p>
        </div>
      </div>
    </div>
  );
}

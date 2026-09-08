"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, type EventEnquiry } from "@/lib/whatsapp";
import { useSearchParams } from "next/navigation";

// Form Schema
const formSchema = z.object({
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Please provide a date"),
  flexibleDate: z.boolean().optional(),
  venue: z.string().min(1, "Please enter a location"),
  venueStatus: z.string().min(1, "Please select venue status"),
  guestCount: z.string().min(1, "Please select guest count"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  budget: z.string().optional(),
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  whatsappNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: "type", title: "Event Type" },
  { id: "date", title: "Date & Location" },
  { id: "details", title: "Guests & Services" },
  { id: "personal", title: "Your Details" },
  { id: "review", title: "Review" },
];

const eventTypes = [
  "Wedding", "Engagement", "Reception", "Birthday", "Anniversary", "Corporate Event", "Private Event", "Other"
];

const guestCounts = [
  "Under 50", "50–100", "100–250", "250–500", "500+", "Not decided"
];

const budgets = [
  "Below ₹1 Lakh", "₹1–3 Lakhs", "₹3–5 Lakhs", "₹5–10 Lakhs", "₹10 Lakhs+", "Prefer to discuss"
];

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: "",
      eventDate: "",
      flexibleDate: false,
      venue: "",
      venueStatus: "Not decided",
      guestCount: "",
      services: preselectedService ? [preselectedService] : [],
      budget: "Prefer to discuss",
      name: "",
      phone: "",
      whatsappNumber: "",
      email: "",
      message: "",
    },
    mode: "onChange"
  });

  const formValues = watch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const validateStep = async () => {
    let fieldsToValidate: any[] = [];
    
    if (currentStep === 0) fieldsToValidate = ['eventType'];
    if (currentStep === 1) fieldsToValidate = ['eventDate', 'venue', 'venueStatus'];
    if (currentStep === 2) fieldsToValidate = ['guestCount', 'services'];
    if (currentStep === 3) fieldsToValidate = ['name', 'phone', 'email'];
    
    const isStepValid = await trigger(fieldsToValidate as any);
    return isStepValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: any) => {
    // Generate WhatsApp URL and redirect
    const url = getWhatsAppUrl(data as EventEnquiry);
    setIsSubmitted(true);
    
    // Redirect after a short delay
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="py-24 text-center min-h-[70vh] flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto px-6"
        >
          <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-8 rounded-full text-gold text-2xl font-serif">
            &#10003;
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-6">
            YOUR CELEBRATION STARTS HERE.
          </h2>
          <p className="text-lg text-charcoal/70 mb-12 italic font-light">
            Thank you for sharing your vision with us. Your event details are ready to send to God's Grace.
          </p>
          
          <Button asChild size="lg" className="w-full sm:w-auto mb-4 bg-charcoal text-ivory hover:bg-gold transition-colors">
            <a href={getWhatsAppUrl(formValues as EventEnquiry)} target="_blank" rel="noopener noreferrer">
              Continue on WhatsApp
            </a>
          </Button>
          <div className="mt-6">
            <Button asChild variant="link" className="text-sm tracking-widest text-charcoal/50 hover:text-charcoal uppercase">
              <a href="/">Back to Website</a>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-16">
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal text-center mb-12 tracking-wide">
          Tell Us About Your Celebration
        </h1>
        
        {/* Progress Bar */}
        <div className="relative flex justify-between items-center mb-8">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-charcoal/10 -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-gold -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-ivory px-2">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors duration-300 font-serif border",
                  currentStep >= index ? "bg-gold border-gold text-ivory" : "bg-ivory border-charcoal/20 text-charcoal/40"
                )}
              >
                {currentStep > index ? <span className="text-ivory">&#10003;</span> : index + 1}
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/60 hidden md:block absolute -bottom-6 font-light">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ivory/50 rounded-sm p-4 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {/* STEP 1: EVENT TYPE */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="font-heading text-3xl text-charcoal mb-10 text-center italic">What are you planning?</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {eventTypes.map((type) => (
                    <div
                      key={type}
                      onClick={() => setValue("eventType", type, { shouldValidate: true })}
                      className={cn(
                        "p-6 text-center border cursor-pointer transition-all duration-500 flex flex-col items-center justify-center gap-3 rounded-sm",
                        formValues.eventType === type 
                          ? "border-gold bg-gold/5 text-charcoal shadow-sm" 
                          : "border-charcoal/10 hover:border-gold/30 text-charcoal/70 bg-white"
                      )}
                    >
                      <span className="font-light text-sm tracking-wider uppercase">{type}</span>
                    </div>
                  ))}
                </div>
                {errors.eventType && (
                  <p className="text-red-500/80 text-xs tracking-wider uppercase mt-6 text-center font-medium">
                    {errors.eventType.message}
                  </p>
                )}
              </motion.div>
            )}

            {/* STEP 2: DATE & LOCATION */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-12"
              >
                <div>
                  <h3 className="font-heading text-3xl text-charcoal mb-8 italic">When is your event?</h3>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3">
                      <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50">Event Date</label>
                      <input
                        type="date"
                        {...register("eventDate")}
                        className="w-full border-b border-charcoal/20 py-3 bg-transparent outline-none focus:border-gold transition-colors text-lg font-light text-charcoal"
                      />
                      {errors.eventDate && <p className="text-red-500/80 text-xs tracking-wider uppercase mt-1 font-medium">{errors.eventDate.message}</p>}
                    </div>
                    
                    <label className="flex items-center gap-3 cursor-pointer mt-2 group">
                      <input
                        type="checkbox"
                        {...register("flexibleDate")}
                        className="w-4 h-4 rounded-sm border-charcoal/20 text-gold focus:ring-gold transition-colors"
                      />
                      <span className="text-charcoal/70 text-sm font-light tracking-wide group-hover:text-charcoal transition-colors">My date is flexible</span>
                    </label>
                  </div>
                </div>

                <div className="pt-10 border-t border-charcoal/10">
                  <h3 className="font-heading text-3xl text-charcoal mb-8 italic">Where will it happen?</h3>
                  
                  <div className="space-y-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50">Location / City / Venue</label>
                      <input
                        type="text"
                        placeholder="e.g. Thiruvalla, Kerala"
                        {...register("venue")}
                        className="w-full border-b border-charcoal/20 py-3 bg-transparent outline-none focus:border-gold transition-colors text-lg font-light placeholder:text-charcoal/20"
                      />
                      {errors.venue && <p className="text-red-500/80 text-xs tracking-wider uppercase mt-1 font-medium">{errors.venue.message}</p>}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {["Venue already selected", "Need venue assistance", "Not decided"].map((status) => (
                        <div
                          key={status}
                          onClick={() => setValue("venueStatus", status, { shouldValidate: true })}
                          className={cn(
                            "px-5 py-2.5 text-xs tracking-widest uppercase border cursor-pointer transition-all duration-300 rounded-sm",
                            formValues.venueStatus === status 
                              ? "bg-charcoal text-ivory border-charcoal" 
                              : "bg-white border-charcoal/10 hover:border-charcoal/30 text-charcoal/70"
                          )}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GUESTS & SERVICES */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-12"
              >
                <div>
                  <h3 className="font-heading text-3xl text-charcoal mb-8 italic">How many guests?</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {guestCounts.map((count) => (
                      <div
                        key={count}
                        onClick={() => setValue("guestCount", count, { shouldValidate: true })}
                        className={cn(
                          "p-4 text-center border cursor-pointer transition-all duration-300 rounded-sm font-light text-sm tracking-wide",
                          formValues.guestCount === count 
                            ? "bg-charcoal text-ivory border-charcoal shadow-sm" 
                            : "bg-white border-charcoal/10 hover:border-gold/30 text-charcoal/70"
                        )}
                      >
                        {count}
                      </div>
                    ))}
                  </div>
                  {errors.guestCount && <p className="text-red-500/80 text-xs tracking-wider uppercase mt-4 font-medium">{errors.guestCount.message}</p>}
                </div>

                <div className="pt-10 border-t border-charcoal/10">
                  <h3 className="font-heading text-3xl text-charcoal mb-8 italic">What do you need?</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {siteConfig.services.map((service) => (
                      <label
                        key={service.id}
                        className={cn(
                          "flex items-start gap-4 p-5 border cursor-pointer transition-all duration-300 rounded-sm group",
                          formValues.services?.includes(service.title)
                            ? "border-gold bg-gold/5 shadow-sm"
                            : "bg-white border-charcoal/10 hover:border-charcoal/20"
                        )}
                      >
                        <input
                          type="checkbox"
                          value={service.title}
                          {...register("services")}
                          className="mt-1 w-4 h-4 rounded-sm border-charcoal/20 text-gold focus:ring-gold transition-colors"
                        />
                        <div>
                          <p className={cn(
                            "text-sm tracking-wider uppercase mb-1 transition-colors",
                            formValues.services?.includes(service.title) ? "text-charcoal" : "text-charcoal/80 group-hover:text-charcoal"
                          )}>
                            {service.title}
                          </p>
                          <p className="text-xs text-charcoal/50 font-light italic">{service.shortDescription}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.services && <p className="text-red-500/80 text-xs tracking-wider uppercase mt-4 font-medium">{errors.services.message}</p>}
                </div>
              </motion.div>
            )}

            {/* STEP 4: PERSONAL DETAILS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-10"
              >
                <h3 className="font-heading text-3xl text-charcoal mb-10 text-center italic">Let's get to know you</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50">Your Name *</label>
                    <input
                      type="text"
                      {...register("name")}
                      className="w-full border-b border-charcoal/20 py-3 bg-transparent outline-none focus:border-gold transition-colors text-lg font-light text-charcoal"
                    />
                    {errors.name && <p className="text-red-500/80 text-xs tracking-wider uppercase mt-1 font-medium">{errors.name.message}</p>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50">Phone Number *</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full border-b border-charcoal/20 py-3 bg-transparent outline-none focus:border-gold transition-colors text-lg font-light text-charcoal"
                    />
                    {errors.phone && <p className="text-red-500/80 text-xs tracking-wider uppercase mt-1 font-medium">{errors.phone.message}</p>}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50">WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="If different from phone"
                      {...register("whatsappNumber")}
                      className="w-full border-b border-charcoal/20 py-3 bg-transparent outline-none focus:border-gold transition-colors text-lg font-light text-charcoal placeholder:text-charcoal/20"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50">Email Address</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full border-b border-charcoal/20 py-3 bg-transparent outline-none focus:border-gold transition-colors text-lg font-light text-charcoal"
                    />
                    {errors.email && <p className="text-red-500/80 text-xs tracking-wider uppercase mt-1 font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="pt-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50">Tell us about your vision</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Any specific themes, ideas, or questions?"
                      className="w-full border-b border-charcoal/20 py-3 bg-transparent outline-none focus:border-gold transition-colors resize-none font-light text-lg placeholder:text-charcoal/20"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 block mb-6">Approximate Budget (Optional)</label>
                  <div className="flex flex-wrap gap-3">
                    {budgets.map((b) => (
                      <div
                        key={b}
                        onClick={() => setValue("budget", b)}
                        className={cn(
                          "px-5 py-2.5 text-xs tracking-widest uppercase border cursor-pointer transition-all duration-300 rounded-sm",
                          formValues.budget === b 
                            ? "bg-charcoal text-ivory border-charcoal" 
                            : "bg-white border-charcoal/10 hover:border-charcoal/30 text-charcoal/70"
                        )}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: REVIEW */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="font-heading text-3xl text-charcoal mb-10 text-center italic">Review Your Event</h3>
                
                <div className="bg-white p-8 md:p-12 rounded-sm border border-charcoal/5 shadow-xl shadow-charcoal/5 mb-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-2">Event</p>
                      <p className="font-medium text-lg text-charcoal font-light">{formValues.eventType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-2">Date</p>
                      <p className="font-medium text-lg text-charcoal font-light">
                        {formValues.eventDate} {formValues.flexibleDate && <span className="text-sm text-charcoal/40 italic ml-2">(Flexible)</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-2">Location</p>
                      <p className="font-medium text-lg text-charcoal font-light">{formValues.venue}</p>
                      <p className="text-sm text-charcoal/50 italic mt-1">{formValues.venueStatus}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-2">Guests</p>
                      <p className="font-medium text-lg text-charcoal font-light">{formValues.guestCount}</p>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-charcoal/5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-4">Services Requested</p>
                    <div className="flex flex-wrap gap-2">
                      {formValues.services?.map(s => (
                        <span key={s} className="px-4 py-1.5 bg-champagne text-charcoal text-xs tracking-wider uppercase rounded-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-charcoal/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-2">Client</p>
                      <p className="text-lg text-charcoal font-light">{formValues.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-2">Contact</p>
                      <p className="text-lg text-charcoal font-light mb-1">{formValues.phone}</p>
                      {formValues.email && <p className="text-sm text-charcoal/60 font-light">{formValues.email}</p>}
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-charcoal/40 mb-4 font-light tracking-wide">
                  By sending this enquiry, you'll be redirected to WhatsApp to share these details directly with our team.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-charcoal/10">
            {currentStep > 0 ? (
              <Button type="button" variant="link" onClick={prevStep} className="text-charcoal/50 hover:text-charcoal uppercase tracking-widest text-xs">
                Back
              </Button>
            ) : (
              <div /> // Placeholder to push next button right
            )}

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep} className="bg-charcoal text-ivory hover:bg-gold transition-colors">
                Continue
              </Button>
            ) : (
              <Button type="submit" size="lg" className="bg-gold text-ivory hover:bg-gold/90 px-10 transition-colors">
                Send Event Enquiry
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

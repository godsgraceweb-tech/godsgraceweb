export const siteConfig = {
  name: "God's Grace Wedding & Event Planners",
  shortName: "God's Grace",
  tagline: "Beautifully Planned. Gracefully Celebrated.",
  location: "Thiruvalla, Kerala",
  description: "God's Grace Wedding & Event Planners is a complete event planning and coordination company based in Thiruvalla, Kerala.",
  url: "https://godsgraceplanners.com",
  contact: {
    phones: ["+91 95620 44986", "+91 79074 14337"],
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919562044986",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "godgraceweddingplanners33@gmail.com",
    address: "God's Grace Wedding & Event Planners, Attupurathu Building, Thottabhagom P.O., Thiruvalla, Kerala - 689541",
  },
  socials: {
    instagram: "https://instagram.com/[ADD_INSTAGRAM]",
    facebook: "https://facebook.com/[ADD_FACEBOOK]",
  },
  services: [
    {
      id: "venue-decor",
      title: "Venue & Décor Services",
      shortDescription: "Spaces Designed to Celebrate",
      description: "We transform ordinary spaces into elegant settings that reflect the beauty and personality of your occasion.",
      items: [
        "Auditorium arrangements",
        "House decoration",
        "Stage decoration",
        "Stage settings",
        "Entrance decoration",
        "Pathway decoration",
        "Tables with décor",
        "Chairs",
        "Chair covers and tie-backs",
      ],
      image: "/images/service-1.jpg"
    },
    {
      id: "wedding-essentials",
      title: "Wedding Essentials",
      shortDescription: "From the First Invitation to the Final Detail",
      description: "We coordinate the essential elements that bring comfort, beauty and completeness to your wedding celebration.",
      items: [
        "Invitation cards",
        "Beautician services",
        "Return gifts",
        "Food and catering coordination",
        "Costume designs",
      ],
      image: "/images/service-2.jpg"
    },
    {
      id: "media-production",
      title: "Media, Lighting & Production",
      shortDescription: "Beautifully Presented. Perfectly Remembered.",
      description: "From professional event coverage to reliable technical arrangements, we help every important moment look and feel exceptional.",
      items: [
        "Videography",
        "Photo album",
        "Stage lighting",
        "Music system",
        "Generator support",
      ],
      image: "/images/service-3.jpg"
    },
    {
      id: "entertainment",
      title: "Entertainment & Guest Experience",
      shortDescription: "Creating an Engaging Celebration",
      description: "We coordinate entertainment and guest-support services that add energy, organisation and elegance to your occasion.",
      items: [
        "Dance teams",
        "Musical instruments",
        "Hosting girls with theme costumes",
        "Event security",
      ],
      image: "/images/service-4.jpg"
    },
    {
      id: "transportation",
      title: "Wedding Transportation",
      shortDescription: "Arrive in Style",
      description: "We coordinate comfortable and beautifully presented transportation for the couple, family members and invited guests.",
      items: [
        "Car for the couple",
        "Wedding car decoration",
        "Tourist bus arrangements",
      ],
      image: "/images/service-5.jpg"
    }
  ],
  process: [
    {
      id: "01",
      title: "DISCOVER",
      description: "We understand your event, expectations, preferences and requirements."
    },
    {
      id: "02",
      title: "DESIGN",
      description: "We develop the event concept, styling direction and service plan."
    },
    {
      id: "03",
      title: "PLAN",
      description: "Every supplier, schedule and arrangement is carefully coordinated."
    },
    {
      id: "04",
      title: "EXECUTE",
      description: "Our team manages the event setup and important operational details."
    },
    {
      id: "05",
      title: "CELEBRATE",
      description: "You enjoy the occasion while we help everything move smoothly."
    }
  ],
  values: [
    {
      title: "GRACE",
      description: "We treat every occasion and every client with respect."
    },
    {
      title: "CREATIVITY",
      description: "We approach each event with fresh ideas and thoughtful styling."
    },
    {
      title: "RELIABILITY",
      description: "We remain committed to responsible planning and coordination."
    },
    {
      title: "QUALITY",
      description: "We focus on refined presentation and well-managed execution."
    },
    {
      title: "CARE",
      description: "We understand the emotional importance behind every celebration."
    }
  ]
};

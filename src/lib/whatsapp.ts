import { siteConfig } from "@/config/site";

export interface EventEnquiry {
  eventType: string;
  eventDate: string;
  flexibleDate: boolean;
  venue: string;
  venueStatus: string;
  guestCount: string;
  services: string[];
  budget: string;
  name: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  message: string;
}

export function buildWhatsAppMessage(data: EventEnquiry): string {
  const messageLines = [
    `Hello God's Grace Wedding & Event Planners,`,
    ``,
    `I would like to enquire about planning my event.`,
    ``,
    `*EVENT DETAILS*`,
    `Event Type: ${data.eventType}`,
    `Event Date: ${data.eventDate}${data.flexibleDate ? ' (Flexible)' : ''}`,
    `Venue: ${data.venue} (${data.venueStatus})`,
    `Guest Count: ${data.guestCount}`,
    `Services Required: ${data.services.join(", ")}`,
    `Budget: ${data.budget}`,
    ``,
    `*CLIENT DETAILS*`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    ...(data.whatsappNumber ? [`WhatsApp: ${data.whatsappNumber}`] : []),
    ...(data.email ? [`Email: ${data.email}`] : []),
    ``,
    `*ADDITIONAL DETAILS*`,
    data.message ? data.message : "No additional details provided.",
    ``,
    `I would like to discuss this event with your team.`,
    `Thank you.`
  ];

  return messageLines.join('\n');
}

export function getWhatsAppUrl(data: EventEnquiry): string {
  const message = buildWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(message);
  const number = siteConfig.contact.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

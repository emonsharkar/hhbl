import { textExtra, type ContentRow } from "@/lib/content";

export const primaryContact = {
  callLabel: "09678 771 442",
  callHref: "tel:09678771442",
  whatsappLabel: "+880 1821 978 495",
  whatsappHref: "https://wa.me/8801821978495",
} as const;

export function resolvePrimaryContact(content: ContentRow) {
  const callLabel = textExtra(content, "call_label", primaryContact.callLabel);
  const whatsappLabel = textExtra(content, "whatsapp_label", primaryContact.whatsappLabel);
  return { callLabel, callHref: `tel:${callLabel.replace(/[^+\d]/g, "")}`, whatsappLabel, whatsappHref: `https://wa.me/${whatsappLabel.replace(/\D/g, "")}` };
}
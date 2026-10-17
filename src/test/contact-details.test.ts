import { describe, expect, it } from "vitest";
import { primaryContact, resolvePrimaryContact } from "@/lib/contact-details";

describe("Primary contact destinations", () => {
  it("calls 09678 771 442", () => {
    expect(primaryContact.callHref).toBe("tel:09678771442");
  });
  it("opens WhatsApp for +880 1821 978 495", () => {
    expect(primaryContact.whatsappHref).toBe("https://wa.me/8801821978495");
  });
  it("uses edited phone numbers for both contact destinations", () => {
    const contact = resolvePrimaryContact({section_key:"contact",heading:"",body:"",extra:{call_label:"01234 567890",whatsapp_label:"+880 1700 123456"}});
    expect(contact.callHref).toBe("tel:01234567890");
    expect(contact.whatsappHref).toBe("https://wa.me/8801700123456");
  });
});
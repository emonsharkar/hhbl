import { describe, expect, it } from "vitest";
import { primaryContact } from "@/lib/contact-details";

describe("Primary contact destinations", () => {
  it("calls 09678 771 442", () => {
    expect(primaryContact.callHref).toBe("tel:09678771442");
  });
  it("opens WhatsApp for +880 1821 978 495", () => {
    expect(primaryContact.whatsappHref).toBe("https://wa.me/8801821978495");
  });
});
import { describe, expect, it } from "vitest";
import { parseContact } from "./contact-schema";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = {
  name: "  Jane Smith ",
  email: "jane@example.co.nz",
  phone: "021 123 4567",
  message: "Please quote for gib stopping a three-bedroom house.",
  company: "",
};

describe("parseContact", () => {
  it("accepts valid input and trims values", () => {
    expect(parseContact(form(valid))).toEqual({
      ok: true,
      spam: false,
      data: {
        name: "Jane Smith",
        email: "jane@example.co.nz",
        phone: "021 123 4567",
        message: "Please quote for gib stopping a three-bedroom house.",
      },
    });
  });

  it("treats an empty phone as not provided", () => {
    const result = parseContact(form({ ...valid, phone: "   " }));
    expect(result.ok && !result.spam && result.data.phone).toBeUndefined();
  });

  it.each([
    ["name", { name: "J" }],
    ["email", { email: "not-an-email" }],
    ["phone", { phone: "call me maybe" }],
    ["message", { message: "Hi" }],
  ])("reports an error for an invalid %s", (field, override) => {
    const result = parseContact(form({ ...valid, ...override }));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors)).toEqual([field]);
    }
  });

  it("reports errors when fields are missing entirely", () => {
    const result = parseContact(new FormData());
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["email", "message", "name"]);
    }
  });

  it("flags a filled honeypot as spam", () => {
    expect(parseContact(form({ ...valid, company: "Acme Ltd" }))).toEqual({ ok: true, spam: true });
  });
});

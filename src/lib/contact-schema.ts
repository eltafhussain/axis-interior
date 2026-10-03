import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .max(200, "Please enter a shorter email address.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(30, "Please enter a valid phone number.")
    .regex(/^[0-9+()\s-]*$/, "Please enter a valid phone number.")
    .transform((value) => value || undefined),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about your project.")
    .max(5000, "Please keep your message under 5000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ParseResult =
  | { ok: true; spam: false; data: ContactInput }
  | { ok: true; spam: true }
  | { ok: false; fieldErrors: ContactFieldErrors };

const fields: ContactField[] = ["name", "email", "phone", "message"];

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Validates a contact form submission. `company` is a hidden honeypot field. */
export function parseContact(formData: FormData): ParseResult {
  if (text(formData, "company").trim() !== "") {
    return { ok: true, spam: true };
  }

  const result = contactSchema.safeParse(
    Object.fromEntries(fields.map((field) => [field, text(formData, field)])),
  );

  if (result.success) {
    return { ok: true, spam: false, data: result.data };
  }

  const fieldErrors: ContactFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField;
    fieldErrors[field] ??= issue.message;
  }
  return { ok: false, fieldErrors };
}

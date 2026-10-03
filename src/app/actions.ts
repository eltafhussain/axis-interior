"use server";

import { Resend } from "resend";
import { parseContact, type ContactField, type ContactFieldErrors } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors; values: ContactValues };

/** Submitted values, echoed back so React's automatic form reset doesn't wipe the visitor's input on error. */
export type ContactValues = Partial<Record<ContactField, string>>;

const sendFailedMessage = `Sorry, your message couldn't be sent. Please call us on ${site.phone.display} or email ${site.email}.`;

function submittedValues(formData: FormData): ContactValues {
  const values: ContactValues = {};
  for (const field of ["name", "email", "phone", "message"] as const) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value;
  }
  return values;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = parseContact(formData);

  // Pretend honeypot submissions succeeded so bots get no signal.
  if (parsed.ok && parsed.spam) return { status: "success" };

  if (!parsed.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
      values: submittedValues(formData),
    };
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return { status: "error", message: sendFailedMessage, values: submittedValues(formData) };
  }

  const { name, email, phone, message } = parsed.data;
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Website enquiry from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone ?? "not given"}`, "", message].join("\n"),
  });

  if (error) {
    console.error("Resend failed to send contact email:", error);
    return { status: "error", message: sendFailedMessage, values: submittedValues(formData) };
  }

  return { status: "success" };
}

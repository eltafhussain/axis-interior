"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import type { ContactField } from "@/lib/contact-schema";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const fieldErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <form action={formAction} noValidate className="rounded-lg bg-white p-6 shadow-xl sm:p-8">
      <h3 className="font-display text-2xl font-black uppercase text-navy">Request a free quote</h3>
      <p className="mt-1 text-sm">Tell us about your project and we&apos;ll get back to you with a free quote.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field name="name" defaultValue={values.name} label="Name" autoComplete="name" required error={fieldErrors.name} />
        <Field name="email" defaultValue={values.email} label="Email" type="email" autoComplete="email" required error={fieldErrors.email} />
        <Field
          name="phone"
          defaultValue={values.phone}
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          error={fieldErrors.phone}
          className="sm:col-span-2"
        />
        <Field name="message" defaultValue={values.message} label="Project details" multiline required error={fieldErrors.message} className="sm:col-span-2" />
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-yellow px-7 py-3.5 font-display font-extrabold uppercase tracking-wide text-navy transition-colors hover:bg-yellow-light disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm font-semibold">
          {state.status === "success" && (
            <span className="text-green-700">Thanks! Your message has been sent. We&apos;ll be in touch soon.</span>
          )}
          {state.status === "error" && <span className="text-red-700">{state.message}</span>}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  name: ContactField;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  defaultValue?: string;
  error?: string;
  className?: string;
};

function Field({ name, label, type = "text", autoComplete, required, multiline, defaultValue, error, className = "" }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const inputClass = `mt-1.5 block w-full rounded border bg-slate-50 px-3.5 py-2.5 text-charcoal outline-none focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/20 ${
    error ? "border-red-600" : "border-slate-300"
  }`;
  const shared = {
    id,
    name,
    required,
    autoComplete,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: inputClass,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-bold text-navy">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import { services } from "@/lib/data/services";
import AnimateIn from "@/components/ui/AnimateIn";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const errs: Record<string, string> = {};
    if (!form.get("name")) errs.name = "Name is required";
    const email = form.get("email") as string;
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";
    if (!form.get("message")) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Get In Touch
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
            Let&apos;s Start a Conversation
          </h2>
        </AnimateIn>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Form — left */}
          <AnimateIn direction="left" distance={30} className="lg:col-span-3">
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-700 text-[#1A1A1A]">
                  Message Sent!
                </h3>
                <p className="mt-2 text-[15px] text-[var(--color-text-muted)]">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field name="name" label="Name" error={errors.name} required />
                  <Field name="email" label="Email" type="email" error={errors.email} required />
                  <Field name="phone" label="Phone" type="tel" />
                  <Field name="company" label="Company" />
                </div>

                {/* Service dropdown */}
                <div>
                  <label htmlFor="service" className="mb-1.5 block text-[13px] font-500 text-[var(--color-text-secondary)]">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 text-[14px] text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)]"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                    <option value="not-sure">Not Sure</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[13px] font-500 text-[var(--color-text-secondary)]">
                    Message <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={`w-full rounded-lg border px-4 py-3 text-[14px] text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] ${
                      errors.message ? "border-red-400" : "border-[var(--color-border)]"
                    }`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-[12px] text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center rounded-full bg-[var(--color-primary)] px-8 text-[15px] font-600 text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary-glow)]"
                >
                  Send Message
                </button>
              </form>
            )}
          </AnimateIn>

          {/* Contact info card — right */}
          <AnimateIn direction="right" distance={30} delay={0.15} className="lg:col-span-2">
            <div className="rounded-2xl bg-[#0A0A0A] p-8 text-white lg:p-10">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-700">
                Contact Info
              </h3>

              <div className="mt-8 space-y-6">
                <ContactRow icon={MapPin} label="Address" value="Frisco, TX" />
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value="(469) 759-3638"
                  href="tel:4697593638"
                />
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value="hello@nixarsolutions.com"
                  href="mailto:hello@nixarsolutions.com"
                />
                <ContactRow icon={Clock} label="Hours" value="Mon – Fri: 9am – 6pm CST" />
              </div>

              {/* Social */}
              <div className="mt-8 flex gap-3 border-t border-white/10 pt-6">
                {["Instagram", "LinkedIn", "Facebook", "X"].map((name) => (
                  <a
                    key={name}
                    href={`https://${name.toLowerCase()}.com/nixarsolutions`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[12px] font-600 text-white/40 transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {name[0]}
                  </a>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-500 text-[var(--color-text-secondary)]">
        {label} {required && <span className="text-[var(--color-primary)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`h-12 w-full rounded-lg border px-4 text-[14px] text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] ${
          error ? "border-red-400" : "border-[var(--color-border)]"
        }`}
      />
      {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const ValueTag = href ? "a" : "span";
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
        <Icon size={18} className="text-[var(--color-primary)]" />
      </div>
      <div>
        <p className="text-[12px] font-500 uppercase tracking-wider text-white/30">{label}</p>
        <ValueTag
          {...(href ? { href } : {})}
          className="mt-0.5 text-[14px] text-white/70 transition-colors hover:text-white"
        >
          {value}
        </ValueTag>
      </div>
    </div>
  );
}

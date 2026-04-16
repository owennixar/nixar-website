"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Check } from "lucide-react";
import { trackFormSubmit } from "@/lib/analytics/track-client";

export default function FreeAuditForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    if (!form.get("name")) errs.name = "Required";
    const email = String(form.get("email") ?? "");
    if (!email) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";
    if (!form.get("phone")) errs.phone = "Required";
    if (!form.get("business")) errs.business = "Required";
    setErrors(errs);
    if (Object.keys(errs).length !== 0) return;

    setSubmitting(true);
    await trackFormSubmit({
      form: "free_audit",
      name: String(form.get("name") ?? ""),
      email,
      phone: String(form.get("phone") ?? ""),
      fields: {
        business: String(form.get("business") ?? ""),
        website: String(form.get("website") ?? "") || undefined,
        goals: String(form.get("goals") ?? "").slice(0, 2000) || undefined,
      },
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <Check size={28} className="text-green-500" />
        </div>
        <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-xl font-700 uppercase text-white">
          Request received
        </h3>
        <p className="mt-3 max-w-sm text-[16px] text-white/85">
          We&apos;ll review your site and email your audit within 48 hours. Check
          your inbox (and spam just in case).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Field name="name" placeholder="Name" error={errors.name} />
      <Field name="email" placeholder="Email" type="email" error={errors.email} />
      <Field name="phone" placeholder="Phone" type="tel" error={errors.phone} />
      <Field name="business" placeholder="Business Name" error={errors.business} />
      <Field name="website" placeholder="Website URL" type="url" />
      <textarea
        name="goals"
        rows={4}
        placeholder="Tell us about your business goals"
        className="resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/75 outline-none focus:border-[var(--color-primary)]/40 transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 h-12 rounded-full bg-[var(--color-primary)] px-8 font-600 text-white transition-colors hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Get My Free Audit"}
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
        {["No cost.", "No obligation.", "Just clarity."].map((t) => (
          <span key={t} className="flex items-center gap-2 text-base text-white/85">
            <CheckCircle2 size={16} />
            {t}
          </span>
        ))}
      </div>
    </form>
  );
}

function Field({
  name,
  placeholder,
  type = "text",
  error,
}: {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/75 outline-none transition-colors focus:border-[var(--color-primary)]/40 ${
          error ? "border-red-400/60" : "border-white/10"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

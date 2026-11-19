"use client";

import { ArrowUpRight, CircleAlert, CircleCheck, Info, LoaderCircle, Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { personal } from "@/data/personal";
import { btn, cn, isConfigured, isDev } from "@/lib/utils";
import { socialHref, socialMeta, useUnconfiguredNotice, type SocialKey } from "@/components/ui/Actions";
import { DevHint, Reveal, Section, SectionHeading } from "@/components/ui/Primitives";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "mailto" }
  | { state: "error"; message: string }
  | { state: "unavailable" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject (at least 3 characters).";
  if (v.message.trim().length < 20) e.message = "Your message should be at least 20 characters.";
  if (v.message.length > 3000) e.message = "Please keep your message under 3000 characters.";
  return e;
}

const empty: Fields = { name: "", email: "", subject: "", message: "" };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label} <span className="text-danger" aria-hidden>*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
          <CircleAlert className="size-3.5" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border bg-white/70 px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

export function Contact() {
  const uid = useId();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honey, setHoney] = useState("");
  const notice = useUnconfiguredNotice();

  const { email, formEndpoint } = personal.contact;
  const hasEndpoint = isConfigured(formEndpoint);
  const hasEmail = isConfigured(email);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched) setErrors(validate(next));
    if (status.state !== "idle" && status.state !== "sending") setStatus({ state: "idle" });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (honey) return; // bot

    if (hasEndpoint) {
      setStatus({ state: "sending" });
      try {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setStatus({ state: "sent" });
        setValues(empty);
        setTouched(false);
      } catch {
        setStatus({
          state: "error",
          message: "Something went wrong and your message was not sent. Please try again in a moment.",
        });
      }
      return;
    }

    if (hasEmail) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ state: "mailto" });
      return;
    }

    setStatus({ state: "unavailable" });
  };

  const methods: SocialKey[] = ["email", "github", "linkedin"];
  const sending = status.state === "sending";

  return (
    <Section id="contact" labelledBy="contact-title" className="border-t border-line">
      <SectionHeading
        id="contact-title"
        title="Have a project in mind? Let's connect."
        description="I'm always interested in connecting with developers, exploring new ideas, and discovering opportunities to grow in the technology industry."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-3">
          {methods.map((key) => {
            const href = socialHref(key);
            const { label, icon: Icon } = socialMeta[key];
            const value = personal.contact[key];
            const display = key === "email" ? value : value.replace(/^https?:\/\/(www\.)?/, "");
            const inner = (
              <>
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-xs text-subtle">{label}</span>
                  <span className="block truncate text-sm font-medium">{href ? display : "Not configured yet"}</span>
                </span>
                <ArrowUpRight className="size-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" aria-hidden />
              </>
            );
            const cls =
              "glass group flex w-full items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/75";
            if (href)
              return (
                <a key={key} href={href} className={cls} {...(key !== "email" && { target: "_blank", rel: "noopener noreferrer" })}>
                  {inner}
                </a>
              );
            if (!isDev) return null;
            return (
              <button key={key} type="button" onClick={() => notice(key)} className={cn(cls, "cursor-pointer border-dashed opacity-70")}>
                {inner}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={0.08}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="glass space-y-5 rounded-2xl p-6 md:p-8"
            aria-describedby={`${uid}-form-note`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Name" error={errors.name}>
                <input
                  id={`${uid}-name`}
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={set("name")}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                  className={cn(inputCls, errors.name ? "border-danger/60" : "border-line")}
                />
              </Field>
              <Field id={`${uid}-email`} label="Email" error={errors.email}>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set("email")}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                  className={cn(inputCls, errors.email ? "border-danger/60" : "border-line")}
                />
              </Field>
            </div>
            <Field id={`${uid}-subject`} label="Subject" error={errors.subject}>
              <input
                id={`${uid}-subject`}
                name="subject"
                value={values.subject}
                onChange={set("subject")}
                placeholder="Internship opportunity, collaboration, project idea…"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? `${uid}-subject-error` : undefined}
                className={cn(inputCls, errors.subject ? "border-danger/60" : "border-line")}
              />
            </Field>
            <Field id={`${uid}-message`} label="Message" error={errors.message}>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={6}
                value={values.message}
                onChange={set("message")}
                placeholder="Tell me a little about what you have in mind…"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                className={cn(inputCls, "resize-y", errors.message ? "border-danger/60" : "border-line")}
              />
              <p className="mt-1.5 text-right font-mono text-[10px] text-subtle">{values.message.length} / 3000</p>
            </Field>

            {/* Honeypot (hidden from people) */}
            <div className="hidden" aria-hidden>
              <label>
                Leave this empty
                <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
              </label>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p id={`${uid}-form-note`} className="text-xs text-subtle">
                {hasEndpoint
                  ? "Your message will be delivered directly."
                  : hasEmail
                    ? "Submitting opens your email app with this message ready to send."
                    : "This form is not connected to a mail service yet."}
              </p>
              <button type="submit" disabled={sending} className={cn(btn.base, btn.primary, "shrink-0")}>
                {sending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
                {sending ? "Sending…" : hasEndpoint ? "Send message" : hasEmail ? "Continue in email app" : "Send message"}
              </button>
            </div>

            <div aria-live="polite">
              {status.state === "sent" && (
                <p className="flex items-start gap-2 rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success">
                  <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden /> Thank you! Your message has been sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status.state === "mailto" && (
                <p className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm text-fg/90">
                  <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> Your email app should now be open with the message
                  filled in. It hasn&apos;t been sent yet — press send in your email app to deliver it.
                </p>
              )}
              {status.state === "error" && (
                <p className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
                  <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden /> {status.message}
                </p>
              )}
              {status.state === "unavailable" && (
                <div className="space-y-2">
                  <p className="flex items-start gap-2 rounded-lg border border-gold/30 bg-gold/10 p-3 text-sm text-fg/90">
                    <CircleAlert className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    <span>
                      Your message looks good, but it was <strong>not sent</strong> — online messaging isn&apos;t set up yet.
                      Please try again later.
                    </span>
                  </p>
                  <DevHint>
                    Set contact.formEndpoint (e.g. a Formspree URL) or contact.email in src/data/personal.ts to enable the form.
                  </DevHint>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

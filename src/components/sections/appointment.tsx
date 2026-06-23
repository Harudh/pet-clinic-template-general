import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, CheckCircle2, Clock, Phone, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { AuroraBackground } from "@/components/magic/aurora-background";
import { AuroraText } from "@/components/magic/aurora-text";
import { Reveal } from "@/components/magic/reveal";
import { clinic, petTypes, serviceOptions, timeSlots } from "@/data/site";

const perks = [
  { icon: Clock, title: "Same-day slots", text: "Most appointments confirmed within the hour." },
  { icon: CalendarHeart, title: "Fear-free visits", text: "Gentle, low-stress handling for every pet." },
  { icon: Sparkles, title: "No hidden fees", text: "Transparent pricing shared before we begin." },
];

export function Appointment() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="appointment" className="relative overflow-hidden py-24 sm:py-28">
      <AuroraBackground withGrid={false} />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Info */}
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Badge variant="soft">Book a Visit</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.7rem]">
              Schedule your pet's <AuroraText>next visit</AuroraText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Pick a time that works for you and our team will confirm by text or email. Need urgent
              help? Our emergency line is open around the clock.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="w-full">
            <div className="flex flex-col gap-4">
              {perks.map((perk) => (
                <div key={perk.title} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-soft">
                    <perk.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{perk.title}</p>
                    <p className="text-sm text-muted-foreground">{perk.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={`tel:${clinic.emergencyPhone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-3"
            >
              <span className="grid size-10 place-items-center rounded-full bg-destructive/10 text-destructive">
                <Phone className="size-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-muted-foreground">24/7 Emergency line</span>
                <span className="font-semibold text-foreground">{clinic.emergencyPhone}</span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Form card */}
        <Reveal direction="left">
          <div className="relative rounded-3xl border border-border bg-card/80 p-6 shadow-elevated backdrop-blur-xl sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary"
                  >
                    <CheckCircle2 className="size-9" />
                  </motion.span>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Request received!
                  </h3>
                  <p className="max-w-sm text-muted-foreground">
                    Thank you — we'll confirm your appointment shortly via text or email. Keep an eye
                    on your inbox!
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Book another visit
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name" htmlFor="name" required>
                      <Input id="name" name="name" placeholder="Jane Doe" required />
                    </Field>
                    <Field label="Phone" htmlFor="phone" required>
                      <Input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" required />
                    </Field>
                  </div>

                  <Field label="Email" htmlFor="email" required>
                    <Input id="email" name="email" type="email" placeholder="jane@email.com" required />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Pet type" htmlFor="pet">
                      <Select id="pet" name="pet" defaultValue="">
                        <option value="" disabled>
                          Select pet
                        </option>
                        {petTypes.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Service" htmlFor="service">
                      <Select id="service" name="service" defaultValue="">
                        <option value="" disabled>
                          Select service
                        </option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Preferred date" htmlFor="date">
                      <Input id="date" name="date" type="date" />
                    </Field>
                    <Field label="Preferred time" htmlFor="time">
                      <Select id="time" name="time" defaultValue="">
                        <option value="" disabled>
                          Select time
                        </option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <Field label="Anything we should know?" htmlFor="notes">
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Tell us about your pet's symptoms or special needs…"
                    />
                  </Field>

                  <Button type="submit" size="lg" className="mt-2 w-full">
                    Confirm Appointment
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    By booking you agree to our friendly cancellation policy. No charge to reschedule.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

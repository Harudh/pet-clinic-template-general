import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, PlayCircle, ShieldPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/magic/particles";
import SideRays from "@/components/magic/side-rays";
import { SplitText } from "@/components/magic/split-text";
import { ShinyText } from "@/components/magic/shiny-text";
import { MorphingText } from "@/components/magic/morphing-text";
import { useTheme } from "@/components/theme-provider";
import { clinic, testimonials, trustHighlights } from "@/data/site";
import { unsplash } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const floatCard =
  "glass absolute z-20 flex items-center gap-3 rounded-2xl border border-border/70 p-3 shadow-soft";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40">
      {/* Background: ReactBits SideRays light beams + particle field + grid */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" />
        <div className="absolute inset-0">
          <SideRays
            origin="top-left"
            rayColor1="#16c4ac"
            rayColor2="#ffc97a"
            speed={2.5}
            intensity={isDark ? 3.6 : 2.7}
            spread={2}
            tilt={0}
            saturation={1.4}
            blend={0.5}
            falloff={1.1}
            opacity={isDark ? 1 : 0.75}
          />
        </div>
        <Particles className="opacity-70" quantity={70} />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start gap-6">
          <motion.div variants={item}>
            <Badge variant="glass" className="py-2">
              <span className="flex -space-x-2">
                {testimonials.slice(0, 3).map((t) => (
                  <img
                    key={t.name}
                    src={t.avatar}
                    alt=""
                    className="size-6 rounded-full border-2 border-card object-cover"
                    loading="lazy"
                  />
                ))}
              </span>
              <ShinyText text="Loved by 12,000+ pet parents" className="font-semibold" speed={4} />
            </Badge>
          </motion.div>

          <SplitText
            as="h1"
            text="Compassionate care for your furry family"
            highlight={["furry", "family"]}
            highlightClassName="text-aurora"
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            delay={0.15}
            stagger={0.022}
          />

          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            From routine check-ups to round-the-clock emergencies, {clinic.name} blends advanced
            medicine with a gentle, fear-free touch — so every visit feels like a walk in the park.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xl font-semibold text-foreground"
          >
            <span>Expert care for</span>
            <MorphingText
              words={["dogs 🐕", "cats 🐈", "rabbits 🐇", "birds 🦜", "every companion 🐾"]}
              className="text-primary"
            />
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Button href="#appointment" size="lg">
              Book an Appointment
              <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button href="#services" size="lg" variant="outline">
              <PlayCircle />
              Explore Services
            </Button>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {trustHighlights.map((h) => (
              <div key={h.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <h.icon className="size-4 text-primary" />
                {h.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          {/* glow */}
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-accent/30 to-chart-3/20 blur-2xl" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-elevated sm:aspect-square">
            <img
              src={unsplash("1583337130417-3346a1be7dee", 900, 900)}
              alt="Veterinarian gently examining a happy dog"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          </div>

          {/* Secondary floating image */}
          <motion.img
            src={unsplash("1518717758536-85ae29035b6d", 240, 240)}
            alt="Content cat"
            className="absolute -bottom-6 -left-6 z-20 hidden size-28 animate-float-slow rounded-2xl border-4 border-card object-cover shadow-soft sm:block"
            loading="lazy"
          />

          {/* Rating card */}
          <div className={`${floatCard} -left-4 top-10 animate-float`}>
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Star className="size-5 fill-current" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">4.9 / 5.0</p>
              <p className="text-xs text-muted-foreground">2,400+ reviews</p>
            </div>
          </div>

          {/* Appointment card */}
          <div className={`${floatCard} -right-4 bottom-16 animate-float-slow`}>
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <CalendarCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">Next available</p>
              <p className="text-xs text-muted-foreground">Today · 2:30 PM</p>
            </div>
          </div>

          {/* Emergency badge */}
          <div className="glass absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full border border-border/70 py-2 pl-2.5 pr-4 shadow-soft">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-destructive" />
              <span className="relative inline-flex size-2.5 rounded-full bg-destructive" />
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
              <ShieldPlus className="size-3.5 text-destructive" /> 24/7 Emergency
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

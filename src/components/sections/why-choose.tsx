import { AuroraText } from "@/components/magic/aurora-text";
import { Reveal } from "@/components/magic/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { whyChoose } from "@/data/site";

export function WhyChoose() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-secondary/40" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        {/* Left — heading */}
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Badge variant="soft">Why PawHaven</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Care that goes <AuroraText>above and beyond</AuroraText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              We've reimagined the vet visit from the ground up — blending clinical excellence with
              the kind of warmth that turns nervous pets into wagging tails.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button href="#appointment" size="lg">
              Schedule a Visit
            </Button>
          </Reveal>
        </div>

        {/* Right — feature grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {whyChoose.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 2) * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/40 text-primary">
                  <feature.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

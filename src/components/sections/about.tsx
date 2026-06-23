import { Check, PhoneCall } from "lucide-react";
import { AuroraText } from "@/components/magic/aurora-text";
import { Reveal } from "@/components/magic/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aboutPoints, clinic } from "@/data/site";
import { unsplash } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Images */}
        <Reveal direction="right" className="relative">
          <div className="relative grid grid-cols-5 grid-rows-6 gap-4">
            <div className="col-span-3 row-span-6 overflow-hidden rounded-3xl border border-border shadow-soft">
              <img
                src={unsplash("1559190394-df5a28aab5c5", 600, 760)}
                alt="Veterinarian caring for a dog"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl border border-border shadow-soft">
              <img
                src={unsplash("1601758228041-f3b2795255f1", 400, 360)}
                alt="Happy dog portrait"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl border border-border shadow-soft">
              <img
                src={unsplash("1535930891776-0c2dfb7fda1a", 400, 360)}
                alt="Playful kitten"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Experience badge */}
          <div className="glass absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-border/70 px-5 py-3 shadow-elevated">
            <AuroraText className="font-display text-3xl font-bold">15+</AuroraText>
            <span className="text-sm font-medium leading-tight text-foreground">
              Years of <br /> trusted care
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Badge variant="soft">About {clinic.name}</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              A vet your pet will actually <AuroraText>look forward to</AuroraText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Since 2009, {clinic.fullName} has been a second home for pets across Riverside. Our
              fear-free certified team combines cutting-edge medicine with genuine warmth, creating a
              calm space where animals feel safe and owners feel heard.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="w-full">
            <ul className="grid gap-3 sm:grid-cols-2">
              {aboutPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="#appointment" size="lg">
                Meet the Team
              </Button>
              <a
                href={clinic.phoneHref}
                className="flex items-center gap-3 text-sm font-semibold text-foreground"
              >
                <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                  <PhoneCall className="size-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-normal text-muted-foreground">Call us today</span>
                  {clinic.phone}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

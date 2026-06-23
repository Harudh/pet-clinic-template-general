import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * ReactBits-style Light Rays — soft volumetric beams ("god rays") fanning out
 * from a glowing source at the top, with a couple of sharp laser beams and one
 * sweeping laser scan. Colour is driven by the `--primary` theme token.
 */

type Ray = {
  angle: number; // degrees from vertical
  width: number; // px
  o: number; // base opacity
  blur: number; // px
  dur: number; // s
  delay: number; // s
};

// Soft, wide light beams
const softRays: Ray[] = [
  { angle: -36, width: 46, o: 0.1, blur: 26, dur: 6, delay: 0 },
  { angle: -26, width: 34, o: 0.14, blur: 20, dur: 7.5, delay: 0.6 },
  { angle: -16, width: 56, o: 0.12, blur: 28, dur: 6.8, delay: 1.1 },
  { angle: -6, width: 30, o: 0.18, blur: 16, dur: 5.4, delay: 0.3 },
  { angle: 4, width: 50, o: 0.13, blur: 24, dur: 7.2, delay: 0.9 },
  { angle: 14, width: 34, o: 0.16, blur: 18, dur: 6.1, delay: 0.2 },
  { angle: 24, width: 44, o: 0.11, blur: 24, dur: 7.8, delay: 1.4 },
  { angle: 34, width: 38, o: 0.1, blur: 26, dur: 6.6, delay: 0.7 },
];

// Sharp, bright laser beams
const laserRays: Ray[] = [
  { angle: -20, width: 2.5, o: 0.4, blur: 1.5, dur: 3.2, delay: 0.4 },
  { angle: 10, width: 2, o: 0.45, blur: 1.2, dur: 2.6, delay: 1.2 },
  { angle: 28, width: 1.6, o: 0.32, blur: 1, dur: 3.8, delay: 0.8 },
];

function beamStyle(r: Ray): CSSProperties {
  return {
    width: `${r.width}px`,
    height: "135%",
    transform: `translateX(-50%) rotate(${r.angle}deg)`,
    transformOrigin: "top center",
    background:
      "linear-gradient(to bottom, color-mix(in oklch, var(--primary) 85%, white) 0%, var(--primary) 18%, transparent 78%)",
    filter: `blur(${r.blur}px)`,
    animation: `ray-glow ${r.dur}s ease-in-out ${r.delay}s infinite`,
    ["--ray-o" as string]: r.o,
  };
}

export function LightRays({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden", className)}
      aria-hidden
    >
      {/* Source glow */}
      <div
        className="absolute left-1/2 top-[-14rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 55%, white), color-mix(in oklch, var(--primary) 35%, transparent), transparent 72%)",
          animation: "ray-glow 5s ease-in-out infinite",
          ["--ray-o" as string]: 0.5,
        }}
      />

      {/* Soft volumetric rays */}
      {softRays.map((r, i) => (
        <div key={`s${i}`} className="absolute left-1/2 top-0" style={beamStyle(r)} />
      ))}

      {/* Sharp laser beams */}
      {laserRays.map((r, i) => (
        <div key={`l${i}`} className="absolute left-1/2 top-0" style={beamStyle(r)} />
      ))}

      {/* Sweeping laser scan */}
      <div
        className="absolute left-1/2 top-0 h-[140%] w-[2px] origin-top"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklch, var(--primary) 90%, white), var(--primary) 30%, transparent 80%)",
          boxShadow: "0 0 12px 1px color-mix(in oklch, var(--primary) 70%, transparent)",
          filter: "blur(0.5px)",
          transformOrigin: "top center",
          animation: "laser-sweep 7s ease-in-out infinite",
        }}
      />
    </div>
  );
}

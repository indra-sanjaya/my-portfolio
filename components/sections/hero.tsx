"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useAnimationConfig } from "@/hooks/use-animation-config";
import { CONTACT_LINKS } from "@/lib/profile-data";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Accent palette shared with the rest of the sections: sky, emerald, violet, amber. */
const STATS = [
  {
    to: 8,
    suffix: "+",
    label: "Years in HSE & environmental engineering",
    accent: "#0EA5E9",
  },
  {
    to: 700,
    suffix: "K+",
    label: "Tons CO2e reduction impact",
    accent: "#10B981",
  },
  {
    to: 0,
    suffix: "",
    label: "Lost-time incidents on LNG construction",
    accent: "#8B5CF6",
  },
  {
    to: 4,
    suffix: "",
    label: "Full-stack apps shipped to production",
    accent: "#F59E0B",
  },
] as const;

const SOCIAL_LINKS = CONTACT_LINKS.filter(
  (l) => l.label === "GitHub" || l.label === "LinkedIn",
);

function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute -top-24 -left-24 w-[min(90vw,640px)] h-[min(70vw,520px)] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(14,165,233,0.13) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute top-1/4 -right-20 w-[min(80vw,560px)] h-[min(80vw,560px)] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 65%)",
          filter: "blur(56px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[min(70vw,480px)] h-[min(40vw,260px)]"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(16,185,129,0.08) 0%, transparent 65%)",
          filter: "blur(56px)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

/** Counts up once on mount. SSR and first client render both show 0, so hydration always matches. */
function CountUp({
  to,
  suffix,
  delay,
}: {
  to: number;
  suffix: string;
  delay: number;
}) {
  const { prefersReduced } = useAnimationConfig();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReduced || to === 0) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      delay,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, delay, prefersReduced]);

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

function StatsRow() {
  const { durationSlow, prefersReduced } = useAnimationConfig();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const k = prefersReduced ? 0 : 1;

  return (
    <div
      ref={ref}
      className="mt-14 lg:mt-20 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-8"
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 * k }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: durationSlow * 0.7,
            delay: 0.9 * k + i * 0.12 * k,
            ease: EASE,
          }}
        >
          {/* Accent line draws left to right, like the Impact section */}
          <div className="h-px w-full bg-border/60 overflow-hidden">
            <motion.div
              className="h-full origin-left"
              style={{ background: stat.accent }}
              initial={{ scaleX: k ? 0 : 1 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{
                duration: 1.1 * k,
                delay: 1 * k + i * 0.14 * k,
                ease: EASE,
              }}
            />
          </div>
          <div className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            <CountUp to={stat.to} suffix={stat.suffix} delay={1 + i * 0.14} />
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-snug max-w-[24ch]">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function ProductFrame() {
  const { durationSlow, prefersReduced } = useAnimationConfig();
  const k = prefersReduced ? 0 : 1;

  return (
    <motion.a
      href="#project-tripplanner"
      aria-label="See the TripPlanner project"
      className="group relative block w-full max-w-[560px] mx-auto lg:max-w-none"
      initial={{ opacity: 0, y: 36 * k, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: durationSlow * 1.2, delay: 0.45 * k, ease: EASE }}
    >
      {/* soft coloured halo behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, rgba(14,165,233,0.22), transparent 70%), radial-gradient(60% 60% at 80% 80%, rgba(139,92,246,0.2), transparent 70%)",
          filter: "blur(36px)",
        }}
      />
      <div className="motion-safe:animate-[hero-float_9s_ease-in-out_infinite]">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20 transition-transform duration-500 lg:[transform:perspective(1400px)_rotateY(-6deg)_rotateX(2deg)] lg:group-hover:[transform:perspective(1400px)_rotateY(-2deg)_rotateX(0deg)]">
          <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-3.5 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
            </span>
            <span className="ml-2 truncate rounded-md bg-background/70 px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
              tripplanner.app
            </span>
          </div>
          <div className="relative aspect-[16/10] bg-muted">
            <Image
              src="/tripplanner/itinerary_detail.png"
              alt="TripPlanner itinerary page showing an AI-generated day-by-day plan"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 560px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="absolute -bottom-4 left-4 sm:-left-4 flex items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden />
          TripPlanner · Gemini-powered itineraries
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

/** One headline line, revealed from below through a clipping mask. */
function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const { durationSlow, prefersReduced } = useAnimationConfig();
  const k = prefersReduced ? 0 : 1;
  return (
    <span className="block overflow-clip pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: `${105 * k}%` }}
        animate={{ y: 0 }}
        transition={{
          duration: durationSlow * 1.1,
          delay: delay * k,
          ease: EASE,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const { duration, durationSlow, prefersReduced } = useAnimationConfig();
  const k = prefersReduced ? 0 : 1;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-clip section-padding pt-28 pb-14 sm:pt-32 sm:pb-20"
    >
      <HeroBackground />

      <div className="content-container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 * k }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration, ease: EASE }}
            >
              <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/[0.07] px-4 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#10B981]">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                </span>
                Fullstack Engineer · Open to roles
              </span>
            </motion.div>

            <h1 className="mt-7 text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium tracking-tight text-foreground leading-[1.06]">
              <RevealLine delay={0.1}>Industrial-grade rigor,</RevealLine>
              <RevealLine delay={0.22}>applied to</RevealLine>
              <RevealLine delay={0.34}>
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #0EA5E9 0%, #10B981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  fullstack software.
                </span>
              </RevealLine>
            </h1>

            {/* Four-colour rule, same palette as the section accents */}
            <div
              className="mt-6 flex h-0.5 w-28 gap-1 overflow-hidden rounded-full"
              aria-hidden
            >
              {["#0EA5E9", "#10B981", "#8B5CF6", "#F59E0B"].map((c, i) => (
                <motion.span
                  key={c}
                  className="h-full flex-1 origin-left"
                  style={{ background: c }}
                  initial={{ scaleX: k ? 0 : 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.8 * k,
                    delay: (0.5 + i * 0.1) * k,
                    ease: EASE,
                  }}
                />
              ))}
            </div>

            <motion.p
              className="mt-6 max-w-[56ch] text-[clamp(1rem,1.6vw,1.15rem)] leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 * k }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: durationSlow,
                delay: 0.3 * k,
                ease: EASE,
              }}
            >
              I'm Indra Sanjaya. After 8+ years in environmental and HSE
              engineering across oil & gas and heavy industry, I build
              full-stack and AI-powered systems, today for telecommunications in
              Jakarta.
            </motion.p>

            <motion.div
              className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
              initial={{ opacity: 0, y: 20 * k }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: durationSlow,
                delay: 0.4 * k,
                ease: EASE,
              }}
            >
              <a
                href="#projects"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:brightness-110 sm:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)",
                  boxShadow: "0 0 28px rgba(14,165,233,0.28)",
                }}
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 font-medium text-foreground transition-all duration-300 hover:scale-[1.02] hover:border-transparent hover:bg-secondary sm:w-auto"
              >
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: durationSlow, delay: 0.6 * k }}
            >
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
              <span className="text-muted-foreground/70">
                Jakarta, Indonesia
              </span>
            </motion.div>
          </div>

          {/* Visual */}
          <ProductFrame />
        </div>

        <StatsRow />
      </div>
    </section>
  );
}

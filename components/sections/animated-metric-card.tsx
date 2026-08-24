'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type RingColorStop = {
  color: string;
  word: string;
  label: string;
};

type AnimatedMetricCardProps = {
  icon: LucideIcon;
  label: string;
  description: string;
  targetValue: number;
  suffix?: string;
  prefix?: string;
  unit?: string;
  fillPercent: number;
  iconColor: string;
  ringColor: string | RingColorStop[];
  glowShadow: string;
  borderHoverColor: string;
  decimals?: number;
  showNumericValue?: boolean;
  duration?: number; // in seconds — controls ring fill, count-up, and color-stop pacing
};

const RING_SIZE = 88;
const RING_STROKE = 6;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function AnimatedMetricCard({
  icon: Icon,
  label,
  description,
  targetValue,
  suffix = '',
  prefix = '',
  unit,
  fillPercent,
  iconColor,
  ringColor,
  glowShadow,
  borderHoverColor,
  decimals = 0,
  showNumericValue = true,
  duration = 2, // slightly slower default than before (was hardcoded 1.6)
}: AnimatedMetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [colorStopIndex, setColorStopIndex] = useState(0);

  const isCycling = Array.isArray(ringColor);
  const stops = isCycling ? (ringColor as RingColorStop[]) : null;
  const currentStrokeColor = isCycling ? stops![colorStopIndex].color : (ringColor as string);
  const isFinalStop = isCycling ? colorStopIndex === stops!.length - 1 : false;

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, targetValue, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(v),
      onComplete: () => {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      },
    });

    let colorInterval: ReturnType<typeof setInterval> | undefined;
    if (isCycling && stops) {
      // Give the FIRST and LAST stops a little extra dwell time so the
      // start and the "arrival at gold" both get a beat to register,
      // rather than every stop ticking by at identical robotic speed.
      const stepDuration = (duration * 1000) / stops.length;
      let step = 0;
      colorInterval = setInterval(() => {
        step += 1;
        if (step < stops.length) {
          setColorStopIndex(step);
        } else if (colorInterval) {
          clearInterval(colorInterval);
        }
      }, stepDuration);
    }

    return () => {
      controls.stop();
      if (colorInterval) clearInterval(colorInterval);
    };
  }, [isInView, targetValue, duration, isCycling, stops]);

  const formattedValue = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString();

  const dashOffset = isInView ? RING_CIRCUMFERENCE * (1 - fillPercent / 100) : RING_CIRCUMFERENCE;

  return (
    <div
      ref={ref}
      className={`
        group relative
        bg-card
        border border-border/100 border-2
        rounded-3xl
        p-6 sm:p-8 md:p-10
        transition-all duration-300
        hover:bg-secondary/30
        hover:border-border
        hover:-translate-y-1
        ${glowShadow}
        ${borderHoverColor}
      `}>
      {/* RING + ICON */}
      <div className="relative mb-6" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90">
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            strokeWidth={RING_STROKE}
            className="stroke-border/40"
          />
          <motion.circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            stroke={currentStrokeColor}
            strokeDasharray={RING_CIRCUMFERENCE}
            initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            style={{ transition: isCycling ? 'stroke 0.5s ease' : undefined }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={pulse ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center bg-secondary/60 border border-border/40"
            style={pulse && isFinalStop ? { boxShadow: `0 0 24px ${currentStrokeColor}66` } : undefined}>
            <Icon className="w-5 h-5" style={{ color: isCycling ? currentStrokeColor : iconColor }} />
          </div>
        </motion.div>
      </div>

      {/* VALUE */}
      {showNumericValue ?
        <div className="flex items-baseline gap-2 flex-wrap">
          <motion.span
            className="text-[clamp(2rem,4.6vw,3.1rem)] font-semibold tracking-tight text-foreground"
            animate={pulse ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}>
            {prefix}
            {formattedValue}
            {suffix}
          </motion.span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      : isCycling && stops ?
        <div className="min-h-[3.1rem] flex items-end">
          <AnimatePresence mode="wait">
            <motion.span
              key={stops[colorStopIndex].word}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: isFinalStop && pulse ? [1, 1.08, 1] : 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-[clamp(2rem,4.6vw,3.1rem)] font-bold tracking-tight"
              style={{ color: currentStrokeColor }}>
              {stops[colorStopIndex].word}
            </motion.span>
          </AnimatePresence>
        </div>
      : null}

      {/* LABEL */}
      <h3 className="mt-4 text-lg font-medium text-foreground transition-colors duration-300">
        {isCycling && stops ? stops[colorStopIndex].label : label}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>

      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
    </div>
  );
}

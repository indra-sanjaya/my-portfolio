import { useReducedMotion } from 'framer-motion';

/**
 * Returns animation duration values that respect the user's
 * prefers-reduced-motion OS/browser setting.
 * When reduced motion is preferred, all durations are set to 0
 * so elements appear instantly without animation.
 */
export function useAnimationConfig() {
  const prefersReduced = useReducedMotion();
  return {
    duration: prefersReduced ? 0 : 0.7,
    durationFast: prefersReduced ? 0 : 0.45,
    durationSlow: prefersReduced ? 0 : 1.0,
    prefersReduced: prefersReduced ?? false,
  };
}

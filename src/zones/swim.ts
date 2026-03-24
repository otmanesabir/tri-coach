/**
 * Swimming Zone Calculations (CSS-based)
 *
 * Critical Swim Speed (CSS) is the swimming equivalent of lactate threshold.
 * Derived from 400m and 200m time trials.
 *
 * CSS = (400 - 200) / (T400 - T200) in m/s
 * CSS pace = 100 / CSS in seconds per 100m
 *
 * References:
 * - Wakayoshi, K. et al. (1992). Determination of critical power and critical
 *   stroke rate in front crawl swimming. Eur J Appl Physiol, 64, 419-424.
 * - Dekerle, J. et al. (2002). Validity and reliability of critical speed,
 *   critical stroke rate, and anaerobic capacity in swimming. Int J Sports Med.
 */

import type { SwimZone } from '../types.js';

/**
 * Calculate CSS (seconds per 100m) from 400m and 200m TT times
 */
export function calculateCSS(time400Seconds: number, time200Seconds: number): number {
  const speedMs = 200 / (time400Seconds - time200Seconds); // m/s
  return 100 / speedMs; // sec per 100m
}

/**
 * Parse swim time (m:ss or mm:ss) to seconds
 */
export function parseSwimTime(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0];
}

/**
 * Format seconds to m:ss per 100m
 */
export function formatSwimPace(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}:${String(sec).padStart(2, '0')}`;
}

interface SwimZoneDef {
  zone: number;
  name: string;
  offsetMin: number; // seconds to add to CSS (negative = faster)
  offsetMax: number;
  description: string;
  cssOffset: string;
}

const CSS_ZONES: SwimZoneDef[] = [
  { zone: 1, name: 'Recovery', offsetMin: 15, offsetMax: 20, description: 'Easy swimming, warm-up, cool-down.', cssOffset: 'CSS + 15-20s' },
  { zone: 2, name: 'Aerobic', offsetMin: 8, offsetMax: 12, description: 'Aerobic endurance, technique focus.', cssOffset: 'CSS + 8-12s' },
  { zone: 3, name: 'Tempo', offsetMin: 3, offsetMax: 6, description: 'Lactate tolerance, sustained effort.', cssOffset: 'CSS + 3-6s' },
  { zone: 4, name: 'Threshold', offsetMin: 0, offsetMax: 0, description: 'CSS pace — threshold development.', cssOffset: 'CSS pace' },
  { zone: 5, name: 'VO2max', offsetMin: -5, offsetMax: -3, description: 'VO2max intervals, 50-200m reps.', cssOffset: 'CSS - 3-5s' },
];

export function calculateSwimZones(cssSecPer100m: number): SwimZone[] {
  return CSS_ZONES.map((z) => ({
    zone: z.zone,
    name: z.name,
    pacePer100m: {
      min: cssSecPer100m + z.offsetMin,  // slower = higher pace number
      max: cssSecPer100m + z.offsetMax,  // faster for zone 5 = lower number
    },
    cssOffset: z.cssOffset,
    description: z.description,
  }));
}

export function formatSwimZones(zones: SwimZone[], css: number): string {
  const lines: string[] = [];
  lines.push(`\n  Swimming Zones (CSS: ${formatSwimPace(css)}/100m)\n`);
  lines.push('  Zone  Name        Pace/100m        CSS Offset    Description');
  lines.push('  ────  ──────────  ───────────────  ────────────  ──────────────────────────────');
  for (const z of zones) {
    // For swim, higher pace = slower. Zone 1 is slowest, Zone 5 is fastest.
    const slower = Math.max(z.pacePer100m.min, z.pacePer100m.max);
    const faster = Math.min(z.pacePer100m.min, z.pacePer100m.max);
    const paceStr = `${formatSwimPace(faster)} - ${formatSwimPace(slower)}`;
    lines.push(
      `  ${String(z.zone).padEnd(4)}  ${z.name.padEnd(10)}  ${paceStr.padEnd(15)}  ${z.cssOffset.padEnd(12)}  ${z.description}`
    );
  }
  return lines.join('\n');
}

/**
 * Heart Rate Zone Calculations
 *
 * Three methods supported:
 * 1. %LTHR (Friel 7-zone) — gold standard for endurance athletes
 * 2. %HRmax (5-zone) — simpler, less accurate
 * 3. Karvonen (HR Reserve) — accounts for resting HR
 *
 * References:
 * - Friel, J. (2009). The Triathlete's Training Bible, 3rd ed.
 * - Karvonen, M.J. et al. (1957). Ann Med Exp Biol Fenn, 35, 307-315.
 * - ACSM (2011). Med Sci Sports Exerc, 43(7), 1334-1359.
 */
import type { HeartRateZone } from '../types.js';
export declare function calculateFrielZones(lthr: number): HeartRateZone[];
export declare function calculateHRmaxZones(maxHr: number): HeartRateZone[];
export declare function calculateKarvonenZones(maxHr: number, restHr: number): HeartRateZone[];
/**
 * Estimate max HR using Tanaka formula (more accurate than 220-age):
 * HRmax = 208 - (0.7 × age)
 *
 * Tanaka H, Monahan KD, Seals DR (2001). J Am Coll Cardiol, 37(1), 153-156.
 */
export declare function estimateMaxHR(age: number): number;
export declare function formatHRZones(zones: HeartRateZone[], method: string): string;

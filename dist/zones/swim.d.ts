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
export declare function calculateCSS(time400Seconds: number, time200Seconds: number): number;
/**
 * Parse swim time (m:ss or mm:ss) to seconds
 */
export declare function parseSwimTime(time: string): number;
/**
 * Format seconds to m:ss per 100m
 */
export declare function formatSwimPace(seconds: number): string;
export declare function calculateSwimZones(cssSecPer100m: number): SwimZone[];
export declare function formatSwimZones(zones: SwimZone[], css: number): string;

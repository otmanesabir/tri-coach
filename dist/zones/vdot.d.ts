/**
 * VDOT / Jack Daniels Running Pace Zone Calculator
 *
 * Implements the Daniels-Gilbert formula for computing VDOT from
 * race performance and deriving training paces.
 *
 * References:
 * - Daniels, J. (2014). Daniels' Running Formula, 3rd ed. Human Kinetics.
 * - Daniels, J. & Gilbert, J. (1979). Oxygen Power. Published tables.
 *
 * The formula:
 *   VO2 = -4.60 + 0.182258·v + 0.000104·v²
 *   %VO2max = 0.8 + 0.1894393·e^(-0.012778·t) + 0.2989558·e^(-0.1932605·t)
 *   VDOT = VO2 / %VO2max
 *
 * Where v = velocity (m/min), t = duration (minutes)
 */
/**
 * Calculate VDOT from a race distance (meters) and time (seconds)
 */
export declare function calculateVDOT(distanceMeters: number, timeSeconds: number): number;
/**
 * Parse a time string (mm:ss or hh:mm:ss) to seconds
 */
export declare function parseTimeToSeconds(time: string): number;
/**
 * Format seconds to mm:ss
 */
export declare function formatPace(totalSeconds: number): string;
/**
 * Race distance presets
 */
export declare const RACE_DISTANCES: Record<string, number>;
/**
 * Calculate VDOT from a common race result
 */
export declare function vdotFromRace(distance: string, time: string): number;
/**
 * The five Daniels training zones with their %VO2max targets:
 * E (Easy): 59-74% — daily running, long runs
 * M (Marathon): 75-84% — marathon race pace
 * T (Threshold): 83-88% — tempo runs, cruise intervals
 * I (Interval): 95-100% — VO2max development
 * R (Repetition): >105% — speed/neuromuscular
 */
export interface DanielsPaces {
    vdot: number;
    easy: {
        min: number;
        max: number;
    };
    marathon: {
        min: number;
        max: number;
    };
    threshold: {
        min: number;
        max: number;
    };
    interval: {
        min: number;
        max: number;
    };
    repetition: {
        min: number;
        max: number;
    };
}
export declare function calculateDanielsPaces(vdot: number): DanielsPaces;
/**
 * Predict race times from VDOT
 */
export declare function predictRaceTimes(vdot: number): Record<string, string>;
export declare function formatDanielsPaces(paces: DanielsPaces): string;

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
// ──────────────────────────────────────────────
// Core VDOT calculations
// ──────────────────────────────────────────────
/**
 * Estimate oxygen cost (ml/kg/min) at a given velocity
 */
function oxygenCost(velocityMPerMin) {
    return -4.60 + 0.182258 * velocityMPerMin + 0.000104 * velocityMPerMin * velocityMPerMin;
}
/**
 * Estimate the fraction of VO2max sustainable for a given duration
 */
function fractionVO2max(durationMinutes) {
    return (0.8 +
        0.1894393 * Math.exp(-0.012778 * durationMinutes) +
        0.2989558 * Math.exp(-0.1932605 * durationMinutes));
}
/**
 * Calculate VDOT from a race distance (meters) and time (seconds)
 */
export function calculateVDOT(distanceMeters, timeSeconds) {
    const durationMinutes = timeSeconds / 60;
    const velocityMPerMin = distanceMeters / durationMinutes;
    const vo2 = oxygenCost(velocityMPerMin);
    const fraction = fractionVO2max(durationMinutes);
    return vo2 / fraction;
}
/**
 * Calculate pace (seconds per km) for a given VDOT and fraction of VO2max
 */
function paceForVdotAtFraction(vdot, fractionOfVO2max) {
    // target VO2 = vdot * fraction
    const targetVO2 = vdot * fractionOfVO2max;
    // Solve for velocity: -4.60 + 0.182258·v + 0.000104·v² = targetVO2
    // 0.000104v² + 0.182258v + (-4.60 - targetVO2) = 0
    const a = 0.000104;
    const b = 0.182258;
    const c = -4.60 - targetVO2;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0)
        return 0;
    const v = (-b + Math.sqrt(discriminant)) / (2 * a); // m/min
    if (v <= 0)
        return 0;
    return 1000 / v * 60; // sec/km
}
/**
 * Parse a time string (mm:ss or hh:mm:ss) to seconds
 */
export function parseTimeToSeconds(time) {
    const parts = time.split(':').map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return parts[0] * 60 + parts[1];
}
/**
 * Format seconds to mm:ss
 */
export function formatPace(totalSeconds) {
    const min = Math.floor(totalSeconds / 60);
    const sec = Math.round(totalSeconds % 60);
    return `${min}:${String(sec).padStart(2, '0')}`;
}
/**
 * Race distance presets
 */
export const RACE_DISTANCES = {
    '1500': 1500,
    'mile': 1609.34,
    '3k': 3000,
    '5k': 5000,
    '10k': 10000,
    '15k': 15000,
    'half': 21097.5,
    'marathon': 42195,
};
/**
 * Calculate VDOT from a common race result
 */
export function vdotFromRace(distance, time) {
    const meters = RACE_DISTANCES[distance];
    if (!meters)
        throw new Error(`Unknown race distance: ${distance}. Use: ${Object.keys(RACE_DISTANCES).join(', ')}`);
    const seconds = parseTimeToSeconds(time);
    return calculateVDOT(meters, seconds);
}
export function calculateDanielsPaces(vdot) {
    return {
        vdot: Math.round(vdot * 10) / 10,
        easy: {
            min: paceForVdotAtFraction(vdot, 0.74),
            max: paceForVdotAtFraction(vdot, 0.59),
        },
        marathon: {
            min: paceForVdotAtFraction(vdot, 0.84),
            max: paceForVdotAtFraction(vdot, 0.75),
        },
        threshold: {
            min: paceForVdotAtFraction(vdot, 0.88),
            max: paceForVdotAtFraction(vdot, 0.83),
        },
        interval: {
            min: paceForVdotAtFraction(vdot, 1.00),
            max: paceForVdotAtFraction(vdot, 0.95),
        },
        repetition: {
            min: paceForVdotAtFraction(vdot, 1.10),
            max: paceForVdotAtFraction(vdot, 1.05),
        },
    };
}
/**
 * Predict race times from VDOT
 */
export function predictRaceTimes(vdot) {
    const results = {};
    for (const [name, dist] of Object.entries(RACE_DISTANCES)) {
        // Binary search for time that gives this VDOT at this distance
        let lo = 60; // 1 min
        let hi = 300 * 60; // 5 hours
        for (let i = 0; i < 100; i++) {
            const mid = (lo + hi) / 2;
            const v = calculateVDOT(dist, mid);
            if (v < vdot) {
                hi = mid;
            }
            else {
                lo = mid;
            }
        }
        const time = Math.round((lo + hi) / 2);
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = Math.round(time % 60);
        if (h > 0) {
            results[name] = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        else {
            results[name] = `${m}:${String(s).padStart(2, '0')}`;
        }
    }
    return results;
}
export function formatDanielsPaces(paces) {
    const lines = [];
    lines.push(`\n  VDOT: ${paces.vdot}\n`);
    lines.push('  Zone         Name          Pace/km Range       Purpose');
    lines.push('  ───────────  ────────────  ──────────────────  ──────────────────────────────');
    const zones = [
        { zone: 'E', name: 'Easy', range: paces.easy, purpose: 'Daily running, long runs (59-74% VO2max)' },
        { zone: 'M', name: 'Marathon', range: paces.marathon, purpose: 'Marathon race pace (75-84% VO2max)' },
        { zone: 'T', name: 'Threshold', range: paces.threshold, purpose: 'Tempo runs, cruise intervals (83-88% VO2max)' },
        { zone: 'I', name: 'Interval', range: paces.interval, purpose: 'VO2max intervals, 3-5min reps (95-100% VO2max)' },
        { zone: 'R', name: 'Repetition', range: paces.repetition, purpose: 'Speed & neuromuscular (>105% VO2max)' },
    ];
    for (const z of zones) {
        const paceStr = `${formatPace(z.range.min)} - ${formatPace(z.range.max)}/km`;
        lines.push(`  ${z.zone.padEnd(11)}  ${z.name.padEnd(12)}  ${paceStr.padEnd(18)}  ${z.purpose}`);
    }
    return lines.join('\n');
}
//# sourceMappingURL=vdot.js.map
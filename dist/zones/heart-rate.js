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
const FRIEL_ZONES = [
    { zone: 1, name: 'Recovery', minPct: 0, maxPct: 0.81, description: 'Active recovery, warm-up/cool-down. Very easy, could talk indefinitely.' },
    { zone: 2, name: 'Aerobic', minPct: 0.81, maxPct: 0.89, description: 'Aerobic base building, fat oxidation. Easy, full conversations.' },
    { zone: 3, name: 'Tempo', minPct: 0.90, maxPct: 0.93, description: 'Muscular endurance, aerobic capacity. Moderate, sentences only.' },
    { zone: 4, name: 'Sub-Threshold', minPct: 0.94, maxPct: 0.99, description: 'Lactate tolerance, threshold extension. Hard, few words at a time.' },
    { zone: 5, name: 'Threshold', minPct: 1.00, maxPct: 1.02, description: 'Lactate threshold improvement. Very hard, race effort for ~60min.' },
    { zone: 6, name: 'VO2max', minPct: 1.03, maxPct: 1.06, description: 'VO2max development. Extremely hard, 3-8min sustainable.' },
    { zone: 7, name: 'Anaerobic', minPct: 1.06, maxPct: 1.20, description: 'Neuromuscular power, speed. Max effort, <3min.' },
];
export function calculateFrielZones(lthr) {
    return FRIEL_ZONES.map((z) => ({
        zone: z.zone,
        name: z.name,
        hrRange: {
            min: z.zone === 1 ? 0 : Math.round(lthr * z.minPct),
            max: z.zone === 7 ? 999 : Math.round(lthr * z.maxPct),
        },
        percentRange: {
            min: Math.round(z.minPct * 100),
            max: Math.round(z.maxPct * 100),
        },
        description: z.description,
    }));
}
const HRMAX_ZONES = [
    { zone: 1, name: 'Recovery', minPct: 0.50, maxPct: 0.60, description: 'Very light activity, warm-up, cool-down.' },
    { zone: 2, name: 'Aerobic', minPct: 0.60, maxPct: 0.70, description: 'Light aerobic, fat burning, base building.' },
    { zone: 3, name: 'Tempo', minPct: 0.70, maxPct: 0.80, description: 'Moderate aerobic, improves efficiency.' },
    { zone: 4, name: 'Threshold', minPct: 0.80, maxPct: 0.90, description: 'Hard effort, improves lactate threshold.' },
    { zone: 5, name: 'VO2max', minPct: 0.90, maxPct: 1.00, description: 'Maximum effort, improves max oxygen uptake.' },
];
export function calculateHRmaxZones(maxHr) {
    return HRMAX_ZONES.map((z) => ({
        zone: z.zone,
        name: z.name,
        hrRange: {
            min: Math.round(maxHr * z.minPct),
            max: Math.round(maxHr * z.maxPct),
        },
        percentRange: {
            min: Math.round(z.minPct * 100),
            max: Math.round(z.maxPct * 100),
        },
        description: z.description,
    }));
}
// ──────────────────────────────────────────────
// Karvonen (Heart Rate Reserve) Method
// ──────────────────────────────────────────────
/**
 * THR = ((HRmax - HRrest) × intensity%) + HRrest
 *
 * More accurate than %HRmax alone because it accounts for
 * individual differences in resting heart rate.
 *
 * Karvonen M.J. et al. (1957). The effects of training on heart rate.
 * Ann Med Exp Biol Fenn, 35, 307-315.
 */
const KARVONEN_ZONES = [
    { zone: 1, name: 'Recovery', minPct: 0.50, maxPct: 0.60, description: 'Very easy effort using HR reserve.' },
    { zone: 2, name: 'Aerobic', minPct: 0.60, maxPct: 0.70, description: 'Easy aerobic training.' },
    { zone: 3, name: 'Tempo', minPct: 0.70, maxPct: 0.80, description: 'Moderate effort, tempo range.' },
    { zone: 4, name: 'Threshold', minPct: 0.80, maxPct: 0.90, description: 'Hard effort at lactate threshold.' },
    { zone: 5, name: 'VO2max', minPct: 0.90, maxPct: 1.00, description: 'Maximum effort.' },
];
export function calculateKarvonenZones(maxHr, restHr) {
    const reserve = maxHr - restHr;
    return KARVONEN_ZONES.map((z) => ({
        zone: z.zone,
        name: z.name,
        hrRange: {
            min: Math.round(reserve * z.minPct + restHr),
            max: Math.round(reserve * z.maxPct + restHr),
        },
        percentRange: {
            min: Math.round(z.minPct * 100),
            max: Math.round(z.maxPct * 100),
        },
        description: z.description,
    }));
}
/**
 * Estimate max HR using Tanaka formula (more accurate than 220-age):
 * HRmax = 208 - (0.7 × age)
 *
 * Tanaka H, Monahan KD, Seals DR (2001). J Am Coll Cardiol, 37(1), 153-156.
 */
export function estimateMaxHR(age) {
    return Math.round(208 - 0.7 * age);
}
export function formatHRZones(zones, method) {
    const lines = [];
    lines.push(`\n  Heart Rate Zones (${method})\n`);
    lines.push('  Zone  Name            HR Range       %Range    Description');
    lines.push('  ────  ──────────────  ─────────────  ────────  ─────────────────────────────');
    for (const z of zones) {
        const minStr = z.hrRange.min === 0 ? '<' : `${z.hrRange.min}`;
        const maxStr = z.hrRange.max === 999 ? '+' : `${z.hrRange.max}`;
        const hrStr = z.hrRange.min === 0 ? `< ${maxStr} bpm` : z.hrRange.max === 999 ? `> ${minStr} bpm` : `${minStr}-${maxStr} bpm`;
        const pctStr = `${z.percentRange.min}-${z.percentRange.max}%`;
        lines.push(`  ${String(z.zone).padEnd(4)}  ${z.name.padEnd(14)}  ${hrStr.padEnd(13)}  ${pctStr.padEnd(8)}  ${z.description}`);
    }
    return lines.join('\n');
}
//# sourceMappingURL=heart-rate.js.map
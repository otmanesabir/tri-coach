/**
 * Rate of Perceived Exertion (RPE) Scales
 *
 * Two scales commonly used in endurance training:
 *
 * 1. Borg 6-20 Scale (original) — designed so RPE × 10 ≈ heart rate
 *    Reference: Borg, G. (1982). Psychophysical bases of perceived exertion.
 *    Med Sci Sports Exerc, 14(5), 377-381.
 *
 * 2. Session RPE (CR-10 modified) — 0-10 scale, used for load monitoring
 *    Reference: Foster, C. et al. (2001). A new approach to monitoring
 *    exercise training. J Strength Cond Res, 15(1), 109-115.
 *
 * Session RPE × duration (minutes) = Training Load (TRIMP-like)
 * This is the Foster method, widely validated for endurance sports.
 */
// ──────────────────────────────────────────────
// Session RPE (0-10 scale) — Foster et al.
// ──────────────────────────────────────────────
export const SESSION_RPE = [
    { value: 0, label: 'Rest', description: 'No exertion at all.' },
    { value: 1, label: 'Very Easy', description: 'Barely noticeable effort. Recovery walk.', hrZoneApprox: 'Zone 1' },
    { value: 2, label: 'Easy', description: 'Light effort. Could maintain all day.', hrZoneApprox: 'Zone 1-2' },
    { value: 3, label: 'Moderate', description: 'Comfortable but working. Full sentences.', hrZoneApprox: 'Zone 2' },
    { value: 4, label: 'Somewhat Hard', description: 'Starting to breathe harder. Sentences possible.', hrZoneApprox: 'Zone 2-3' },
    { value: 5, label: 'Hard', description: 'Challenging. Short sentences only.', hrZoneApprox: 'Zone 3' },
    { value: 6, label: 'Harder', description: 'Quite difficult. Few words at a time.', hrZoneApprox: 'Zone 3-4' },
    { value: 7, label: 'Very Hard', description: 'Can barely talk. Sustainable for ~30-60min.', hrZoneApprox: 'Zone 4-5' },
    { value: 8, label: 'Very Very Hard', description: 'Extremely challenging. ~10-20min max.', hrZoneApprox: 'Zone 5-6' },
    { value: 9, label: 'Near Max', description: 'Almost maximal. Only 3-5min possible.', hrZoneApprox: 'Zone 6' },
    { value: 10, label: 'Maximal', description: 'Absolute maximum. Cannot continue.', hrZoneApprox: 'Zone 7' },
];
// ──────────────────────────────────────────────
// Borg 6-20 Scale
// ──────────────────────────────────────────────
export const BORG_SCALE = [
    { value: 6, label: 'No exertion at all', description: 'Complete rest.', hrZoneApprox: '~60 bpm' },
    { value: 7, label: 'Extremely light', description: 'Very very light.', hrZoneApprox: '~70 bpm' },
    { value: 9, label: 'Very light', description: 'Easy walking pace.', hrZoneApprox: '~90 bpm' },
    { value: 11, label: 'Light', description: 'Comfortable, could sustain hours.', hrZoneApprox: '~110 bpm' },
    { value: 13, label: 'Somewhat hard', description: 'Still comfortable but breathing harder.', hrZoneApprox: '~130 bpm' },
    { value: 15, label: 'Hard', description: 'Sustainable but challenging.', hrZoneApprox: '~150 bpm' },
    { value: 17, label: 'Very hard', description: 'Very challenging, high effort.', hrZoneApprox: '~170 bpm' },
    { value: 19, label: 'Extremely hard', description: 'Near-maximal effort.', hrZoneApprox: '~190 bpm' },
    { value: 20, label: 'Maximal exertion', description: 'Absolute maximum.', hrZoneApprox: '~200 bpm' },
];
/**
 * Calculate session training load using Foster's method
 * sRPE × duration (minutes) = training load
 */
export function sessionTrainingLoad(rpe, durationMinutes) {
    return rpe * durationMinutes;
}
export function formatRPEScale() {
    const lines = [];
    lines.push('\n  Session RPE Scale (Foster et al., 2001)\n');
    lines.push('  RPE  Label            HR Zone    Description');
    lines.push('  ───  ───────────────  ─────────  ──────────────────────────────────────');
    for (const level of SESSION_RPE) {
        lines.push(`  ${String(level.value).padEnd(3)}  ${level.label.padEnd(15)}  ${(level.hrZoneApprox || '-').padEnd(9)}  ${level.description}`);
    }
    lines.push('\n  Training Load = RPE × Duration (minutes)');
    lines.push('  Example: RPE 7 × 60min = 420 load units');
    return lines.join('\n');
}
//# sourceMappingURL=rpe.js.map
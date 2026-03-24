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
export interface RPELevel {
    value: number;
    label: string;
    description: string;
    hrZoneApprox?: string;
}
export declare const SESSION_RPE: RPELevel[];
export declare const BORG_SCALE: RPELevel[];
/**
 * Calculate session training load using Foster's method
 * sRPE × duration (minutes) = training load
 */
export declare function sessionTrainingLoad(rpe: number, durationMinutes: number): number;
export declare function formatRPEScale(): string;

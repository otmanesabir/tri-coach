/**
 * Cycling Power Zone Calculations (FTP-based)
 *
 * Uses the Coggan/Friel 7-zone model based on Functional Threshold Power.
 *
 * References:
 * - Allen, H. & Coggan, A. (2010). Training and Racing with a Power Meter, 2nd ed.
 * - Friel, J. (2009). The Triathlete's Training Bible, 3rd ed.
 */
const FTP_ZONES = [
    { zone: 1, name: 'Recovery', minPct: 0, maxPct: 0.55, description: 'Active recovery. Very easy spinning.' },
    { zone: 2, name: 'Endurance', minPct: 0.56, maxPct: 0.75, description: 'Aerobic base building. All-day pace.' },
    { zone: 3, name: 'Tempo', minPct: 0.76, maxPct: 0.90, description: 'Muscular endurance. "Comfortably hard."' },
    { zone: 4, name: 'Sub-Threshold', minPct: 0.91, maxPct: 0.99, description: 'Lactate tolerance. Sustainable for 20-60min.' },
    { zone: 5, name: 'Threshold', minPct: 1.00, maxPct: 1.05, description: 'FTP improvement. ~60min race effort.' },
    { zone: 6, name: 'VO2max', minPct: 1.06, maxPct: 1.20, description: 'VO2max intervals. 3-8min efforts.' },
    { zone: 7, name: 'Anaerobic', minPct: 1.21, maxPct: 1.50, description: 'Neuromuscular power. <3min max efforts.' },
];
/**
 * Sweet Spot is the zone between upper tempo and lower threshold (88-93% FTP).
 * Provides significant training stimulus with manageable fatigue.
 *
 * Reference: Coggan, A. — popularized the concept based on dose-response
 * curves for power-based training adaptations.
 */
export const SWEET_SPOT = { minPct: 0.88, maxPct: 0.93 };
export function calculatePowerZones(ftp) {
    return FTP_ZONES.map((z) => ({
        zone: z.zone,
        name: z.name,
        wattsRange: {
            min: z.zone === 1 ? 0 : Math.round(ftp * z.minPct),
            max: z.zone === 7 ? Math.round(ftp * z.maxPct) : Math.round(ftp * z.maxPct),
        },
        percentFtp: {
            min: Math.round(z.minPct * 100),
            max: Math.round(z.maxPct * 100),
        },
        description: z.description,
    }));
}
export function sweetSpotRange(ftp) {
    return {
        min: Math.round(ftp * SWEET_SPOT.minPct),
        max: Math.round(ftp * SWEET_SPOT.maxPct),
    };
}
export function formatPowerZones(zones) {
    const lines = [];
    lines.push('\n  Cycling Power Zones (FTP-based)\n');
    lines.push('  Zone  Name            Watts          %FTP      Description');
    lines.push('  ────  ──────────────  ─────────────  ────────  ──────────────────────────────');
    for (const z of zones) {
        const minStr = z.wattsRange.min === 0 ? '<' : `${z.wattsRange.min}`;
        const wStr = z.wattsRange.min === 0 ? `< ${z.wattsRange.max}W` : `${minStr}-${z.wattsRange.max}W`;
        const pctStr = `${z.percentFtp.min}-${z.percentFtp.max}%`;
        lines.push(`  ${String(z.zone).padEnd(4)}  ${z.name.padEnd(14)}  ${wStr.padEnd(13)}  ${pctStr.padEnd(8)}  ${z.description}`);
    }
    return lines.join('\n');
}
//# sourceMappingURL=power.js.map
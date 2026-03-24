/**
 * Cycling Power Zone Calculations (FTP-based)
 *
 * Uses the Coggan/Friel 7-zone model based on Functional Threshold Power.
 *
 * References:
 * - Allen, H. & Coggan, A. (2010). Training and Racing with a Power Meter, 2nd ed.
 * - Friel, J. (2009). The Triathlete's Training Bible, 3rd ed.
 */
import type { PowerZone } from '../types.js';
/**
 * Sweet Spot is the zone between upper tempo and lower threshold (88-93% FTP).
 * Provides significant training stimulus with manageable fatigue.
 *
 * Reference: Coggan, A. — popularized the concept based on dose-response
 * curves for power-based training adaptations.
 */
export declare const SWEET_SPOT: {
    minPct: number;
    maxPct: number;
};
export declare function calculatePowerZones(ftp: number): PowerZone[];
export declare function sweetSpotRange(ftp: number): {
    min: number;
    max: number;
};
export declare function formatPowerZones(zones: PowerZone[]): string;

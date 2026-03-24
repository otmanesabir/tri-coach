export type Sport = 'run' | 'bike' | 'swim' | 'strength' | 'brick';
export type TrainingPhase = 'base' | 'build' | 'peak' | 'taper' | 'recovery';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export interface ZoneRange {
    min: number;
    max: number;
}
export interface HeartRateZone {
    zone: number;
    name: string;
    hrRange: ZoneRange;
    percentRange: ZoneRange;
    description: string;
}
export interface PaceZone {
    zone: string;
    name: string;
    pacePerKm: ZoneRange;
    description: string;
}
export interface PowerZone {
    zone: number;
    name: string;
    wattsRange: ZoneRange;
    percentFtp: ZoneRange;
    description: string;
}
export interface SwimZone {
    zone: number;
    name: string;
    pacePer100m: ZoneRange;
    cssOffset: string;
    description: string;
}
export interface WorkoutPhase {
    name: string;
    duration: string;
    description: string;
    targetZone?: string;
    targetHR?: string;
    targetPace?: string;
    targetPower?: string;
    targetRPE?: string;
    coachingCues: string[];
}
export interface WorkoutTemplate {
    id: string;
    name: string;
    sport: Sport;
    category: string;
    summary: string;
    scientificRationale: string;
    citations: string[];
    trainingPhases: TrainingPhase[];
    phases: WorkoutPhase[];
    adaptations: Record<FitnessLevel, string>;
    durationFormula: string;
    totalDuration: string;
    frequency: string;
    recoveryNeeded: string;
}
export interface AthleteProfile {
    lthr?: number;
    maxHr?: number;
    restHr?: number;
    ftp?: number;
    race5k?: string;
    race10k?: string;
    raceHalfMarathon?: string;
    raceMarathon?: string;
    css400?: string;
    css200?: string;
    cssPerHundred?: number;
}
export interface GeneratedWorkout {
    template: WorkoutTemplate;
    phases: GeneratedPhase[];
    totalDurationMinutes: number;
    notes: string[];
}
export interface GeneratedPhase {
    name: string;
    durationMinutes: number;
    description: string;
    targetHR?: ZoneRange;
    targetPacePerKm?: ZoneRange;
    targetPower?: ZoneRange;
    targetRPE?: ZoneRange;
    coachingCues: string[];
}

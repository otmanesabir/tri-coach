// ──────────────────────────────────────────────
// Core types for tri-coach CLI
// ──────────────────────────────────────────────

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
  pacePerKm: ZoneRange; // seconds per km
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
  pacePer100m: ZoneRange; // seconds per 100m
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
  race5k?: string; // mm:ss
  race10k?: string;
  raceHalfMarathon?: string;
  raceMarathon?: string;
  css400?: string; // mm:ss (400m TT time)
  css200?: string; // mm:ss (200m TT time)
  cssPerHundred?: number; // seconds per 100m
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

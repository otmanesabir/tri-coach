import type { WorkoutTemplate } from '../../types.js';

export const runIntervals400: WorkoutTemplate = {
  id: 'run.intervals.400',
  name: '400m Intervals',
  sport: 'run',
  category: 'speed',
  summary: 'Short, fast repeats developing speed, neuromuscular coordination, and running economy.',
  scientificRationale:
    'Short intervals at R-pace (>105% VO2max) improve neuromuscular recruitment patterns and running economy. The high speed reinforces efficient mechanics and develops the ability to change pace. Recovery is complete to ensure quality in each repetition. These are NOT anaerobic training — they\'re neurological training at high speed with full recovery (Daniels, 2014).',
  citations: [
    'Daniels, J. (2014). Daniels\' Running Formula, 3rd ed. Ch. 9: Repetition Training.',
    'Paavolainen, L. et al. (1999). Explosive-strength training improves 5-km running time. J Appl Physiol, 86(5), 1527-1533.',
    'Barnes, K.R. & Kilding, A.E. (2015). Running economy: measurement, norms, and determining factors. Sports Med Open, 1, 8.',
  ],
  trainingPhases: ['build', 'peak'],
  phases: [
    {
      name: 'Warm-up',
      duration: '15 min',
      description: '10min easy jog + dynamic drills (high knees, butt kicks, A-skips) + 4 × 100m strides.',
      targetRPE: '2-3, strides 5-6',
      coachingCues: [
        'Thorough warm-up is essential for fast work',
        'Dynamic drills activate neuromuscular pathways',
        'Strides should be smooth, not strained',
      ],
    },
    {
      name: 'Main Set',
      duration: '20-25 min',
      description: '8-12 × 400m at R-pace. Recovery: 400m easy jog (equal distance recovery).',
      targetZone: 'Zone 5c (Friel) / R-pace (Daniels)',
      targetPace: 'R-pace (>105% VO2max)',
      targetRPE: '8-9',
      coachingCues: [
        'Each rep should be fast but CONTROLLED — no sprinting',
        'Focus on smooth, quick turnover',
        'Recovery is full — jog back to start, be ready for the next one',
        'All reps should be within 2-3 seconds of each other',
        'If reps slow by >5 seconds, stop the session — quality is done',
      ],
    },
    {
      name: 'Cool-down',
      duration: '10 min',
      description: 'Easy jog tapering to walk.',
      targetRPE: '2',
      coachingCues: ['Take extra time to cool down after speed work'],
    },
  ],
  adaptations: {
    beginner: '6-8 × 400m with 90s walk/jog recovery. Focus on consistent pacing.',
    intermediate: '8-10 × 400m with 400m jog recovery. Target R-pace.',
    advanced: '10-12 × 400m with 200m jog recovery (shorter rest). Or ladder: 400-600-800-600-400.',
  },
  durationFormula: 'Total R-pace volume per session: max 5% of weekly mileage or 8km, whichever is less.',
  totalDuration: '45-55 min',
  frequency: '1× per week in build/peak phase. Not in base phase.',
  recoveryNeeded: '48 hours before next quality session.',
};

export const runIntervals800: WorkoutTemplate = {
  id: 'run.intervals.800',
  name: '800m Intervals',
  sport: 'run',
  category: 'vo2max',
  summary: 'Medium-length VO2max intervals. The classic "bread and butter" interval session for distance runners.',
  scientificRationale:
    'Intervals of 2-4 minutes at I-pace (95-100% VO2max) are the optimal stimulus for improving maximal oxygen uptake. At this intensity, the heart reaches maximal stroke volume, driving central cardiovascular adaptations. 800m intervals (~3-4min for recreational runners) accumulate significant time at VO2max per session (Billat, 2001).',
  citations: [
    'Billat, V.L. (2001). Interval training for performance: a scientific and empirical practice. Sports Med, 31(2), 75-90.',
    'Daniels, J. (2014). Daniels\' Running Formula, 3rd ed. Ch. 8: Interval Training.',
    'Midgley, A.W. et al. (2006). Is there an optimal training intensity for enhancing VO2max? Sports Med, 36(2), 117-132.',
  ],
  trainingPhases: ['build', 'peak'],
  phases: [
    {
      name: 'Warm-up',
      duration: '15 min',
      description: '10min easy jog + drills + 4 × 100m strides.',
      targetRPE: '2-3',
      coachingCues: ['Same warm-up as 400m intervals', 'Ensure you feel loose and ready'],
    },
    {
      name: 'Main Set',
      duration: '20-30 min',
      description: '5-8 × 800m at I-pace. Recovery: 50-90% of interval duration as easy jog (e.g., 400m jog or 2min jog).',
      targetZone: 'Zone 5b (Friel) / I-pace (Daniels)',
      targetHR: '103-106% LTHR (by end of interval)',
      targetPace: 'I-pace (95-100% VO2max)',
      targetRPE: '8-9',
      coachingCues: [
        'HR will climb through each interval — should reach Zone 5b by the end',
        'First rep will feel "too easy" — trust the pace',
        'Maintain even splits within each 800m',
        'Recovery jog should bring HR to ~70% max before next rep',
        'This should feel hard but not desperate',
      ],
    },
    {
      name: 'Cool-down',
      duration: '10 min',
      description: 'Easy jog to walk.',
      targetRPE: '2',
      coachingCues: ['Extended cool-down helps with lactate clearance'],
    },
  ],
  adaptations: {
    beginner: '4-5 × 800m with 3min jog recovery. Start conservative — you can always add reps.',
    intermediate: '5-6 × 800m with 2-2.5min jog recovery.',
    advanced: '6-8 × 800m with 2min jog recovery. Or mixed: 2×800, 2×1000, 2×800.',
  },
  durationFormula: 'Total I-pace volume: max 8% of weekly mileage or 10km, whichever is less (Daniels).',
  totalDuration: '45-60 min',
  frequency: '1× per week. Not more — VO2max work is very demanding.',
  recoveryNeeded: '48-72 hours.',
};

export const runIntervals1k: WorkoutTemplate = {
  id: 'run.intervals.1k',
  name: '1000m Intervals',
  sport: 'run',
  category: 'vo2max',
  summary: 'Longer VO2max intervals providing more time at peak oxygen uptake per repetition.',
  scientificRationale:
    'Slightly longer than 800m, 1000m intervals at I-pace accumulate even more time at VO2max per rep. The 3-5 minute duration is considered the "sweet spot" for VO2max development, as it takes ~90-120 seconds to reach VO2max and then sustains it. Studies show 3-5min intervals are more effective than shorter intervals for VO2max gains (Bacon et al., 2013).',
  citations: [
    'Bacon, A.P. et al. (2013). VO2max trainability and high intensity interval training in humans. PLoS One, 8(9), e73182.',
    'Daniels, J. (2014). Daniels\' Running Formula, 3rd ed.',
    'Buchheit, M. & Laursen, P.B. (2013). High-intensity interval training, solutions to the programming puzzle. Sports Med, 43, 313-338.',
  ],
  trainingPhases: ['build', 'peak'],
  phases: [
    {
      name: 'Warm-up',
      duration: '15 min',
      description: 'Easy jog + drills + strides.',
      targetRPE: '2-3',
      coachingCues: ['Standard interval warm-up'],
    },
    {
      name: 'Main Set',
      duration: '20-35 min',
      description: '4-6 × 1000m at I-pace. Recovery: 3-4min easy jog.',
      targetZone: 'Zone 5b (Friel) / I-pace',
      targetPace: 'I-pace',
      targetRPE: '8-9',
      coachingCues: [
        'Even pace for each 1km — don\'t start too fast',
        'Should feel sustainably hard — you could do one more rep if asked',
        'If you can\'t finish the last rep within 5 seconds of the first, you went out too fast',
        'Recovery: jog until you feel ready, minimum 3 minutes',
      ],
    },
    {
      name: 'Cool-down',
      duration: '10 min',
      description: 'Easy jog to walk.',
      targetRPE: '2',
      coachingCues: ['Refuel soon after — high-intensity work depletes glycogen rapidly'],
    },
  ],
  adaptations: {
    beginner: '3-4 × 1000m with 4min recovery.',
    intermediate: '4-5 × 1000m with 3min recovery.',
    advanced: '5-6 × 1000m with 2.5-3min recovery. Or 4 × 1200m.',
  },
  durationFormula: 'Same as 800m: max 8% weekly mileage at I-pace per session.',
  totalDuration: '45-65 min',
  frequency: '1× per week (alternate with 800s).',
  recoveryNeeded: '48-72 hours.',
};

export const runIntervalsMile: WorkoutTemplate = {
  id: 'run.intervals.mile',
  name: 'Mile Repeats',
  sport: 'run',
  category: 'vo2max',
  summary: 'Long VO2max intervals. Maximum time at peak oxygen uptake per repetition. The hardest standard interval session.',
  scientificRationale:
    'Mile repeats (1600m) at I-pace represent the upper limit of interval duration for VO2max development. Each rep spends 4-6+ minutes at near-max oxygen uptake, driving the strongest central cardiovascular adaptations. However, the high demands mean fewer reps and more recovery. This is a session for experienced runners only (Laursen & Jenkins, 2002).',
  citations: [
    'Laursen, P.B. & Jenkins, D.G. (2002). The scientific basis for high-intensity interval training. Sports Med, 32(1), 53-73.',
    'Daniels, J. (2014). Daniels\' Running Formula, 3rd ed.',
  ],
  trainingPhases: ['build', 'peak'],
  phases: [
    {
      name: 'Warm-up',
      duration: '15 min',
      description: 'Extended warm-up: easy jog, drills, strides.',
      targetRPE: '2-3',
      coachingCues: ['Take extra warm-up time for this demanding session'],
    },
    {
      name: 'Main Set',
      duration: '25-40 min',
      description: '3-5 × 1 mile (1600m) at I-pace. Recovery: 4-5min easy jog.',
      targetZone: 'Zone 5b (Friel) / I-pace',
      targetPace: 'I-pace',
      targetRPE: '8-9',
      coachingCues: [
        'This is the hardest standard interval session — respect it',
        'Even splits within each mile are critical',
        'Full recovery between reps — don\'t rush',
        'Quality over quantity: 3 good reps > 5 bad ones',
      ],
    },
    {
      name: 'Cool-down',
      duration: '10-15 min',
      description: 'Extended easy jog to walk.',
      targetRPE: '2',
      coachingCues: ['Take extra time cooling down after this intensity'],
    },
  ],
  adaptations: {
    beginner: 'Not recommended. Build with 800m and 1k intervals first.',
    intermediate: '3 × 1 mile with 4-5min recovery.',
    advanced: '4-5 × 1 mile with 4min recovery. Or 3 × 1 mile + 2 × 800m.',
  },
  durationFormula: 'Total I-pace: same 8% rule. 3-5 miles of interval work.',
  totalDuration: '50-70 min',
  frequency: '1× per week at most. Alternate with shorter intervals.',
  recoveryNeeded: '48-72 hours. This one takes a toll.',
};

import type { WorkoutTemplate } from '../../types.js';

export const brickHalfIronman: WorkoutTemplate = {
  id: 'brick.halfironman',
  name: 'Half-Ironman Brick',
  sport: 'brick',
  category: 'race-specific',
  summary: 'Bike → run transition practice for half-ironman racing. Teaches the body to run on fatigued legs.',
  scientificRationale:
    'The bike-to-run transition in triathlon produces a unique physiological challenge: running immediately after prolonged cycling causes increased VO2 (3-7% higher than fresh running at the same pace), altered biomechanics (increased forward lean, shorter stride), and elevated blood lactate. Brick training induces specific neuromuscular adaptations that reduce the "dead legs" sensation and improve running economy off the bike. Research shows regular brick sessions reduce the VO2 cost of the T2 transition by 3-5% over 8-12 weeks (Millet & Vleck, 2000; Hue et al., 1998).',
  citations: [
    'Millet, G.P. & Vleck, V.E. (2000). Physiological and biomechanical adaptations to the cycle-to-run transition in Olympic triathlon. Sports Med, 30(6), 583-599.',
    'Hue, O. et al. (1998). The effect of prior cycling on biomechanical and metabolic variables during running in triathletes. Med Sci Sports Exerc, 30(7), 1297-1302.',
    'Bentley, D.J. et al. (2007). Specific aspects of contemporary triathlon. Sports Med, 37(4-5), 247-267.',
  ],
  trainingPhases: ['build', 'peak'],
  phases: [
    {
      name: 'Bike — Warm-up',
      duration: '10-15 min',
      description: 'Easy spinning building from Z1 to Z2.',
      targetZone: 'Bike Zone 1-2',
      targetPower: '<75% FTP',
      targetRPE: '2-3',
      coachingCues: ['Easy start — prepare for the sustained effort ahead'],
    },
    {
      name: 'Bike — Main Effort',
      duration: '60-90 min',
      description: 'Sustained riding at half-ironman race intensity.\nFirst 45min: steady Z2-Z3 (75-85% FTP)\nLast 15-30min: build to race effort Z3 (80-90% FTP)\nPractice race nutrition throughout: 40-60g carbs/hour.',
      targetZone: 'Bike Zone 2-3',
      targetPower: '75-90% FTP',
      targetRPE: '4-6',
      coachingCues: [
        'This is half-ironman effort, not all-out — save your legs',
        'Stay aero when comfortable — practice race position',
        'Fuel consistently — this is as much a nutrition rehearsal as a workout',
        'Last 10min: shift to slightly higher cadence (95+ rpm) to prepare legs for running',
        'Have run gear laid out and ready for quick transition',
      ],
    },
    {
      name: 'Transition (T2)',
      duration: '2-5 min',
      description: 'Practice quick dismount. Change to run shoes. Start moving immediately.',
      targetRPE: '3',
      coachingCues: [
        'Time your transition — practice makes it automatic',
        'Elastic laces on run shoes save 15-20 seconds',
        'Start moving within 60 seconds of dismounting',
      ],
    },
    {
      name: 'Run — First Kilometer',
      duration: '5-7 min',
      description: 'Easy running to find your legs. Expect it to feel terrible — it always does.',
      targetZone: 'Run Zone 2',
      targetRPE: '5-6 (feels like 7-8 due to prior cycling)',
      coachingCues: [
        'The first 5-10 minutes WILL feel horrible — that\'s normal, not a sign of poor fitness',
        'Start 30-60sec/km SLOWER than target run pace',
        'Short, quick strides — cadence over stride length',
        'Focus on posture: tall, slight forward lean, eyes ahead',
        'Give yourself permission to be slow at first',
      ],
    },
    {
      name: 'Run — Main Set',
      duration: '15-30 min',
      description: 'Build to half-ironman run pace (typically Z2-Z3).\nAfter first km, gradually increase pace over 5-10 minutes to target effort.\nHold target pace for remaining time.',
      targetZone: 'Run Zone 2-3',
      targetHR: '85-93% LTHR',
      targetRPE: '5-7',
      coachingCues: [
        'Settle into rhythm — it usually clicks around 10-15 minutes',
        'Run by effort, not pace — your HR will be elevated from the bike',
        'Cadence 170-180 spm, don\'t overstride',
        'Practice race nutrition: take in fluid/gel at start of run',
        'Mental cue: "I\'m a runner now, the bike is done"',
      ],
    },
    {
      name: 'Cool-down',
      duration: '5-10 min',
      description: 'Easy jog → walk. Stretch hip flexors (tight from bike position).',
      targetZone: 'Zone 1',
      targetRPE: '1-2',
      coachingCues: [
        'Hip flexor and quad stretching is essential post-brick',
        'Refuel within 30 minutes: protein + carbs',
      ],
    },
  ],
  adaptations: {
    beginner: 'Bike 45-60min Z2 + Run 15-20min easy. Focus on just completing the transition and running comfortable.',
    intermediate: 'Bike 60-75min Z2-Z3 + Run 20-30min at half-IM pace. Add short race-pace surges in last 5min of run.',
    advanced: 'Bike 90min at race power + Run 30-45min at race pace. Include negative-split run (2nd half faster). Full race nutrition.',
  },
  durationFormula: 'Bike: 60-90min. Run: 20-40min. Build bike duration first, then extend run.',
  totalDuration: '90-140 min',
  frequency: '1× per week during build phase, 1× every 2 weeks during peak.',
  recoveryNeeded: '48hr. This is the hardest session of the week. Schedule easy day after.',
};

export const brickTemplates: WorkoutTemplate[] = [
  brickHalfIronman,
];

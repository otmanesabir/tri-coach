import type { WorkoutTemplate } from '../../types.js';

export const runRecovery: WorkoutTemplate = {
  id: 'run.recovery',
  name: 'Recovery Run',
  sport: 'run',
  category: 'recovery',
  summary: 'Very easy run to promote blood flow and active recovery without adding training stress.',
  scientificRationale:
    'Active recovery at low intensity (< 65% VO2max) increases blood flow to damaged muscles, accelerating lactate clearance and nutrient delivery without adding meaningful training stress. The key is keeping intensity low enough that recovery is enhanced, not impaired. If a recovery run leaves you more fatigued, it\'s too hard (Menzies et al., 2010).',
  citations: [
    'Menzies, P. et al. (2010). Blood lactate clearance during active recovery after an intense running bout depends on the intensity of active recovery. J Sports Sci, 28(9), 975-982.',
    'Dupuy, O. et al. (2018). An evidence-based approach for choosing post-exercise recovery techniques. Front Physiol, 9, 403.',
  ],
  trainingPhases: ['base', 'build', 'peak', 'taper', 'recovery'],
  phases: [
    {
      name: 'Warm-up',
      duration: '3-5 min',
      description: 'Walk, then ease into the slowest jog possible.',
      targetRPE: '1-2',
      coachingCues: ['There is no warm-up pace that\'s too slow for a recovery run'],
    },
    {
      name: 'Main Set',
      duration: '15-30 min',
      description: 'Run at a shuffle. This should feel embarrassingly slow.',
      targetZone: 'Zone 1 (Friel)',
      targetHR: '< 81% LTHR',
      targetRPE: '2-3',
      coachingCues: [
        'If someone asks you a question, you could give a full answer',
        'This is NOT an easy run — it\'s easier than easy',
        'Walk if HR creeps above Zone 1',
        'Think "blood flow, not fitness"',
        'It should feel like barely exercising',
      ],
    },
    {
      name: 'Cool-down',
      duration: '3-5 min',
      description: 'Walk. Light mobility work.',
      targetRPE: '1',
      coachingCues: ['5-10 min of easy mobility/stretching is more valuable than extra running'],
    },
  ],
  adaptations: {
    beginner: '15-20 min. Walking is perfectly fine. The goal is movement, not running.',
    intermediate: '20-30 min easy jog. Stay disciplined — this is not an easy run.',
    advanced: '25-30 min. Resist the urge to pick up pace. This is harder psychologically than physically.',
  },
  durationFormula: '20-35 min total. Keep short. Never longer than your easy runs.',
  totalDuration: '20-40 min',
  frequency: '1-2× per week, day after hard sessions.',
  recoveryNeeded: 'None — this IS recovery.',
};

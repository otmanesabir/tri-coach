import type { WorkoutTemplate } from '../../types.js';

/**
 * Strength Training for Endurance Athletes
 *
 * Key principles from concurrent training research:
 * 1. Heavy, low-rep strength (3-6 reps) improves economy without hypertrophy
 * 2. Separate strength and endurance by 6+ hours when possible
 * 3. Prioritize the sport session if you must double
 * 4. 2-3 sessions/week in off-season, 1-2 in-season (maintenance)
 *
 * References:
 * - Rønnestad, B.R. & Mujika, I. (2014). Optimizing strength training for
 *   running and cycling endurance performance. Scand J Med Sci Sports, 24(4), 603-612.
 * - Beattie, K. et al. (2014). The effect of strength training on performance
 *   in endurance athletes. Sports Med, 44(6), 845-865.
 * - Lauersen, J.B. et al. (2014). The effectiveness of exercise interventions
 *   to prevent sports injuries. Br J Sports Med, 48(11), 871-877.
 */

export const strengthLower: WorkoutTemplate = {
  id: 'strength.lower',
  name: 'Lower Body Strength',
  sport: 'strength',
  category: 'strength',
  summary: 'Heavy compound lower body exercises. Improves running economy, cycling power, and injury resilience.',
  scientificRationale:
    'Heavy resistance training (≤6 RM) improves neuromuscular recruitment and rate of force development without significant hypertrophy, directly improving running economy by 2-8% and cycling economy by 3-5%. The key adaptation is neural — better muscle fiber recruitment, not bigger muscles. Studies consistently show no negative interference with endurance performance when programmed correctly (Rønnestad & Mujika, 2014).',
  citations: [
    'Rønnestad, B.R. & Mujika, I. (2014). Optimizing strength training for running and cycling endurance performance. Scand J Med Sci Sports, 24(4), 603-612.',
    'Beattie, K. et al. (2014). The effect of strength training on performance in endurance athletes. Sports Med, 44(6), 845-865.',
    'Støren, Ø. et al. (2008). Maximal strength training improves running economy. Med Sci Sports Exerc, 40(6), 1087-1092.',
  ],
  trainingPhases: ['base', 'build', 'peak'],
  phases: [
    {
      name: 'Warm-up',
      duration: '10 min',
      description: '5min bike/row + bodyweight squats, lunges, hip circles, glute bridges.',
      targetRPE: '2-3',
      coachingCues: ['Focus on activating glutes and hips', 'Do 2 warm-up sets at 50% and 75% working weight'],
    },
    {
      name: 'Main Set',
      duration: '30-40 min',
      description: 'Back Squat: 3-4 × 4-6 reps (heavy)\nRomanian Deadlift: 3 × 6-8 reps\nBulgarian Split Squat: 3 × 6-8/side\nSingle-Leg Calf Raise: 3 × 10-12/side\nHip Thrust: 3 × 8-10',
      targetRPE: '7-8 (2-3 reps in reserve)',
      coachingCues: [
        'Rest 2-3 minutes between heavy compound sets',
        'Full range of motion always — no partial reps',
        'Squat depth: at least parallel (hip crease below knee)',
        'Focus on eccentric control (3s lowering phase)',
        'Heavy but not maximal — leave 2-3 reps in the tank',
        'Quality > weight. Perfect form first.',
      ],
    },
    {
      name: 'Accessory/Prehab',
      duration: '10 min',
      description: 'Banded lateral walks × 15/side\nSingle-leg balance: 30s/side\nAnkle strengthening (towel scrunches, toe raises)',
      targetRPE: '3-4',
      coachingCues: [
        'These prevent injuries — don\'t skip them',
        'Focus on the muscles that endurance training misses: lateral hip, ankles, calves',
      ],
    },
  ],
  adaptations: {
    beginner: 'Start with bodyweight → progress to barbell over 4-6 weeks. Focus on movement patterns, not load. 2-3 × 8-10 reps.',
    intermediate: '3 × 5-6 reps at moderate-heavy load. Single-leg exercises prioritized.',
    advanced: '4 × 3-5 reps at heavy load. May superset accessory work. Add explosive variations (jump squats at 30% bodyweight).',
  },
  durationFormula: '45-60min total including warm-up. In-season: reduce to 2 exercises, 2-3 sets.',
  totalDuration: '45-60 min',
  frequency: '2× per week (base), 1-2× per week (build), 1× per week (peak, maintenance).',
  recoveryNeeded: '24-48hr before same-sport quality session. Schedule strength AFTER endurance, not before.',
};

export const strengthUpper: WorkoutTemplate = {
  id: 'strength.upper',
  name: 'Upper Body Strength',
  sport: 'strength',
  category: 'strength',
  summary: 'Upper body work for swim power, posture, and injury prevention. Essential for triathletes.',
  scientificRationale:
    'Upper body strength directly improves swim propulsion and cycling stability. Triathletes often neglect upper body, leading to poor swim mechanics and cycling posture degradation in long events. Lat, shoulder, and core strength are primary swim force generators. Maintaining upper body during long bike/run prevents the "collapse" that costs time in the final hours (Aspenes & Karlsen, 2012).',
  citations: [
    'Aspenes, S.T. & Karlsen, T. (2012). Exercise-training intervention studies in competitive swimming. Sports Med, 42(6), 527-543.',
    'Crowley, E. et al. (2017). The impact of resistance training on swimming performance. Sports Med, 47(11), 2285-2307.',
  ],
  trainingPhases: ['base', 'build'],
  phases: [
    {
      name: 'Warm-up',
      duration: '5-8 min',
      description: 'Arm circles, band pull-aparts, scap push-ups, light rows.',
      targetRPE: '2-3',
      coachingCues: ['Focus on shoulder activation and scapular control'],
    },
    {
      name: 'Main Set',
      duration: '25-35 min',
      description: 'Pull-ups/Lat Pulldown: 3 × 6-8\nOverhead Press: 3 × 6-8\nBent-Over Row: 3 × 8-10\nPush-ups: 3 × 10-15\nFace Pulls: 3 × 12-15',
      targetRPE: '6-7',
      coachingCues: [
        'Prioritize pulling over pushing (2:1 ratio)',
        'Swim-specific: lats, rear delts, rotator cuff',
        'Maintain scapular stability throughout',
        'No heavy overhead pressing if shoulder history',
      ],
    },
    {
      name: 'Prehab',
      duration: '8 min',
      description: 'External rotation: 2 × 15/side\nBand pull-aparts: 2 × 20\nDead hangs: 3 × 20-30s',
      targetRPE: '3',
      coachingCues: ['Rotator cuff health is non-negotiable for swimmers'],
    },
  ],
  adaptations: {
    beginner: 'Start with machines/bands. Push-ups from knees. Assisted pull-ups.',
    intermediate: 'Bodyweight + moderate dumbbell work. Full pull-ups.',
    advanced: 'Weighted pull-ups. Heavy rows. May add TRX/ring work.',
  },
  durationFormula: '35-50min. Can combine with lower body for full session.',
  totalDuration: '35-50 min',
  frequency: '1-2× per week.',
  recoveryNeeded: '24hr before quality swim session.',
};

export const strengthCore: WorkoutTemplate = {
  id: 'strength.core',
  name: 'Core Stability',
  sport: 'strength',
  category: 'stability',
  summary: 'Core training for run efficiency, bike stability, and injury prevention. Anti-movement focused.',
  scientificRationale:
    'Core stability reduces energy "leakage" during running (lateral trunk displacement costs ~3-5% of energy) and maintains aerodynamic position on the bike. Modern core training emphasizes anti-movement patterns (anti-rotation, anti-extension, anti-lateral flexion) rather than sit-ups. Research shows core endurance (sustaining positions) is more important than core strength (maximum force) for endurance athletes (Sato & Mokha, 2009).',
  citations: [
    'Sato, K. & Mokha, M. (2009). Does core strength training influence running kinetics? J Strength Cond Res, 23(1), 133-140.',
    'Fredericson, M. & Moore, T. (2005). Muscular balance, core stability, and injury prevention for middle and long-distance runners. Phys Med Rehabil Clin, 16(3), 669-689.',
  ],
  trainingPhases: ['base', 'build', 'peak', 'taper', 'recovery'],
  phases: [
    {
      name: 'Warm-up',
      duration: '3 min',
      description: 'Cat-cow, dead bugs (5/side), hip circles.',
      targetRPE: '1-2',
      coachingCues: ['Engage deep stabilizers before challenging them'],
    },
    {
      name: 'Circuit (3 rounds)',
      duration: '20-25 min',
      description: 'Plank: 30-60s\nSide Plank: 30-45s/side\nDead Bug: 10/side\nBird Dog: 10/side\nPallof Press: 10/side\nGlute Bridge March: 10/side\nRest 60s between rounds.',
      targetRPE: '5-6',
      coachingCues: [
        'Brace as if someone is going to push you — that\'s proper core engagement',
        'No holding breath — breathe normally while maintaining brace',
        'Quality of position > duration. Stop when form breaks.',
        'Anti-rotation: resist twisting, don\'t create it',
        'Think "still hips" during dead bugs and bird dogs',
      ],
    },
  ],
  adaptations: {
    beginner: '2 rounds, shorter holds (20-30s planks), easier progressions (knees for plank).',
    intermediate: '3 rounds as prescribed. Add weight to glute bridges.',
    advanced: '3-4 rounds. Progress to: weighted planks, Copenhagen plank, single-arm farmer carries, Turkish get-ups.',
  },
  durationFormula: '20-30min. Can be done daily at light intensity.',
  totalDuration: '20-30 min',
  frequency: '3-5× per week. Can be added to any training day.',
  recoveryNeeded: 'None. Designed to be done frequently.',
};

export const strengthRunner: WorkoutTemplate = {
  id: 'strength.runner',
  name: 'Runner\'s Strength',
  sport: 'strength',
  category: 'sport-specific',
  summary: 'Targeted strength for runners: glutes, single-leg stability, calf/Achilles resilience. The injury-prevention session.',
  scientificRationale:
    'Running injuries are primarily overuse injuries caused by inadequate tissue capacity. Strength training reduces running injury risk by 50-70% (Lauersen et al., 2014). Single-leg exercises address the asymmetries and lateral instability that cause IT band, knee, and hip issues. Calf and Achilles loading protocols are critical — the calf complex absorbs 6-8× body weight per stride.',
  citations: [
    'Lauersen, J.B. et al. (2014). The effectiveness of exercise interventions to prevent sports injuries. Br J Sports Med, 48(11), 871-877.',
    'Willy, R.W. & Davis, I.S. (2011). The effect of a hip-strengthening program on mechanics during running and during a single-leg squat. J Orthop Sports Phys Ther, 41(9), 625-632.',
  ],
  trainingPhases: ['base', 'build', 'peak'],
  phases: [
    {
      name: 'Warm-up',
      duration: '5 min',
      description: 'Glute activation circuit: banded walks, clamshells, hip circles.',
      targetRPE: '2',
      coachingCues: ['Wake up those glutes — they\'re the engine of running'],
    },
    {
      name: 'Main Set',
      duration: '25-35 min',
      description: 'Single-Leg Squat to Box: 3 × 8/side\nSingle-Leg RDL: 3 × 8/side\nStep-Ups (weighted): 3 × 10/side\nEccentric Calf Raise: 3 × 12/side (3s lowering)\nBanded Lateral Walk: 3 × 15/side\nSide-Lying Hip Abduction: 3 × 15/side',
      targetRPE: '5-7',
      coachingCues: [
        'Single-leg work exposes and fixes imbalances',
        'Keep hips LEVEL during all single-leg exercises',
        'Eccentric calf raises: slow lowering is the key — this builds Achilles tendon resilience',
        'If one side is weaker, do that side first and match volume',
      ],
    },
    {
      name: 'Mobility',
      duration: '5 min',
      description: 'Hip flexor stretch, pigeon pose, calf stretches.',
      targetRPE: '1-2',
      coachingCues: ['Hold stretches 30-60s for actual tissue change'],
    },
  ],
  adaptations: {
    beginner: 'Bodyweight only. 2 × 8/side. Focus on balance and control.',
    intermediate: 'Add dumbbells/kettlebells. 3 × 8-10/side.',
    advanced: 'Heavier loads. Add pistol squats, Nordic curls, loaded step-ups.',
  },
  durationFormula: '30-45min. Efficient and targeted.',
  totalDuration: '35-45 min',
  frequency: '2× per week. Non-negotiable for injury prevention.',
  recoveryNeeded: '24hr before quality running. OK before easy runs.',
};

export const strengthTriathlon: WorkoutTemplate = {
  id: 'strength.triathlon',
  name: 'Triathlon Full-Body',
  sport: 'strength',
  category: 'sport-specific',
  summary: 'Comprehensive session covering all three sports. Efficient full-body workout for time-crunched triathletes.',
  scientificRationale:
    'Triathletes must balance strength across three sports while minimizing time in the gym. A full-body approach hitting key muscle groups for each discipline (lats/shoulders for swim, quads/glutes for bike/run, core for all) in one session is more time-efficient than sport-specific split sessions. Research shows 2× per week full-body is as effective as higher-frequency splits for strength maintenance (Schoenfeld et al., 2015).',
  citations: [
    'Schoenfeld, B.J. et al. (2015). Influence of resistance training frequency on muscular adaptations in well-trained men. J Strength Cond Res, 29(7), 1821-1829.',
    'Rønnestad, B.R. & Mujika, I. (2014). Scand J Med Sci Sports, 24(4), 603-612.',
  ],
  trainingPhases: ['base', 'build'],
  phases: [
    {
      name: 'Warm-up',
      duration: '8 min',
      description: '3min cardio + banded activation (pull-aparts, lateral walks, hip circles).',
      targetRPE: '2',
      coachingCues: ['Activate the full chain — shoulders through hips'],
    },
    {
      name: 'Main Set',
      duration: '35-45 min',
      description: 'A1: Back Squat 3 × 5-6\nA2: Pull-ups/Lat Pulldown 3 × 6-8\n(alternate, rest 90s between)\n\nB1: Romanian Deadlift 3 × 6-8\nB2: Overhead Press 3 × 6-8\n(alternate, rest 90s between)\n\nC1: Bulgarian Split Squat 2 × 8/side\nC2: Bent-Over Row 2 × 10\n(alternate, rest 60s between)\n\nD: Core Circuit (plank 45s, side plank 30s/side, dead bug 10/side) × 2',
      targetRPE: '6-8',
      coachingCues: [
        'Superset format saves time — upper/lower alternating',
        'Keep rest strict — this should move efficiently',
        'Heavy on the big lifts (A/B), moderate on accessories (C/D)',
        'Full range of motion, always',
      ],
    },
  ],
  adaptations: {
    beginner: 'Reduce to 2 sets each. Use machines/dumbbells instead of barbells.',
    intermediate: 'As prescribed. Focus on progressive overload week to week.',
    advanced: 'Add explosive work (box jumps, med ball throws) as warm-up. Increase loads.',
  },
  durationFormula: '45-60min. In-season, drop to A-sets only (20-25min maintenance).',
  totalDuration: '45-60 min',
  frequency: '2× per week (base/build), 1× per week (peak, maintenance only).',
  recoveryNeeded: '24hr. Schedule on easy training days.',
};

export const strengthPlyometric: WorkoutTemplate = {
  id: 'strength.plyometric',
  name: 'Plyometric / Explosive',
  sport: 'strength',
  category: 'power',
  summary: 'Explosive exercises improving running economy, power output, and neuromuscular activation.',
  scientificRationale:
    'Plyometric training improves running economy by 2-8% by enhancing the stretch-shortening cycle (SSC) — the elastic energy stored in tendons during ground contact. Improved SSC efficiency means less metabolic energy needed per stride. A landmark study showed 9 weeks of explosive strength training improved 5K time by 3.1% without changes in VO2max (Paavolainen et al., 1999). For triathletes, this translates directly to running off the bike.',
  citations: [
    'Paavolainen, L. et al. (1999). Explosive-strength training improves 5-km running time by improving running economy and muscle power. J Appl Physiol, 86(5), 1527-1533.',
    'Saunders, P.U. et al. (2006). Short-term plyometric training improves running economy in highly trained middle and long distance runners. J Strength Cond Res, 20(4), 947-954.',
    'Spurrs, R.W. et al. (2003). The effect of plyometric training on distance running performance. Eur J Appl Physiol, 89, 1-7.',
  ],
  trainingPhases: ['build', 'peak'],
  phases: [
    {
      name: 'Warm-up',
      duration: '10 min',
      description: 'Easy jog + dynamic drills (high knees, butt kicks, A-skips, karaoke) + 4 × 20s strides.',
      targetRPE: '3-4',
      coachingCues: [
        'You must be fully warm before explosive work',
        'Include ankle and calf activation',
      ],
    },
    {
      name: 'Main Set',
      duration: '15-25 min',
      description: 'Box Jumps: 3 × 5 (focus on soft landing)\nSingle-Leg Hops: 3 × 8/side\nBounding: 3 × 6 bounds\nDrop Jumps: 3 × 5 (step off 30cm box, immediate jump)\nSkipping for Height: 3 × 20m\nRest 60-90s between sets.',
      targetRPE: '7-8',
      coachingCues: [
        'QUALITY over volume — every rep should be explosive',
        'Minimal ground contact time — think "hot coals"',
        'Land softly with knees slightly bent',
        'Stop immediately if form degrades or joints hurt',
        'Total foot contacts per session: 40-80 for beginners, 80-120 for advanced',
        'These are NOT conditioning — full rest between sets',
      ],
    },
    {
      name: 'Cool-down',
      duration: '5 min',
      description: 'Walk, light stretching.',
      targetRPE: '1-2',
      coachingCues: ['Calves and Achilles may feel worked — that\'s normal'],
    },
  ],
  adaptations: {
    beginner: 'Start with double-leg only: squat jumps, box step-ups with pop, A-skips. 40-60 contacts.',
    intermediate: 'Add single-leg work. 60-80 contacts per session.',
    advanced: '80-120 contacts. Add depth jumps, single-leg bounds, hurdle hops.',
  },
  durationFormula: '25-40min including warm-up. Never more than 120 contacts per session.',
  totalDuration: '30-40 min',
  frequency: '1-2× per week. Do NOT combine with hard endurance sessions same day.',
  recoveryNeeded: '48hr before quality running. Ideally done on strength days.',
};

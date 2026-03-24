export const runStrides = {
    id: 'run.strides',
    name: 'Strides',
    sport: 'run',
    category: 'neuromuscular',
    summary: 'Short (15-25s) smooth accelerations to near-max speed. Maintains leg speed and running economy year-round.',
    scientificRationale: 'Strides (also called pick-ups or accelerations) maintain neuromuscular coordination and running economy without accumulating significant training stress. The short duration (15-25s) and full recovery (45-60s) mean no lactate accumulation — this is purely neuromuscular training. Strides improve running economy by reinforcing efficient motor patterns at high speed. They can be done year-round, even on easy days (Daniels, 2014).',
    citations: [
        'Daniels, J. (2014). Daniels\' Running Formula, 3rd ed.',
        'Paavolainen, L. et al. (1999). Explosive-strength training improves 5-km running time. J Appl Physiol, 86(5), 1527-1533.',
    ],
    trainingPhases: ['base', 'build', 'peak', 'taper', 'recovery'],
    phases: [
        {
            name: 'Main Set',
            duration: '8-12 min',
            description: '4-8 × 20-25 seconds accelerating to ~90% max speed (mile pace or faster). Full recovery: 45-60s walk/easy jog between.',
            targetZone: 'N/A (too short for HR response)',
            targetPace: 'Accelerate to ~mile pace',
            targetRPE: '6-7 (smooth and fast, not straining)',
            coachingCues: [
                'Accelerate smoothly over the first 5-10s — don\'t explode off the line',
                'At peak speed, focus on SMOOTH not HARD',
                'High cadence, light feet, relaxed shoulders',
                'Decelerate gradually in the last 5s',
                'Recovery is FULL — walk back, shake out legs',
                'These should feel fun and easy, never like sprints',
                'Done after an easy run, before a workout, or standalone',
            ],
        },
    ],
    adaptations: {
        beginner: '4 × 15-20s with 60s walk recovery. Speed: comfortably fast, not sprinting.',
        intermediate: '6 × 20s with 45-60s jog recovery. Speed: ~1500m-mile pace.',
        advanced: '6-8 × 20-25s with 45s jog recovery. Speed: mile pace or slightly faster.',
    },
    durationFormula: 'Always 4-8 reps of 15-25s. Do not increase volume — add quality instead.',
    totalDuration: '8-15 min (add to end of easy runs)',
    frequency: '2-4× per week, typically after easy runs.',
    recoveryNeeded: 'None. These can be done daily.',
};
//# sourceMappingURL=strides.js.map
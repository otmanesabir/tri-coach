export const runHills = {
    id: 'run.hills',
    name: 'Hill Repeats',
    sport: 'run',
    category: 'strength-speed',
    summary: 'Running-specific strength work. Hills build power, improve form, and provide VO2max stimulus with lower impact.',
    scientificRationale: 'Hill running recruits more muscle fibers (particularly type II) than flat running at the same HR, providing a strength stimulus alongside cardiovascular training. The reduced impact on the downhill (running up only, walking/jogging down) makes it lower injury risk than flat speed work. Hill repeats improve running economy by 2-4% over 6-10 weeks (Barnes & Kilding, 2015). Plyometric-like muscle contractions during uphill running enhance neuromuscular power.',
    citations: [
        'Barnes, K.R. & Kilding, A.E. (2015). Running economy: measurement, norms, and determining factors. Sports Med Open, 1, 8.',
        'Ferley, D.D. et al. (2014). Incline treadmill interval training: its role in improving running economy. J Strength Cond Res, 28(6), 1475-1483.',
        'Daniels, J. (2014). Daniels\' Running Formula, 3rd ed.',
    ],
    trainingPhases: ['base', 'build'],
    phases: [
        {
            name: 'Warm-up',
            duration: '10-15 min',
            description: 'Easy jog to the hill + dynamic drills + 2-3 easy hill strides.',
            targetRPE: '2-3',
            coachingCues: [
                'Include some flat strides before hitting the hill',
                'Know your hill: 4-8% gradient, 200-400m long is ideal',
            ],
        },
        {
            name: 'Main Set',
            duration: '20-30 min',
            description: '6-10 × 60-90 second hill repeats at hard effort. Jog/walk down for recovery.',
            targetZone: 'Zone 5a-5b (Friel)',
            targetRPE: '7-9',
            coachingCues: [
                'Drive knees forward and up, not just fast',
                'Slight forward lean from ankles — don\'t bend at the waist',
                'Quick, powerful arm drive',
                'Maintain rhythm — don\'t let cadence drop',
                'Walk or easy jog back down — this IS the recovery',
                'Each rep should feel similar in effort — not faster, not slower',
            ],
        },
        {
            name: 'Cool-down',
            duration: '10 min',
            description: 'Easy jog on flat ground.',
            targetRPE: '2',
            coachingCues: ['Easy flat running helps the legs flush out'],
        },
    ],
    adaptations: {
        beginner: '4-6 × 30-45s hills at moderate-hard effort. Walk down recovery.',
        intermediate: '6-8 × 60-75s hills at hard effort. Jog down recovery.',
        advanced: '8-12 × 60-90s hills. Or "Kenya hills": 20-30min of continuous hilly running at tempo effort.',
    },
    durationFormula: 'Start with 4 reps, add 1 per week. Cap at 10-12 reps.',
    totalDuration: '40-55 min',
    frequency: '1× per week in base/build phases. Replace intervals, not add to them.',
    recoveryNeeded: '24-48 hours. Less impact stress than flat intervals.',
};
//# sourceMappingURL=hills.js.map
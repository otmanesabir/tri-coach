import { runEasy, runRecovery, runLong, runTempo, runThreshold, runProgression, runIntervals400, runIntervals800, runIntervals1k, runIntervalsMile, runFartlek, runHills, runStrides, runRacePace, } from './run/index.js';
import { swimTechnique, swimEasy, swimThreshold, swimEndurance, } from './swim/index.js';
import { bikeEasy, bikeEndurance, bikeTempo, bikeSweetSpot, bikeThreshold, } from './bike/index.js';
import { brickHalfIronman } from './brick/index.js';
import { strengthLower, strengthUpper, strengthCore, strengthRunner, strengthTriathlon, strengthPlyometric, } from './strength/index.js';
export const allTemplates = [
    // Run (12)
    runEasy,
    runRecovery,
    runLong,
    runTempo,
    runThreshold,
    runProgression,
    runFartlek,
    runHills,
    runStrides,
    runRacePace,
    runIntervals400,
    runIntervals800,
    runIntervals1k,
    runIntervalsMile,
    // Swim (4)
    swimTechnique,
    swimEasy,
    swimThreshold,
    swimEndurance,
    // Bike (5)
    bikeEasy,
    bikeEndurance,
    bikeTempo,
    bikeSweetSpot,
    bikeThreshold,
    // Brick (1)
    brickHalfIronman,
    // Strength (6)
    strengthLower,
    strengthUpper,
    strengthCore,
    strengthRunner,
    strengthTriathlon,
    strengthPlyometric,
];
// Re-export everything
export * from './run/index.js';
export * from './swim/index.js';
export * from './bike/index.js';
export * from './brick/index.js';
export * from './strength/index.js';
//# sourceMappingURL=index.js.map
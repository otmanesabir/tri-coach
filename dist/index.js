#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { allTemplates } from './templates/index.js';
import { calculateFrielZones, calculateHRmaxZones, calculateKarvonenZones, formatHRZones, } from './zones/heart-rate.js';
import { vdotFromRace, calculateDanielsPaces, predictRaceTimes, formatDanielsPaces, parseTimeToSeconds, } from './zones/vdot.js';
import { calculateCSS, calculateSwimZones, parseSwimTime, formatSwimZones, } from './zones/swim.js';
import { calculatePowerZones, sweetSpotRange, formatPowerZones, } from './zones/power.js';
const program = new Command();
program
    .name('tri-coach')
    .description('Science-based endurance training templates & zone calculators for triathlon. Output is JSON by default (optimized for AI agents). Use --pretty for human-readable output.')
    .version('0.1.0');
// ──────────────────────────────────────────────
// templates list
// ──────────────────────────────────────────────
const templates = program.command('templates').description('Browse workout templates');
templates
    .command('list')
    .description('List all workout templates')
    .option('-s, --sport <sport>', 'Filter by sport (run, bike, swim, strength, brick)')
    .option('--pretty', 'Human-readable output instead of JSON')
    .action((opts) => {
    let filtered = allTemplates;
    if (opts.sport) {
        const sport = opts.sport.toLowerCase();
        filtered = allTemplates.filter((t) => t.sport === sport);
        if (filtered.length === 0) {
            if (opts.pretty) {
                console.log(chalk.red(`No templates found for sport: ${opts.sport}`));
                console.log(chalk.dim(`Available sports: run, bike, swim, strength, brick`));
            }
            else {
                console.log(JSON.stringify({ error: `No templates found for sport: ${opts.sport}`, availableSports: ['run', 'bike', 'swim', 'strength', 'brick'] }));
            }
            return;
        }
    }
    if (!opts.pretty) {
        // JSON output (default) — summary view for listing
        const out = filtered.map((t) => ({
            id: t.id,
            name: t.name,
            sport: t.sport,
            category: t.category,
            summary: t.summary,
            trainingPhases: t.trainingPhases,
            totalDuration: t.totalDuration,
            frequency: t.frequency,
        }));
        console.log(JSON.stringify(out, null, 2));
        return;
    }
    // Pretty output
    console.log(chalk.bold('\n  Workout Templates\n'));
    const grouped = new Map();
    for (const t of filtered) {
        const list = grouped.get(t.sport) || [];
        list.push(t);
        grouped.set(t.sport, list);
    }
    const sportColors = {
        run: chalk.green,
        bike: chalk.yellow,
        swim: chalk.cyan,
        strength: chalk.magenta,
        brick: chalk.red,
    };
    for (const [sport, items] of grouped) {
        const colorFn = sportColors[sport] || chalk.white;
        console.log(colorFn(`  ── ${sport.toUpperCase()} (${items.length}) ──`));
        for (const t of items) {
            console.log(`  ${chalk.bold(t.id.padEnd(28))} ${t.summary}`);
        }
        console.log();
    }
    console.log(chalk.dim(`  ${filtered.length} templates total. Use "tri-coach templates show <id>" for details.`));
});
// ──────────────────────────────────────────────
// templates show <id>
// ──────────────────────────────────────────────
templates
    .command('show <id>')
    .description('Show detailed template information')
    .option('--pretty', 'Human-readable output instead of JSON')
    .action((id, opts) => {
    const template = allTemplates.find((t) => t.id === id);
    if (!template) {
        if (opts.pretty) {
            console.log(chalk.red(`Template not found: ${id}`));
            console.log(chalk.dim('Use "tri-coach templates list" to see available templates.'));
        }
        else {
            console.log(JSON.stringify({ error: `Template not found: ${id}` }));
        }
        return;
    }
    if (!opts.pretty) {
        // JSON output (default) — full template object
        console.log(JSON.stringify(template, null, 2));
        return;
    }
    // Pretty output
    const sportColors = {
        run: chalk.green,
        bike: chalk.yellow,
        swim: chalk.cyan,
        strength: chalk.magenta,
        brick: chalk.red,
    };
    const colorFn = sportColors[template.sport] || chalk.white;
    console.log();
    console.log(chalk.bold(`  ${template.name}`));
    console.log(colorFn(`  ${template.sport.toUpperCase()} · ${template.category} · ${template.id}`));
    console.log();
    console.log(chalk.dim('  Summary'));
    console.log(`  ${template.summary}`);
    console.log();
    console.log(chalk.dim('  Scientific Rationale'));
    wrapPrint(template.scientificRationale, 80, 2);
    console.log();
    console.log(chalk.dim('  Duration'));
    console.log(`  Total: ${template.totalDuration} | Formula: ${template.durationFormula}`);
    console.log(`  Frequency: ${template.frequency}`);
    console.log(`  Recovery: ${template.recoveryNeeded}`);
    console.log();
    console.log(chalk.dim('  Training Phases'));
    console.log(`  ${template.trainingPhases.join(', ')}`);
    console.log();
    console.log(chalk.dim('  Workout Phases'));
    for (const phase of template.phases) {
        console.log(chalk.bold(`\n  ▸ ${phase.name}`) + chalk.dim(` (${phase.duration})`));
        console.log(`    ${phase.description.split('\n').join('\n    ')}`);
        const targets = [];
        if (phase.targetZone)
            targets.push(`Zone: ${phase.targetZone}`);
        if (phase.targetHR)
            targets.push(`HR: ${phase.targetHR}`);
        if (phase.targetPace)
            targets.push(`Pace: ${phase.targetPace}`);
        if (phase.targetPower)
            targets.push(`Power: ${phase.targetPower}`);
        if (phase.targetRPE)
            targets.push(`RPE: ${phase.targetRPE}`);
        if (targets.length > 0) {
            console.log(chalk.cyan(`    ${targets.join(' | ')}`));
        }
        if (phase.coachingCues.length > 0) {
            console.log(chalk.dim('    Coaching Cues:'));
            for (const cue of phase.coachingCues) {
                console.log(`    • ${cue}`);
            }
        }
    }
    console.log(chalk.dim('\n  Adaptations'));
    console.log(chalk.green('  Beginner:     ') + template.adaptations.beginner);
    console.log(chalk.yellow('  Intermediate: ') + template.adaptations.intermediate);
    console.log(chalk.red('  Advanced:     ') + template.adaptations.advanced);
    if (template.citations.length > 0) {
        console.log(chalk.dim('\n  Citations'));
        for (const cite of template.citations) {
            console.log(`  • ${cite}`);
        }
    }
    console.log();
});
// ──────────────────────────────────────────────
// zones calculate
// ──────────────────────────────────────────────
const zones = program.command('zones').description('Calculate training zones');
zones
    .command('calculate')
    .description('Calculate training zones from physiological inputs')
    .option('--lthr <bpm>', 'Lactate threshold heart rate (Friel 7-zone)')
    .option('--max-hr <bpm>', 'Maximum heart rate (5-zone or Karvonen)')
    .option('--rest-hr <bpm>', 'Resting heart rate (for Karvonen method)')
    .option('--race-5k <time>', 'Recent 5K race time in mm:ss (VDOT pace zones)')
    .option('--css-400 <time>', '400m swim TT time in m:ss (CSS swim zones)')
    .option('--css-200 <time>', '200m swim TT time in m:ss (CSS swim zones)')
    .option('--ftp <watts>', 'Functional threshold power in watts (cycling power zones)')
    .option('--pretty', 'Human-readable output instead of JSON')
    .action((opts) => {
    const jsonResult = {};
    let calculated = false;
    // Friel LTHR zones
    if (opts.lthr) {
        const lthr = parseInt(opts.lthr, 10);
        if (isNaN(lthr) || lthr < 100 || lthr > 220) {
            const err = 'Invalid LTHR. Expected a number between 100-220 bpm.';
            if (opts.pretty)
                console.log(chalk.red(err));
            else
                console.log(JSON.stringify({ error: err }));
            return;
        }
        const hrZones = calculateFrielZones(lthr);
        if (opts.pretty) {
            console.log(chalk.bold(formatHRZones(hrZones, `Friel 7-Zone, LTHR=${lthr} bpm`)));
        }
        else {
            jsonResult.frielZones = { method: 'friel_7zone', lthr, zones: hrZones };
        }
        calculated = true;
    }
    // HRmax zones (with optional Karvonen)
    if (opts.maxHr) {
        const maxHr = parseInt(opts.maxHr, 10);
        if (isNaN(maxHr) || maxHr < 120 || maxHr > 230) {
            const err = 'Invalid max HR. Expected a number between 120-230 bpm.';
            if (opts.pretty)
                console.log(chalk.red(err));
            else
                console.log(JSON.stringify({ error: err }));
            return;
        }
        if (opts.restHr) {
            const restHr = parseInt(opts.restHr, 10);
            if (isNaN(restHr) || restHr < 30 || restHr > 100) {
                const err = 'Invalid resting HR. Expected a number between 30-100 bpm.';
                if (opts.pretty)
                    console.log(chalk.red(err));
                else
                    console.log(JSON.stringify({ error: err }));
                return;
            }
            const kZones = calculateKarvonenZones(maxHr, restHr);
            if (opts.pretty) {
                console.log(chalk.bold(formatHRZones(kZones, `Karvonen (HRR), Max=${maxHr}, Rest=${restHr}`)));
            }
            else {
                jsonResult.karvonenZones = { method: 'karvonen', maxHr, restHr, zones: kZones };
            }
        }
        else {
            const hrZones = calculateHRmaxZones(maxHr);
            if (opts.pretty) {
                console.log(chalk.bold(formatHRZones(hrZones, `%HRmax 5-Zone, HRmax=${maxHr} bpm`)));
            }
            else {
                jsonResult.hrmaxZones = { method: 'hrmax_5zone', maxHr, zones: hrZones };
            }
        }
        calculated = true;
    }
    // VDOT pace zones from 5K
    if (opts.race5k) {
        const seconds = parseTimeToSeconds(opts.race5k);
        if (seconds < 600 || seconds > 3600) {
            const err = 'Invalid 5K time. Expected mm:ss between 10:00 and 60:00.';
            if (opts.pretty)
                console.log(chalk.red(err));
            else
                console.log(JSON.stringify({ error: err }));
            return;
        }
        const vdot = vdotFromRace('5k', opts.race5k);
        const paces = calculateDanielsPaces(vdot);
        const predictions = predictRaceTimes(vdot);
        if (opts.pretty) {
            console.log(chalk.bold(formatDanielsPaces(paces)));
            console.log(chalk.dim('\n  Race Predictions'));
            for (const [dist, time] of Object.entries(predictions)) {
                console.log(`  ${dist.padEnd(12)} ${time}`);
            }
            console.log();
        }
        else {
            jsonResult.vdot = { method: 'daniels_vdot', vdot, race5k: opts.race5k, paces, predictions };
        }
        calculated = true;
    }
    // CSS swim zones
    if (opts.css400 && opts.css200) {
        const t400 = parseSwimTime(opts.css400);
        const t200 = parseSwimTime(opts.css200);
        if (t400 <= t200) {
            const err = '400m time must be greater than 200m time.';
            if (opts.pretty)
                console.log(chalk.red(err));
            else
                console.log(JSON.stringify({ error: err }));
            return;
        }
        const css = calculateCSS(t400, t200);
        const swimZones = calculateSwimZones(css);
        if (opts.pretty) {
            console.log(chalk.bold(formatSwimZones(swimZones, css)));
        }
        else {
            jsonResult.swimZones = { method: 'css', css400: opts.css400, css200: opts.css200, cssPerHundredM: css, zones: swimZones };
        }
        calculated = true;
    }
    else if (opts.css400 || opts.css200) {
        const err = 'Both --css-400 and --css-200 are required for swim zone calculation.';
        if (opts.pretty)
            console.log(chalk.red(err));
        else
            console.log(JSON.stringify({ error: err }));
        return;
    }
    // FTP power zones
    if (opts.ftp) {
        const ftp = parseInt(opts.ftp, 10);
        if (isNaN(ftp) || ftp < 50 || ftp > 600) {
            const err = 'Invalid FTP. Expected a number between 50-600 watts.';
            if (opts.pretty)
                console.log(chalk.red(err));
            else
                console.log(JSON.stringify({ error: err }));
            return;
        }
        const powerZones = calculatePowerZones(ftp);
        const ss = sweetSpotRange(ftp);
        if (opts.pretty) {
            console.log(chalk.bold(formatPowerZones(powerZones)));
            console.log(chalk.yellow(`\n  Sweet Spot: ${ss.min}-${ss.max}W (88-93% FTP)`));
            console.log();
        }
        else {
            jsonResult.powerZones = { method: 'ftp', ftp, zones: powerZones, sweetSpot: ss };
        }
        calculated = true;
    }
    if (!calculated) {
        if (opts.pretty) {
            console.log(chalk.yellow('\n  No zone inputs provided. Use one or more of:'));
            console.log(chalk.dim('    --lthr <bpm>              Friel 7-zone heart rate zones'));
            console.log(chalk.dim('    --max-hr <bpm>            %HRmax 5-zone'));
            console.log(chalk.dim('    --max-hr <bpm> --rest-hr <bpm>  Karvonen (HR reserve) zones'));
            console.log(chalk.dim('    --race-5k <mm:ss>         VDOT pace zones'));
            console.log(chalk.dim('    --css-400 <m:ss> --css-200 <m:ss>  CSS swim zones'));
            console.log(chalk.dim('    --ftp <watts>             FTP power zones'));
            console.log();
        }
        else {
            console.log(JSON.stringify({
                error: 'No zone inputs provided',
                availableOptions: ['--lthr <bpm>', '--max-hr <bpm>', '--rest-hr <bpm>', '--race-5k <mm:ss>', '--css-400 <m:ss> --css-200 <m:ss>', '--ftp <watts>'],
            }));
        }
        return;
    }
    // Output collected JSON
    if (!opts.pretty) {
        console.log(JSON.stringify(jsonResult, null, 2));
    }
});
// ──────────────────────────────────────────────
// Helper
// ──────────────────────────────────────────────
function wrapPrint(text, width, indent) {
    const prefix = ' '.repeat(indent);
    const words = text.split(/\s+/);
    let line = prefix;
    for (const word of words) {
        if (line.length + word.length + 1 > width + indent) {
            console.log(line);
            line = prefix + word;
        }
        else {
            line += (line.length === indent ? '' : ' ') + word;
        }
    }
    if (line.trim())
        console.log(line);
}
program.parse();
//# sourceMappingURL=index.js.map
#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { allTemplates } from './templates/index.js';
import {
  calculateFrielZones, calculateHRmaxZones, calculateKarvonenZones,
  formatHRZones,
} from './zones/heart-rate.js';
import {
  vdotFromRace, calculateDanielsPaces, predictRaceTimes,
  formatDanielsPaces, formatPace, parseTimeToSeconds,
} from './zones/vdot.js';
import {
  calculateCSS, calculateSwimZones, parseSwimTime, formatSwimZones,
} from './zones/swim.js';
import {
  calculatePowerZones, sweetSpotRange, formatPowerZones,
} from './zones/power.js';
import type { Sport, WorkoutTemplate } from './types.js';

const program = new Command();

program
  .name('tri-coach')
  .description('Science-based endurance training templates & zone calculators for triathlon')
  .version('0.1.0');

// ──────────────────────────────────────────────
// templates list
// ──────────────────────────────────────────────

const templates = program.command('templates').description('Browse workout templates');

templates
  .command('list')
  .description('List all workout templates')
  .option('-s, --sport <sport>', 'Filter by sport (run, bike, swim, strength, brick)')
  .action((opts: { sport?: string }) => {
    let filtered = allTemplates;
    if (opts.sport) {
      const sport = opts.sport.toLowerCase() as Sport;
      filtered = allTemplates.filter((t) => t.sport === sport);
      if (filtered.length === 0) {
        console.log(chalk.red(`No templates found for sport: ${opts.sport}`));
        console.log(chalk.dim(`Available sports: run, bike, swim, strength, brick`));
        return;
      }
    }

    console.log(chalk.bold('\n  Workout Templates\n'));

    const grouped = new Map<string, WorkoutTemplate[]>();
    for (const t of filtered) {
      const list = grouped.get(t.sport) || [];
      list.push(t);
      grouped.set(t.sport, list);
    }

    const sportColors: Record<string, (s: string) => string> = {
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
  .action((id: string) => {
    const template = allTemplates.find((t) => t.id === id);
    if (!template) {
      console.log(chalk.red(`Template not found: ${id}`));
      console.log(chalk.dim('Use "tri-coach templates list" to see available templates.'));
      return;
    }

    const sportColors: Record<string, (s: string) => string> = {
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
      const targets: string[] = [];
      if (phase.targetZone) targets.push(`Zone: ${phase.targetZone}`);
      if (phase.targetHR) targets.push(`HR: ${phase.targetHR}`);
      if (phase.targetPace) targets.push(`Pace: ${phase.targetPace}`);
      if (phase.targetPower) targets.push(`Power: ${phase.targetPower}`);
      if (phase.targetRPE) targets.push(`RPE: ${phase.targetRPE}`);
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
  .action((opts: {
    lthr?: string;
    maxHr?: string;
    restHr?: string;
    race5k?: string;
    css400?: string;
    css200?: string;
    ftp?: string;
  }) => {
    let calculated = false;

    // Friel LTHR zones
    if (opts.lthr) {
      const lthr = parseInt(opts.lthr, 10);
      if (isNaN(lthr) || lthr < 100 || lthr > 220) {
        console.log(chalk.red('Invalid LTHR. Expected a number between 100-220 bpm.'));
        return;
      }
      const hrZones = calculateFrielZones(lthr);
      console.log(chalk.bold(formatHRZones(hrZones, `Friel 7-Zone, LTHR=${lthr} bpm`)));
      calculated = true;
    }

    // HRmax zones (with optional Karvonen)
    if (opts.maxHr) {
      const maxHr = parseInt(opts.maxHr, 10);
      if (isNaN(maxHr) || maxHr < 120 || maxHr > 230) {
        console.log(chalk.red('Invalid max HR. Expected a number between 120-230 bpm.'));
        return;
      }

      if (opts.restHr) {
        const restHr = parseInt(opts.restHr, 10);
        if (isNaN(restHr) || restHr < 30 || restHr > 100) {
          console.log(chalk.red('Invalid resting HR. Expected a number between 30-100 bpm.'));
          return;
        }
        const kZones = calculateKarvonenZones(maxHr, restHr);
        console.log(chalk.bold(formatHRZones(kZones, `Karvonen (HRR), Max=${maxHr}, Rest=${restHr}`)));
      } else {
        const hrZones = calculateHRmaxZones(maxHr);
        console.log(chalk.bold(formatHRZones(hrZones, `%HRmax 5-Zone, HRmax=${maxHr} bpm`)));
      }
      calculated = true;
    }

    // VDOT pace zones from 5K
    if (opts.race5k) {
      const seconds = parseTimeToSeconds(opts.race5k);
      if (seconds < 600 || seconds > 3600) {
        console.log(chalk.red('Invalid 5K time. Expected mm:ss between 10:00 and 60:00.'));
        return;
      }
      const vdot = vdotFromRace('5k', opts.race5k);
      const paces = calculateDanielsPaces(vdot);
      console.log(chalk.bold(formatDanielsPaces(paces)));

      const predictions = predictRaceTimes(vdot);
      console.log(chalk.dim('\n  Race Predictions'));
      for (const [dist, time] of Object.entries(predictions)) {
        console.log(`  ${dist.padEnd(12)} ${time}`);
      }
      console.log();
      calculated = true;
    }

    // CSS swim zones
    if (opts.css400 && opts.css200) {
      const t400 = parseSwimTime(opts.css400);
      const t200 = parseSwimTime(opts.css200);
      if (t400 <= t200) {
        console.log(chalk.red('400m time must be greater than 200m time.'));
        return;
      }
      const css = calculateCSS(t400, t200);
      const swimZones = calculateSwimZones(css);
      console.log(chalk.bold(formatSwimZones(swimZones, css)));
      calculated = true;
    } else if (opts.css400 || opts.css200) {
      console.log(chalk.red('Both --css-400 and --css-200 are required for swim zone calculation.'));
      return;
    }

    // FTP power zones
    if (opts.ftp) {
      const ftp = parseInt(opts.ftp, 10);
      if (isNaN(ftp) || ftp < 50 || ftp > 600) {
        console.log(chalk.red('Invalid FTP. Expected a number between 50-600 watts.'));
        return;
      }
      const powerZones = calculatePowerZones(ftp);
      console.log(chalk.bold(formatPowerZones(powerZones)));
      const ss = sweetSpotRange(ftp);
      console.log(chalk.yellow(`\n  Sweet Spot: ${ss.min}-${ss.max}W (88-93% FTP)`));
      console.log();
      calculated = true;
    }

    if (!calculated) {
      console.log(chalk.yellow('\n  No zone inputs provided. Use one or more of:'));
      console.log(chalk.dim('    --lthr <bpm>              Friel 7-zone heart rate zones'));
      console.log(chalk.dim('    --max-hr <bpm>            %HRmax 5-zone'));
      console.log(chalk.dim('    --max-hr <bpm> --rest-hr <bpm>  Karvonen (HR reserve) zones'));
      console.log(chalk.dim('    --race-5k <mm:ss>         VDOT pace zones'));
      console.log(chalk.dim('    --css-400 <m:ss> --css-200 <m:ss>  CSS swim zones'));
      console.log(chalk.dim('    --ftp <watts>             FTP power zones'));
      console.log();
    }
  });

// ──────────────────────────────────────────────
// Helper
// ──────────────────────────────────────────────

function wrapPrint(text: string, width: number, indent: number): void {
  const prefix = ' '.repeat(indent);
  const words = text.split(/\s+/);
  let line = prefix;
  for (const word of words) {
    if (line.length + word.length + 1 > width + indent) {
      console.log(line);
      line = prefix + word;
    } else {
      line += (line.length === indent ? '' : ' ') + word;
    }
  }
  if (line.trim()) console.log(line);
}

program.parse();

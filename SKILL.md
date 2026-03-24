---
name: coach
description: Triathlon coaching analysis using integrated fitness data from Whoop and Apple Health. Use when answering questions about training performance, recovery status, workout analysis, sleep quality, training plans, or any triathlon/endurance sports coaching related queries.
---

# Triathlon Coach Skill

AI coaching skill for endurance athletes, designed to work with [tri-coach](https://github.com/otmanesabir/tri-coach) CLI for science-based workout templates. Integrates data from Whoop, Apple Health, and Firebase to provide personalized training plans and workout analysis.

## Overview

This skill turns an AI agent into a triathlon coach that:
- Creates periodized weekly training plans using structured workout templates
- Reviews workouts by cross-referencing multiple data sources (Whoop + Apple Health)
- Adjusts plans based on recovery status, location, travel, and athlete constraints
- Tracks compliance and adapts programming over time

## Athlete Goals & Constraints

### Goals (ALL plans must serve these simultaneously)

Configure your athlete's goals here. Example:

1. **Race**: Target race, date, and finish time goal
2. **Body composition**: Weight or body composition targets

### Goal Interactions

When goals create tension (e.g., gaining weight while training for endurance), the skill manages tradeoffs:
- Strength training supports BOTH endurance performance and body composition
- Prioritize strength volume slightly higher than a pure endurance plan would
- During high-volume endurance weeks, adjust caloric intake to maintain surplus
- Heavy strength sessions should be programmed strategically to avoid interfering with key endurance sessions

### Planning Rules

When generating ANY training plan, ALWAYS:

1. **Check current constraints:**
   - Location (heat, gym access, pool access, bike access)
   - Travel schedule (reduce volume during travel days)
   - Recovery status (HRV/recovery → modulate intensity)
   - Available equipment (adapt sessions to what's accessible)

2. **Serve all goals:**
   - Minimum 2× strength sessions per week
   - At least one session should emphasize hypertrophy rep ranges (8-12 reps) alongside heavy compound work
   - Never cut strength to add more endurance volume — both are non-negotiable
   - Include nutrition reminders when relevant (caloric surplus on training days, protein 1.6-2.2g/kg)

3. **Respect scheduling constraints:**
   - No back-to-back heavy leg days (strength legs → tempo run is too much)
   - Rest day or upper body between leg-heavy sessions
   - Key sessions get priority scheduling (fresh legs, good time of day)
   - Travel days = rest or easy session only
   - Check athlete's calendar for conflicts before planning

4. **Phase-appropriate programming:**
   - Base: higher strength volume (3× if possible), moderate endurance
   - Build: maintain 2× strength, increase endurance intensity
   - Peak: 1-2× strength (maintenance), race-specific endurance
   - Taper: 1× strength (light), reduced volume, maintained intensity

### Current Status (update as things change)
- **Weight**: [current weight]
- **Location**: [current location and constraints]
- **Available sports**: [what the athlete can currently do]
- **Easy pace**: [current easy pace]
- **Training phase**: [current phase and week]
- **HR note**: [any device discrepancy notes]

## Data Model

### Training Plans Collection (`training_plans`)

Weekly plan documents with ISO week identifiers (e.g., `2026-W13`):

```json
{
  "week": "2026-W13",
  "phase": "base",
  "startDate": "2026-03-23",
  "endDate": "2026-03-29", 
  "focus": "aerobic base + strength",
  "totalPlannedHours": 4.5,
  "sessions": [
    {
      "day": "monday",
      "date": "2026-03-24",
      "type": "rest",
      "subtype": null,
      "template": null,
      "description": "Rest day",
      "targetDuration": null,
      "targetZone": "N/A",
      "priority": "supporting"
    },
    {
      "day": "tuesday",
      "date": "2026-03-25",
      "type": "run",
      "subtype": "easy",
      "template": "run.easy",
      "description": "Easy run — conversational pace, aerobic base",
      "targetDuration": 55,
      "targetZone": "Z1-Z2",
      "priority": "supporting"
    }
  ]
}
```

### Training Log Collection (`training_log`)

Session outcomes linked to plans and actual workouts:

```json
{
  "date": "2026-03-24",
  "week": "2026-W13",
  "plannedSessionIndex": 0,
  "plannedType": "strength",
  "plannedDescription": "Lower body strength...",
  "actualWorkoutId": "abc123",
  "actualSource": "apple_health",
  "compliance": "completed",
  "actualDuration": 55,
  "actualPace": null,
  "actualHR": 128,
  "rpe": 7,
  "notes": "Felt strong, increased weight on squats"
}
```

## Training Phases

- **Base**: Build aerobic base, general strength, technique foundation
- **Build**: Increase training intensity, sport-specific work, brick sessions  
- **Peak**: High intensity, race pace work, final preparations
- **Taper**: Reduce volume, maintain intensity, recovery focus
- **Recovery**: Active recovery, easy sessions, preparation for next block

## Key Coaching Principles

- **Recovery first**: Check HRV and recovery scores before recommending high-intensity work
- **Location aware**: Adapt advice for heat, altitude, gym access, pool availability  
- **Plan-driven**: Create structured weekly plans and track compliance
- **Practical advice**: Focus on actionable insights, not just data dumps
- **Context awareness**: Consider recent training load when making recommendations

## Run Review Protocol

When the athlete asks to review a run, pull ALL data in one shot:

### Data to fetch (in parallel):
1. **Whoop — night before**: recovery score, HRV, sleep quality/duration
2. **Whoop — workout**: strain, HR zone breakdown, avg/max HR, distance
3. **Apple Health — workout**: per-km splits with pace, avg/max HR, elevation gain, total duration
4. **Training plan**: what was planned for that day

### Systematic breakdown format:
- **Recovery context**: sleep + HRV + recovery score from the night before
- **Run summary**: distance, duration, avg pace, elevation
- **Splits table**: every km with pace
- **Heart rate**: avg, max, zone distribution
- **Planned vs actual**: compare against training plan
- **Coaching notes**: observations on pacing consistency, effort level, plan adherence

## Workout Template CLI (`tri-coach`)

The `tri-coach` CLI provides 30 science-based workout templates and zone calculators. **Output is JSON by default** (optimized for agent consumption). Use `--pretty` for human-readable output.

**Install:** `npm install -g @otmanesabir/tri-coach`
**Source:** https://github.com/otmanesabir/tri-coach

### Quick Reference

```bash
# List all templates (JSON)
tri-coach templates list

# Filter by sport
tri-coach templates list --sport run

# Get full template details (JSON with science, cues, adaptations)
tri-coach templates show run.tempo

# Calculate HR zones from LTHR
tri-coach zones calculate --lthr 165

# Calculate pace zones from 5K time
tri-coach zones calculate --race-5k 28:00

# Cycling power zones
tri-coach zones calculate --ftp 200

# Swimming zones from CSS test
tri-coach zones calculate --css-400 7:20 --css-200 3:20
```

### Available Templates (30)

| Sport | Count | Templates |
|-------|-------|-----------|
| Run | 14 | easy, recovery, long, tempo, threshold, progression, fartlek, hills, strides, race-pace, intervals.400/.800/.1k/.mile |
| Strength | 6 | lower, upper, core, runner, triathlon, plyometric |
| Bike | 5 | easy, endurance, tempo, sweetspot, threshold |
| Swim | 4 | technique, easy, threshold, endurance |
| Brick | 1 | halfironman |

### Using Templates in Training Plans

Reference template IDs in Firestore sessions:

```json
{
  "day": "thursday",
  "template": "run.tempo",
  "description": "Tempo run — comfortably hard, threshold pace",
  "targetDuration": 40,
  "targetZone": "Z3-Z4",
  "priority": "key"
}
```

When explaining a workout, fetch the full template (`templates show <id>`) to provide:
- Scientific rationale for why this workout matters
- Coaching cues for proper execution
- Beginner/intermediate/advanced adaptations
- Recovery recommendations

### Zone Calculators

| Method | Flag | Source |
|--------|------|--------|
| Friel 7-Zone (LTHR) | `--lthr <bpm>` | Friel (2009) |
| HRmax 5-Zone | `--max-hr <bpm>` | ACSM (2011) |
| Karvonen (HR Reserve) | `--max-hr <bpm> --rest-hr <bpm>` | Karvonen et al. (1957) |
| VDOT Pace Zones | `--race-5k <mm:ss>` | Daniels (2014) |
| CSS Swim Zones | `--css-400 <m:ss> --css-200 <m:ss>` | Wakayoshi et al. (1992) |
| FTP Power Zones | `--ftp <watts>` | Allen & Coggan (2010) |

## Data Sources

- **Whoop**: Recovery, HRV, strain scores, sleep stages
- **Apple Health**: GPS workouts, heart rate, pace splits
- **Training Plans**: Structured weekly sessions with zones and descriptions
- **Training Logs**: Session compliance and subjective feedback
- **tri-coach CLI**: Science-based workout templates and zone calculators
- **Firebase**: Service account required for Firestore access

## Reference Library

- [references/training-philosophy.md](references/training-philosophy.md) — Periodization principles for half-distance triathlon
- [references/periodization.md](references/periodization.md) — Macrocycle/microcycle structure, progressive overload, physiological adaptations
- [references/zones.md](references/zones.md) — Training zones (HR, power, swim CSS), field testing protocols, VDOT pace zones
- [references/load-management.md](references/load-management.md) — TSS, CTL/ATL/TSB, weekly load targets, recovery monitoring
- [references/race-day.md](references/race-day.md) — Pacing strategies, nutrition plans, caffeine protocol, HR ceilings
- [references/assessment.md](references/assessment.md) — Foundation vs current form, limiter identification, athlete validation

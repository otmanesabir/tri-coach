# 🏊‍♂️🚴‍♂️🏃‍♂️ tri-coach

**Science-based endurance training workout templates for triathlon, running, cycling, swimming, and strength.**

Every workout template in tri-coach is backed by peer-reviewed research — not vibes, not broscience. Each template includes the scientific rationale for *why* the workout works, citations you can actually look up, coaching cues for proper execution, and adaptations for beginner through advanced athletes.

## Why?

Most training apps give you workouts without explaining *why*. That means you can't adapt intelligently when life happens. tri-coach treats you like an adult:

- **Every template cites its sources** — Daniels, Friel, Seiler, ACSM guidelines, PubMed papers
- **Coaching cues tell you what to focus on** — not just "run 40 minutes"
- **Adaptations scale with fitness** — same template works for a first-timer and a sub-3hr marathoner
- **Zone calculators use real science** — LTHR, Karvonen, VDOT, CSS, FTP

## Install

```bash
npm install -g @otmanesabir/tri-coach
```

Or run directly:

```bash
npx @otmanesabir/tri-coach templates list
```

## Usage

### List all templates

```bash
tri-coach templates list
```

Filter by sport:

```bash
tri-coach templates list --sport run
tri-coach templates list --sport strength
tri-coach templates list --sport swim
tri-coach templates list --sport bike
tri-coach templates list --sport brick
```

### Show template details

```bash
tri-coach templates show run.tempo
tri-coach templates show strength.lower
tri-coach templates show swim.threshold
tri-coach templates show bike.sweetspot
tri-coach templates show brick.halfironman
```

Each template includes:
- Summary & scientific rationale with citations
- Warmup → Main Set → Cooldown phases
- Target zones (HR, pace, power, RPE)
- Coaching cues
- Beginner / Intermediate / Advanced adaptations
- When to use in your training cycle (base, build, peak, taper)
- Recovery recommendations

### Calculate training zones

**Heart rate zones from Lactate Threshold HR** (Friel 7-zone — gold standard):

```bash
tri-coach zones calculate --lthr 165
```

```
Zone  Name            HR Range       %Range    Description
────  ──────────────  ─────────────  ────────  ─────────────────────────────
1     Recovery        < 134 bpm      0-81%     Active recovery, warm-up/cool-down
2     Aerobic         134-147 bpm    81-89%    Aerobic base building, fat oxidation
3     Tempo           149-153 bpm    90-93%    Muscular endurance
4     Sub-Threshold   155-163 bpm    94-99%    Lactate tolerance
5     Threshold       165-168 bpm    100-102%  Lactate threshold improvement
6     VO2max          170-175 bpm    103-106%  VO2max development
7     Anaerobic       > 175 bpm      106-120%  Neuromuscular power
```

**Heart rate zones from max HR** (simpler 5-zone):

```bash
tri-coach zones calculate --max-hr 190
```

**Karvonen method** (uses heart rate reserve — more accurate than %HRmax):

```bash
tri-coach zones calculate --max-hr 190 --rest-hr 50
```

**Running pace zones from a race time** (Daniels VDOT):

```bash
tri-coach zones calculate --race-5k 28:00
```

```
VDOT: 33.5

Zone   Name          Pace/km Range       Purpose
─────  ────────────  ──────────────────  ──────────────────────────────
E      Easy          6:44 - 8:01/km      Daily running, long runs
M      Marathon      6:05 - 6:40/km      Marathon race pace
T      Threshold     5:52 - 6:09/km      Tempo runs, cruise intervals
I      Interval      5:18 - 5:31/km      VO2max intervals, 3-5min reps
R      Repetition    4:55 - 5:06/km      Speed & neuromuscular

Race Predictions
5k           28:00
10k          58:11
half         2:08:57
marathon     4:25:28
```

**Swimming zones from CSS test** (Critical Swim Speed):

```bash
tri-coach zones calculate --css-400 7:20 --css-200 3:20
```

**Cycling power zones from FTP**:

```bash
tri-coach zones calculate --ftp 200
```

## Templates (30 total)

### 🏃 Running (14)

| Template | Description | Zone | Phase |
|----------|-------------|------|-------|
| `run.easy` | Conversational-pace aerobic base | Z1-Z2 | All |
| `run.recovery` | Very easy active recovery | Z1 | All |
| `run.long` | Cornerstone endurance session | Z1-Z2 | Base, Build |
| `run.tempo` | Sustained threshold effort | Z3-Z4 | Build, Peak |
| `run.threshold` | T-pace intervals with short rest | Z4-Z5a | Build, Peak |
| `run.progression` | Start easy, finish fast | Z1→Z4 | Build, Peak |
| `run.fartlek` | Unstructured speed play | Mixed | Base, Build |
| `run.hills` | Running-specific strength | Z4-Z5 | Base, Build |
| `run.strides` | Short smooth accelerations | Neuromuscular | All |
| `run.race-pace` | Goal race pace practice | Race-specific | Peak |
| `run.intervals.400` | Short fast repeats | Z5b-Z6 | Build, Peak |
| `run.intervals.800` | Classic VO2max intervals | Z5b | Build, Peak |
| `run.intervals.1k` | Longer VO2max intervals | Z5b | Build, Peak |
| `run.intervals.mile` | Max time at VO2max | Z5b | Peak |

### 💪 Strength (6)

| Template | Description | Focus |
|----------|-------------|-------|
| `strength.lower` | Squats, RDLs, split squats | Running economy, cycling power |
| `strength.upper` | Pull-ups, rows, press | Swim power, posture |
| `strength.core` | Planks, dead bugs, Pallof press | Stability, injury prevention |
| `strength.runner` | Single-leg, hip stability | Injury prevention |
| `strength.triathlon` | Full-body for triathletes | All three sports |
| `strength.plyometric` | Box jumps, bounds | Running economy, power |

### 🏊 Swimming (4)

| Template | Description | Zone |
|----------|-------------|------|
| `swim.technique` | Drill-focused stroke work | Z1-Z2 |
| `swim.easy` | Continuous easy swimming | Z2 |
| `swim.threshold` | CSS-pace intervals | Z4 |
| `swim.endurance` | Volume building sets | Z2-Z3 |

### 🚴 Cycling (5)

| Template | Description | Zone |
|----------|-------------|------|
| `bike.easy` | Recovery spin | Z1-Z2 |
| `bike.endurance` | Long aerobic ride | Z2 |
| `bike.tempo` | Sustained moderate effort | Z3 |
| `bike.sweetspot` | 88-93% FTP intervals | Z3-Z4 |
| `bike.threshold` | FTP intervals | Z4 |

### 🧱 Brick (1)

| Template | Description |
|----------|-------------|
| `brick.halfironman` | Bike → run transition practice |

## Zone Calculation Methods

| Method | Input | Use Case | Source |
|--------|-------|----------|--------|
| **Friel 7-Zone** | LTHR | Gold standard for endurance | Friel (2009) |
| **5-Zone HRmax** | Max HR | Simple, less accurate | ACSM (2011) |
| **Karvonen** | Max HR + Rest HR | Accounts for individual differences | Karvonen et al. (1957) |
| **VDOT** | Race time | Running pace zones + predictions | Daniels (2014) |
| **CSS** | 400m + 200m TT | Swimming pace zones | Wakayoshi et al. (1992) |
| **FTP** | 20min power test | Cycling power zones | Allen & Coggan (2010) |

## Scientific Foundation

This project cites **40+ peer-reviewed papers and textbooks**. See [REFERENCES.md](./REFERENCES.md) for the full bibliography, organized by topic:

- **Training intensity distribution** — Seiler (2010), Esteve-Lanao et al. (2007)
- **Lactate threshold** — Faude et al. (2009), Billat et al. (2003)
- **VO2max development** — Midgley et al. (2006), Bacon et al. (2013)
- **Running economy** — Barnes & Kilding (2015), Paavolainen et al. (1999)
- **Strength for endurance** — Rønnestad & Mujika (2014), Beattie et al. (2014)
- **Injury prevention** — Lauersen et al. (2014), Fredericson & Moore (2005)
- **Swimming science** — Wakayoshi et al. (1992), Dekerle et al. (2002)
- **Triathlon-specific** — Bentley et al. (2007), Millet & Vleck (2000)
- **Recovery** — Dupuy et al. (2018), Menzies et al. (2010)

## Development

```bash
git clone https://github.com/otmanesabir/tri-coach.git
cd tri-coach
npm install
npm run build
node dist/index.js templates list
```

## Contributing

PRs welcome! If you add a template, please:

1. Include `scientificRationale` with explanation of the physiological adaptation
2. Add at least 2 citations from peer-reviewed sources
3. Provide `adaptations` for beginner, intermediate, and advanced athletes
4. Include `coachingCues` for proper execution
5. Specify which `trainingPhases` the workout belongs in

## License

MIT — [Otmane Sabir](https://github.com/otmanesabir)

# Sudoku Pencil v0.9.6 — Newspaper-inspired difficulty

## Install
Replace all SIX files in the existing GitHub Pages folder:
index.html, manifest.json, sw.js, engine.js, puzzles.js, README.md.
Refresh online until v0.9.6 appears. Keep site data to preserve profiles, handwriting learning, saved games and statistics.
Start a NEW puzzle to try the updated difficulty. Earlier saves keep their boards and show their original difficulty label.

## NYT-inspired calibration
These are original Sudoku Pencil puzzles. The difficulty aims for a familiar newspaper progression; it is not an official NYT rating or an exact reproduction of NYT's generator.

The direct NYT site and help page were unavailable during review. The comparison used as a design reference was James Hoss's original solver analysis, published by SudokuPulse, February 25, 2026:
https://sudokupulse.com/articles/sudoku-difficulty/
That analysis reports basic box scanning for NYT Easy and a broader mix of singles, pairs, locked candidates and occasional triples for Medium and Hard. It is a sample analysis by another puzzle maker, not NYT's published specification.

Our rules (chosen for this app, not claimed to be NYT thresholds):
- Easy: 38 givens; solved by full-house placements and hidden singles in boxes only.
- Medium: requires row/column singles, naked singles or limited intermediate eliminations. Fewer than four locked-candidate/pair eliminations and no triples in this solver's path.
- Hard: fully solved with supported logical techniques, requiring at least four intermediate eliminations or a naked triple.
- Expert: an extra tier, beyond the three newspaper levels, for puzzles this logical grader cannot finish.

Medium and Hard are completely solved by logical deductions in the grader; no search steps are used to finish them. A backtracking solver is used separately to create solutions and verify uniqueness. These thresholds measure one solver's path, not all possible human approaches. Perceived difficulty can overlap and needs playtesting.

## Generator
64 verified seeds (16 per tier), based on randomized backtracking grids. New games transform digit labels and Sudoku-preserving row/column layouts, then regrade the result. This preserves uniqueness and keeps generation fast/offline. Variants from a seed share related underlying logic; the seed bank does not provide unlimited independent structures.

The grader now prioritizes full houses and box scanning, and supports row/column hidden singles, naked singles, locked candidates, naked pairs, hidden pairs and naked triples. Each transformed board must match its selected tier.

## Writing and saved games
The v0.9.5 cell-change writing flow is unchanged. Keep writing in a cell without a countdown. Selecting a different cell saves strong personal matches; uncertain digits remain for confirmation. Finish digit also works for the final answer. Always confirm remains optional.
Profiles, existing games, training, notes, pause, completion and statistics remain supported.

## Verification
400 generated variants (100 per tier) are checked with an independent uniqueness solver, tier assertions and candidate eliminations checked against their known solutions.
Browser regression tests cover long writing pauses, cell departure, strong/uncertain recognition, persistent ink, settings, and last-digit completion. These desktop checks cannot establish an exact subjective match to NYT or replace iPad playtesting.

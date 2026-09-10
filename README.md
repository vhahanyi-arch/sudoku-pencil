# Sudoku Pencil v0.9.5 — Write at your pace

## New writing flow
There is no Pencil-up recognition timer. All strokes remain editable while you stay in their cell, however long you pause. Selecting a DIFFERENT cell finishes the previous digit: a strong personal match is saved, while an uncertain match remains marked in amber for confirmation. Mistake checking still rejects incorrect answers and preserves their ink.

Tap Finish digit to finish without leaving the cell, especially on your last answer. You can also explicitly confirm a number using the number strip at any time. Tapping the same cell does not finalize it. Leaving a cell does not train the recognizer automatically; explicit digit confirmations teach your profile.

This update enables Save strong matches on cell change for existing profiles on first use. Always confirm remains available under Writing & display settings and will be remembered after you choose it. Pausing, switching profiles or reloading preserves pending ink without committing it. Select that cell to continue writing.

Browser tests verify long inter-stroke pauses, same-cell taps, confident and uncertain departure, Finish digit, final puzzle completion, persisted settings and pending ink. Physical Apple Pencil testing is still needed.


## Install
Upload all SIX files in this ZIP to the same GitHub Pages folder:
index.html, manifest.json, sw.js, engine.js, puzzles.js and README.md.
The two new JavaScript files are required. Refresh online until v0.9.5 appears.
Do not clear browser data: existing profiles, handwriting samples, games and statistics use the same storage keys.

## Difficulty
New puzzles are graded by a deterministic logical solver, rather than by clue count.

| Level | Requirement |
|---|---|
| Easy | Solved entirely with naked singles: a cell has just one candidate. |
| Medium | Needs hidden singles: a digit has only one possible cell in a row, column or box. |
| Hard | Needs locked candidates and/or naked pairs, and is solved using those techniques plus singles. |
| Expert | Remains unresolved after singles, locked candidates and naked pairs. |

Expert means beyond the techniques implemented by this grader. It does not mean guessing is necessary, nor certify any particular advanced technique. Ratings are app-specific, not a universal measure of human difficulty. Solver order and the techniques it supports affect the classification.

## Generation and variety
The release includes 48 verified seeds, 12 per level, created from randomized backtracking solution grids. New games shuffle digits, rows within bands, columns within stacks, bands and stacks, and may transpose the board. These transformations preserve a unique solution. Every generated variant is regraded before display so it matches the selected tier. The previous identical board is avoided during normal generation.

The seed bank keeps generation fast and offline. Variants of one seed retain related logical structure: this is not an unlimited source of structurally independent puzzles.

Existing saved games are preserved and display “Earlier puzzle · original difficulty label.” Start a new puzzle to use the new grading.

## Verification
- 400 generated variants, 100 per tier: all matched their grading rules and were distinct within each sampled tier.
- A separate solver confirmed exactly one solution for each of the 400 puzzles.
- Solution consistency checked against each puzzle's givens.
- Browser checks covered all four difficulty buttons, their displayed grade, new offline puzzle generation, final-answer completion, frozen timer, saved completion, editing locks and statistics recorded once.
- These checks ran on desktop Edge. iPad speed and perceived difficulty still need playtesting.

## Existing features
Personal handwriting setup, per-profile learning, persistent short Pencil strokes, confirmation controls, candidate notes, mistake outlines, matching-digit highlights, pause/resume and completion checks remain.
Always confirm lets you finish all strokes before committing a number.

# Sudoku Pencil v0.9.9 — iPad layout

## Install
Upload all SEVEN files to the same GitHub Pages folder:
index.html, manifest.json, sw.js, engine.js, puzzles.js, backup.js, README.md.
Refresh online until v0.9.9 appears. Do not clear site data: profiles, saved games and handwriting training use the same storage.

## What changed
This release implements the first of the three planned usability improvements: keeping the board and everyday controls together.
- Portrait: Notes, Erase cell, Finish digit and Pause sit directly below the board.
- Landscape tablet: controls and digit confirmation sit beside the board.
- The board sizes to the available viewport height, including safe-area spacing.
- Space for confirmation is reserved so writing does not make the board jump.
- Menu contains New puzzle, Correct digit, Check completion, Reload saved game, Stats, Profiles, and Writing & display settings.
- The active profile selector, difficulty choices and timer remain visible.

Use Menu → Profiles for handwriting practice and Backup & restore. Use Menu → Writing & display settings to change recognition, mistake checking or matching-digit emphasis.
The Notes mode indicator redesign and entry-review improvements are planned for later releases, not included here.

## Verification and limits
Browser viewport tests passed at 768×1024, 820×1180, 1024×768, 1180×820, 600×900 and 390×844. The board, four primary controls and open confirmation panel were all within the viewport. Tests checked a square board, stable positioning when confirmation changes, at least 44px control heights, and menu routes to statistics, settings, profiles, backup and new puzzles.
Writing and final-answer completion regression tests were also run. Desktop emulation does not replace physical iPad/Safari testing. Very short windows, the onscreen keyboard or larger text settings may still require scrolling; the board is not shrunk below 300px just to force a fit.

## Existing features
Cell-change recognition, multi-stroke handwriting, personal practice, notes, profile backups and restore, completion checks and the newspaper-inspired difficulty generator remain in place. NYT-inspired difficulty is approximate and is not an official NYT rating.

Backup export produces a manual JSON file; restore adds separate profiles rather than replacing existing ones. Keep backups in Files, iCloud Drive or another safe location. No automatic cloud sync is provided.

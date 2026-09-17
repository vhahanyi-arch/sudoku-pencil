# Sudoku Pencil v0.9.10 — Larger grid

## Install
Upload all seven files to the same GitHub Pages folder: index.html, manifest.json, sw.js, engine.js, puzzles.js, backup.js and README.md.
Refresh online until v0.9.10 appears. Do not clear site data: profiles, learning and saved games use the same storage. Back up profiles before updating as a precaution.

## Grid size
Larger grid is now the default in portrait and landscape. Portrait uses available width up to 820px; landscape keeps controls beside the wider board. Lower cells or confirmation controls may require scrolling. Scroll from beside the board, since the board itself captures handwriting.

Menu → Writing & display settings → Grid size:
- Larger grid: more room for Pencil writing.
- Fit everything: the previous compact layout, intended to keep the board and everyday controls together on typical tablet screens.

The choice is saved per profile and included in new backups. Older profiles and backups default to Larger grid until you choose otherwise. Changing size does not erase handwriting or start a new puzzle. The installed app no longer requests portrait-only orientation.

## Preserved features
Multi-stroke handwriting, cell-change recognition, personal practice, notes, mistake checking, matching-digit emphasis, backup/restore, pause/resume, completion detection, stats and difficulty generation remain unchanged. Newspaper-inspired difficulty ratings are approximate, not official NYT ratings. The Notes-mode redesign and unresolved-entry review remain deferred.

## Testing and limits
Desktop browser checks cover six viewport sizes, both orientations, square grids, no horizontal overflow, reachable controls, settings persistence and preserved game cells/learning. Handwriting and final-answer completion regression tests pass. Physical iPad/Apple Pencil testing is still needed. Larger text, browser bars or the onscreen keyboard can require extra scrolling.

Profile backup is manual JSON export; restore adds separate profiles without replacing existing ones. No automatic cloud sync is provided.

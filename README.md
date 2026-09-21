# Sudoku Pencil v0.9.12 — Screenshot daily challenges

## Install
Upload all TEN files to the same GitHub Pages folder:
index.html, manifest.json, sw.js, engine.js, puzzles.js, backup.js, screenshot.js, imports.js, import-worker.js and README.md.

Refresh online until v0.9.12 appears. Keep site data so profiles, handwriting learning and saved puzzles remain available. A profile backup before updating is recommended.

## Import a daily challenge
1. Open Menu → Daily challenges / Import.
2. Choose a PNG, JPEG or WebP screenshot of an unplayed Sudoku in light mode, showing only original givens.
3. Tap the top-left outer corner of the puzzle, then the bottom-right outer corner. The green rectangle should match all four edges. If the image is already cropped precisely to the grid, use Use whole image.
4. Tap Read digits. Compare every cell in the editable preview against the screenshot. Tap to correct a digit, or delete it to leave a blank. Amber cells are uncertain readings; other cells still need checking.
5. Set a name, challenge date and the difficulty shown on the original puzzle. Tick the review box, then tap Check & play.

The app rejects conflicting givens, puzzles with no solution, puzzles with multiple solutions and fully filled grids. It never adds or changes givens to force a valid puzzle. You can also enter all givens manually in the preview.

The first version uses a local printed-digit reader. Clear, upright screenshots work best. Reading accuracy can vary with font, image quality and crop alignment. Preview review is required even when the grid passes the solution check: a valid grid could still differ from the screenshot.

## Play and resume
Imported challenges use your profile's handwriting recognition, notes, mistake checking, timer and pause/resume. The import screen pauses an active game; cancelling returns to its earlier pause state.

Open Daily challenges / Import again to resume a saved challenge. Imports are saved per profile and survive reload. Re-importing the same grid with the same date resumes its existing game.

To return to a generated puzzle, choose a difficulty above the board. Its existing saved game resumes when available. Generated difficulty statistics and imported completion counts are separate. Imported difficulty labels are entered by you and are not regraded.

## Privacy, offline use and backups
Images are read on your device. No upload service, API key or NYT account connection is used. Only the recognized grid, metadata and game progress are saved; the screenshot is not retained. There is no automatic daily fetching or sharing.

After the updated app has loaded online and its files are cached, imports can work offline. If the checker fails to load, refresh online.

Profile backups now include imported games. New exports use backup format 2 and need v0.9.12 or later to restore. Older format 1 backups remain supported. Restore adds separate profiles and does not replace existing profiles. There is no automatic cloud sync.

## Existing features
Larger grid and Fit everything options, visible Notes mode, multi-stroke handwriting, personal practice, profile learning, completion checks and generated puzzle difficulties remain available. The planned unresolved-entry review is still deferred.

## Verification
Browser checks cover screenshot selection and corner cropping, recognition of a generated screenshot fixture, additional printed fonts, manual corrections, invalid/unsatisfiable/multiple-solution rejection, save/reload, cancellation timing, generated-game preservation, backup compatibility and imported completion without changing generated statistics. Existing handwriting, Notes mode and layout checks also pass.

These are desktop browser tests with constructed screenshot fixtures, not validation against a user-provided NYT screenshot or a physical iPad/Apple Pencil. Please review your first real import carefully. This is an independent app, not affiliated with NYT.

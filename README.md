# Sudoku Pencil v0.9.20 — Quicker NYT import

## Install
Upload all EIGHTEEN files to the same GitHub Pages folder:
index.html, manifest.json, sw.js, engine.js, puzzles.js, backup.js, screenshot.js, imports.js, import-worker.js, README.md, libre-franklin.woff2, old-standard-bold.woff2, patrick-hand.woff2, architects-daughter.woff2, bitter.woff2, apple-touch-icon.png, icon-192.png and icon-512.png.

Refresh online until v0.9.20 appears in the top-right corner. New uploads show on the next online launch. You don't need to upload PRODUCT.md, DESIGN.md, the .impeccable folder or the .claude folder; they are design notes and local test settings.

## Quicker NYT import (new in v0.9.20)
You no longer need to tap the puzzle's corners. Once you choose or paste a screenshot, the app finds the grid by itself and reads the digits straight away. The green rectangle shows what it found. If it misses an edge, tap the corners as before.

Fastest way on iPad, without the screenshot going into Photos:
1. Open the puzzle in the NYT Games app (light mode, unplayed) and take a screenshot.
2. Tap the screenshot preview in the corner, tap **Done**, then **Copy and Delete**.
3. In Sudoku Pencil, open Menu → Daily challenges / Import and tap **Paste screenshot**. Tap **Paste** if the iPad asks.
4. Check the preview against the puzzle, tick the box, and tap Check & play.

Choosing a screenshot from Photos or Files still works. With a keyboard, ⌘V / Ctrl+V also pastes. The digit reader also got better at NYT screenshots: it ignores the orange highlighted square and the thick outer border, which it could misread before. Checking the preview stays required: the app never adds or changes givens itself.

## Matching numbers stand out (new in v0.9.19)
When you select a square with a number, every other copy of that number is now circled and gets a stronger highlight, in every style, light and dark. The circle only ever means "same number": the selected square and mistakes still use square outlines, so they can't be mixed up. Numbers and notes stay as readable as before. Turn it off with Menu → Writing & display settings → Highlight matching digits.

Also fixed: on some iPads in landscape (for example 1024 × 768), the Expert tab was cut off after the Today tab was added.

## Puzzle of the day (new in v0.9.18)
Tap **Today**, the first tab beside Easy to Expert. Everyone gets the same puzzle that day, on every profile and on every device running this version, so the family can compare times. It's made on the device from the date, so it needs no internet and nothing is downloaded.
- It gets harder through the week, like a newspaper: Easy on Monday and Tuesday, Medium on Wednesday and Thursday, Hard from Friday to Sunday.
- It saves, resumes and backs up like any other game. Notes, undo, Fill notes and mistake checking all work as usual.
- When you finish, the message ranks everyone who has solved today's puzzle and names who still has to. Menu → Stats shows the same list, plus your Puzzle of the day count, best and average.
- A new puzzle appears at midnight. Unfinished earlier ones stay in Menu → Daily challenges / Import for a week, then are removed. Your solved times are kept.
- New puzzle from the Menu takes you back to your usual level.
- Stats now lists imported screenshot challenges as "Imported" (they were "Daily").

## Use it as an app (new in v0.9.17)
The app now has a proper Home Screen icon: a printed Sudoku box with a handwritten 7 in a highlighted square.

On iPad, each browser and the Home Screen app keep separate saved data, so move your profiles over with a backup:
1. In the browser you have been playing in (for example Chrome), open Menu → Profiles → Backup & restore, set Profiles to back up to **All profiles**, tap Download backup, and save the file to Files or iCloud Drive.
2. Open the game in Safari, tap Share → Add to Home Screen (switch on Open as Web App if shown) → Add.
3. Open Sudoku Pencil from the Home Screen, then Menu → Profiles → Backup & restore → Restore from a backup file, and choose the saved file. Your profiles are added beside the new app's empty "My profile", which you can then delete.
4. From then on, open it from the Home Screen icon. It runs full screen and works offline.

## Styles (new in v0.9.16)
Menu → Style. Each profile remembers its own style, and every style has a light and a dark version (Menu → Appearance). The squares are exactly the same size in every style, so writing room never changes.
- **Newspaper**: the printed daily-paper puzzle page from v0.9.15.
- **Classic**: the previous rounded, warm-paper look, light and dark.
- **Chalkboard**: chalk lettering on a green slate in a wooden frame. At night it's a black slate.
- **Graph-paper notebook**: squared paper in a draftsman's hand. Givens are in black pen, typed answers in blue pen and notes in pencil. At night it turns into a blueprint.
- **Wooden board**: an oak board on a maple table, with the givens on raised ivory tiles. Mistakes are crimson so they stand out from the wood. At night it's walnut.
- **Calm**: soft slate-blue with rounded corners, no heavy black lines and lighter type, for relaxed play.

Every style keeps the same marks: a highlighted selected square, matching numbers, notes, mistakes and an underline for handwriting waiting for confirmation. All colours meet contrast guidelines in every style.

## The newspaper look (new in v0.9.15)
The whole app is now set like the puzzle page of a printed daily paper:
- A masthead with today's date over a thick-and-thin rule, and the difficulty levels as section tabs, with the current one printed in reverse.
- Each generated puzzle has its own number ("No. 5,563") and difficulty marks. On an iPad, the board and tools sit in ruled columns.
- The grid is printed in black ink on newsprint. Your marks look like a reader's marks: yellow highlighter for the selected square, pale-green highlighter for matching numbers, blue pencil for notes, red pen for mistakes and an amber underline for handwriting still waiting for confirmation. Typed answers are in blue-black pen.
- In number-pad mode, each key shows how many of that number are left. The key is struck through once all nine are placed.
- Results (Menu → Stats) is a ruled table of solved counts, best and average times, including daily challenges.
- Dark mode is the same page at night.
- The squares are exactly the same size as before in both grid settings.

Type: Libre Franklin, Old Standard TT, Patrick Hand, Architects Daughter and Bitter, all under the SIL Open Font License 1.1 (Libre Franklin © The Libre Franklin Project Authors; Old Standard TT © Alexey Kryukov; Patrick Hand © Patrick Wagesreiter; Architects Daughter © Kimberly Geswein; Bitter © The Bitter Project Authors). They ship beside the app so it works offline.

## Number pad (new since v0.9.12)
Open Menu → Enter numbers by → Number pad. Select a cell, then tap a number below the board. With Notes on, tapping a number adds that note, and tapping it again removes it. Each key shows how many of that number are left and is struck through once all nine are placed. You can type over an answer without erasing it first. Typed answers appear in blue so they stand out from the givens. The setting is saved per profile and included in backups.

With a hardware keyboard, use 1–9 to enter, arrow keys to move, Backspace or Delete to erase and N to switch Notes. This works in both input modes. Switch back to Handwriting at any time. Existing handwritten entries are kept.

## Undo and redo (new since v0.9.12)
Undo sits beside Notes. Redo is in the Menu. Both cover answers, notes, erasing and every handwriting stroke, so you can take back one stroke at a time. With a keyboard, use Ctrl/⌘+Z to undo and Ctrl/⌘+Shift+Z or Ctrl+Y to redo. History lasts for the current game only and resets when you change puzzle, profile or reload.

## Fill notes (new since v0.9.12)
Menu → Fill notes puts every possible number into each empty cell as small typed notes. A number counts as possible if it isn't already in that cell's row, column or box. Cells where you've already written notes keep yours, and only lose notes that are now impossible, so your eliminations survive. Placing an answer removes that number from the notes in its row, column and box. One Undo reverts the whole fill. Candidates are based on the board as it stands. If mistake checking is off and the board has a wrong answer, some candidates can be wrong too.

## Dark mode (new since v0.9.12)
Menu → Appearance: Match device (default), Light or Dark. Match device follows the iPad's Light/Dark setting, including the automatic switch at sunset. Dark mode uses warm charcoal "paper", light ink for your handwriting, light-blue typed answers and a dimmed amber highlight for matching digits. The setting is saved per profile and included in backups. Handwriting recognition works the same in both themes.

The screenshot importer still needs a **light-mode** screenshot of the puzzle, whatever theme this app uses.

## Other changes since v0.9.12
- Placing an answer clears that cell's notes. Undo brings them back.
- Erase removes the answer first and keeps notes. Tap Erase again to clear the notes.
- In Notes mode, writing or tapping a number that is already a note removes it.
- Saves are grouped together and written immediately when the app is hidden or closed. Handwriting is stored more compactly, and existing saves are compacted once on first load.
- If browser storage fills up, a warning appears instead of moves silently going unsaved. Download a backup if you see it.
- Pinch-zoom works again outside the board.
- The offline copy only stores successful downloads, so a half-finished upload can't break it.
- Finishing an imported challenge now names the puzzle in the completion message.
- Motion polish: buttons shrink slightly when pressed, dialogs and the pause screen fade in, and solving a puzzle sends a wave across the grid before the completion dialog. Selecting cells, entering numbers and writing stay instant. Reduce Motion on iPad turns off the movement and keeps the fades.

The rest of this file describes v0.9.12 features, which are unchanged. Keep site data so profiles, handwriting learning and saved puzzles remain available. A profile backup before updating is recommended.

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

# Sudoku Pencil v0.9.3 — Completion fix

Upload the four files in this release to the existing Pages location. Refresh until v0.9.3 appears. The notes below describing v0.9.2 remain as change history.

## Completion

Completion checks all rows, columns and boxes after a final answer and when resuming saved games. Confirmed complete games freeze the timer, disable editing and record statistics once. Check completion locates unconfirmed or empty cells; a visually full board with pending handwriting is not yet complete. The remaining-cell counter now updates after entries. Browser tests cover final confirmation, frozen time, editing locks, reload, duplicate-stat prevention and repairing completed legacy saves.

## Difficulty review — September 10, 2026

Difficulty generation is unchanged in this release. Labels are currently driven by target clue counts, not the computed logical score. The logical solver handles naked singles and hidden singles, then adds a penalty for unresolved cells. It does not assess advanced techniques.

A random sample of 30 puzzles per level produced:

| Level | Clues | Score range | Median score |
|---|---|---|---|
| Easy | 42 | 39–39 | 39 |
| Medium | 34 | 47–69 | 47 |
| Hard | 29 | 52–537 | 68 |
| Expert | 25–26 | 64–645 | 306 |

All 120 puzzles had exactly one solution. These are sample results, not fixed boundaries or human difficulty ratings. Hard and Expert overlap substantially. Recommended future change: grade generated puzzles by required techniques (singles, hidden singles, locked candidates, pairs and harder techniques), accept only puzzles matching a defined tier, and validate those tiers through playtesting. The current generator also begins from permutations of a patterned solution grid, limiting structural variety.

## Short-stroke fix

Pencil contacts and short moving strokes are now kept when you lift the Pencil, on both the board and the training canvas. A small starting mark for 1 or 7 is no longer discarded by the whole-digit length check. Stationary Pencil dots are rendered and saved too. Finish your digit, then tap its number to confirm. For unrestricted pauses between strokes, leave Recognized answers set to Always confirm.

Upload the four files from this archive and refresh until v0.9.2 appears. Existing profiles and saves remain in place. Tested with browser-emulated pen input; physical iPad Pencil behavior still needs your feedback.

Upload index.html, manifest.json, sw.js and README.md to the same GitHub Pages repository and path as before. Open the site online and refresh; check for v0.9.2 in the header. Existing v0.9 profiles, learning, games and stats use the same storage key. Do not clear site data when upgrading. Keep a copy of your previous release.

## Writing

Write your complete digit, including all strokes, then tap its number in the confirmation strip. This is now the default for each profile. Your handwriting stays visible and is saved while awaiting confirmation. Each confirmed example teaches that profile. Saved answers remain locked until erased.

Writing & display settings offers optional Auto-save strong matches. Uncertain matches still require confirmation. Recognition uses personal examples, tolerates small positional shifts, and can use the first corrected sample. Printed-font examples remain a fallback. There is no cloud service, trained neural model or guaranteed recognition accuracy; actual improvement needs testing with your handwriting.

The second-stroke timer is cancelled on Pencil-down. Taps no longer become digits, pending strokes remain visible, and queued recognition is cancelled when changing games/profiles, pausing, or erasing. Notes are checked as candidate notes rather than as final answers.

## Personal handwriting setup

In Profiles choose Redo handwriting setup. Write 1 through 9 twice each. Tap Use this sample only when the complete digit is on screen. Clear retries the current sample. Skipping leaves previous learning intact; new examples replace it only when all 18 samples are accepted. Games and statistics are preserved.

## Display

Darker printed digits, a green selection outline, gold matching-digit emphasis, an amber pending-ink marker, and persistent red mistake outlines retain the cream-paper appearance. Settings are collapsible and controls fit narrow screens.

## Verification

Desktop Chromium/Edge automated checks cover taps, two strokes including a held second stroke, visible pending ink, explicit confirmation, stored corrections, saved-cell protection, skipped training, profile isolation, manual pause and narrow-screen layout. These checks do not substitute for testing Pencil pressure, palm rejection or recognition accuracy on your iPad.

Unique-solution puzzle generation and the existing difficulty heuristic remain. Data stays in this browser/device; profiles are not online accounts and do not sync across devices.

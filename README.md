# Sudoku Pencil v0.9.1 — Ink & clarity

Upload index.html, manifest.json, sw.js and README.md to the same GitHub Pages repository and path as before. Open the site online and refresh; check for v0.9.1 in the header. Existing v0.9 profiles, learning, games and stats use the same storage key. Do not clear site data when upgrading. Keep a copy of your previous release.

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

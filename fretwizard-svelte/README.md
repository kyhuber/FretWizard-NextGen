

*Svelte Components*
- app
- InstrumentSetup
  - Defines: selectInstrument, continueToScaleVisualizer, togglePanel
- ScaleVisualizer
  - Imports: populateFretboard, calculateDots
  - Defines: updateFretboard, updateDotPositions, shouldDisplayDot
- TuningSelector
- fretboard.svelte
  - Defines: updateFretboardNotes
- fretboard.js
  - Defines: calculateDots, findStringForNote, getNoteForPosition, getsNextNoteInScale

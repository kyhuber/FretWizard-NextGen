// Import the static data
import staticData from '../static_data.json';

// Define constant for number of frets
const NUM_FRETS = 24;

// Function to populate the fretboard with an array representing notes on each string
export function populateFretboard(instrument, tuning, selectedKey, selectedScaleType) {
    let fretboard = [];

    // Check if all required input is provided
    if (!instrument || !tuning || !key || !scaleType) {
        return [];
    }

    // Get the number of strings for the instrument
    const numStrings = staticData.instrumentStrings[instrument];

    // Get the tuning data
    const tuningOptions = staticData.tuningOptions[instrument];
    const selectedTuningData = tuningOptions.find(option => option.name === tuning);

    // Get the scale intervals for the selected scale type
    const scaleIntervals = staticData.scaleIntervals[scaleType];

    // Iterate through the frets and strings to populate the fretboard
    for (let stringIndex = 0; stringIndex < numStrings; stringIndex++) {
        const openNote = selectedTuningData.notes[stringIndex];
        const stringNotes = [openNote];

        for (let fretIndex = 1; fretIndex <= NUM_FRETS; fretIndex++) {
            const prevNote = stringNotes[fretIndex - 1];
            const interval = scaleIntervals[(fretIndex - 1) % scaleIntervals.length];
            const nextNoteIndex = (staticData.allNotes.indexOf(prevNote) + interval) % 12;
            const nextNote = staticData.allNotes[nextNoteIndex];
            stringNotes.push(nextNote);
        }

        fretboard.push(stringNotes);
    }

    return fretboard;
}

// Function to calculate the positions of dots on the fretboard based on the selected key and scale
export function calculateDots(key, scale) {
    const scaleIntervals = staticData.scaleIntervals[scale];
    const dotPositions = [];
    let currentNote = key;
    let currentFret = 0;

    for (const interval of scaleIntervals) {
        currentFret += interval;
        const stringIndex = findStringForNote(currentNote, scaleIntervals);
        const noteAtPosition = getNoteForPosition(stringIndex, currentFret, scaleIntervals);

        if (noteAtPosition !== undefined) {
            dotPositions.push({ string: stringIndex, fret: currentFret });
        }

        currentNote = getNextNoteInScale(currentNote, interval);
    }

    return dotPositions;
}

// Helper functions
function findStringForNote(note, tuning) {
    const notes = tuning;
    return notes.indexOf(note);
}

function getNoteForPosition(stringIndex, fretIndex, allNotes) {
    const noteInfo = allNotes[stringIndex] && allNotes[stringIndex][fretIndex];
    return noteInfo || '';
}

function getNextNoteInScale(currentNote, interval) {
    const allNotes = staticData.allNotes;
    const currentIndex = allNotes.indexOf(currentNote);
    const nextIndex = (currentIndex + interval) % allNotes.length;
    return allNotes[nextIndex];
}
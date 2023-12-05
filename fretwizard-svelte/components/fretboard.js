// Import the static data
import staticData from '../static_data.json';

// Define constants
const NUM_FRETS = 24; // Maximum number of frets for any instrument

// Initialize variables for user input
let selectedInstrument = '';
let selectedTuning = '';
let selectedKey = '';
let selectedScaleType = '';
let numStrings = ''

// Initialize variables for fretboard 
let fretboard = [];

// Function to populate the fretboard
function populateFretboard() {
  // Clear the existing fretboard data
  fretboard = [];

  // Check if all required input is provided
  if (!selectedInstrument || !selectedTuning || !selectedKey || !selectedScaleType) {
    return;
  }

  // Get the instrument data
  const instrumentData = staticData.instrumentStrings[selectedInstrument];
  NUM_STRINGS = numStrings;

  // Get the tuning data
  const tuningOptions = staticData.tuningOptions[selectedInstrument];
  const selectedTuningData = tuningOptions.find(option => option.name === selectedTuning);

  // Get the scale intervals for the selected scale type
  const scaleIntervals = staticData.scaleIntervals[selectedScaleType];

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
}

// Function to calculate the positions of dots on the fretboard based on the selected key and scale
function calculateDots(key, scale) {
    // Define the intervals for the selected scale
    const scaleIntervals = staticData.scaleIntervals[scale];

    // Initialize an array to store dot positions
    const dotPositions = [];

    // Initialize variables to keep track of the current note and fret
    let currentNote = key;
    let currentFret = 0;

    // Loop through the scale intervals to calculate dot positions
    for (const interval of scaleIntervals) {
        // Calculate the next fret based on the interval
        currentFret += interval;

        // Calculate the string and note for the current position
        const stringIndex = findStringForNote(currentNote);
        const noteAtPosition = mapNoteAtPosition(stringIndex, currentFret);

        // If the note is found, add it to the dot positions
        if (noteAtPosition !== "undefined") {
            dotPositions.push({ string: stringIndex, fret: currentFret });
        }

        // Update the current note based on the interval
        currentNote = getNextNoteInScale(currentNote, interval);
    }

    return dotPositions;
}

// Function to find the string index that corresponds to a note
function findStringForNote(note) {
    if (selectedInstrument in tuningOptions) {
        const notes = tuningOptions[selectedInstrument];
        return notes.indexOf(note);
    }
    return -1;
}

// Function to get the next note in the scale based on the current note and interval
function getNextNoteInScale(currentNote, interval) {
    const allNotes = staticData.allNotes;
    const currentIndex = allNotes.indexOf(currentNote);
    const nextIndex = (currentIndex + interval) % allNotes.length;
    return allNotes[nextIndex];
}

// Function to get any note at position
function getNoteForPosition(stringIndex, fretIndex) {
  const noteInfo = fretboardNotes.find(note => note.string === stringIndex && note.fret === fretIndex);
  return noteInfo ? noteInfo.note : '';
}

// Event listener for when user selects an instrument
function handleInstrumentChange(event) {
  selectedInstrument = event.target.value;
  populateFretboard();
}

// Event listener for when user selects a tuning
function handleTuningChange(event) {
  selectedTuning = event.target.value;
  populateFretboard();
}

// Event listener for when user selects a key
function handleKeyChange(event) {
  selectedKey = event.target.value;
}

// Event listener for when user selects a scale type
function handleScaleTypeChange(event) {
  selectedScaleType = event.target.value;
  populateFretboard();
}

// Initialize the fretboard when the page loads
populateFretboard()
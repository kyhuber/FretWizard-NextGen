<!-- Fretboard.svelte -->
<script>
    import { onMount } from "svelte";
    import { Router } from 'svelte-routing';
    import { populateFretboard, calculateDots, getNoteForPosition } from "./fretboard.js"

    export let selectedInstrument;
    export let selectedTuning;
    // export let selectedKey;
    // export let selectedScale;
    export let NUM_FRETS = 18;
    export let NUM_STRINGS = 6;

    let fretboardNotes = [];
    let tuningOptions = {};

    // Function to update the fretboardNotes array
    function updateFretboardNotes() {
    // Clear the existing fretboardNotes array
    fretboardNotes = [];

        // Loop through the frets and strings to populate the fretboardNotes array
        for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
            for (let fretIndex = 0; fretIndex <= NUM_FRETS; fretIndex++) {
                // Calculate the note at this position based on the instrument and tuning
                const noteAtPosition = populateFretboard(selectedInstrument, selectedTuning, stringIndex, fretIndex);

                // Push the note to the fretboardNotes array
                fretboardNotes.push({ string: stringIndex, fret: fretIndex, note: noteAtPosition });
            }
        }
    }

    // Call the updateFretboardNotes function when the component mounts and whenever selectedInstrument or selectedTuning changes
    onMount(updateFretboardNotes);
    $: {
        updateFretboardNotes();
    }

    $: {
        if (selectedInstrument) {
            tuningOptions = staticData.tuningOptions[selectedInstrument] || {};
        }
    }

    setContext('fretboardNotes', fretboardNotes);

    onMount(updateFretboardNotes);
    $: {
        updateFretboardNotes()
    }
</script>

<div class="fretboard">
    <!-- Create a table to represent the fretboard -->
    <table class="fretboard-table">
        <thead>
            <!-- Create a row for fret numbers -->
            <tr>
                {#each Array(...Array(NUM_FRETS + 1)) as index}
                    <th>{index}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
                <!-- Create rows for strings and display notes -->
                {#each Array(NUM_STRINGS) as stringIndex}
                <tr>
                    <th>{selectedTuning[stringIndex]}</th>
                    {#each Array(NUM_FRETS + 1) as fretIndex}
                        <td>{getNoteForPosition(stringIndex, fretIndex)}</td>
                    {/each}
                </tr>
                {/each}         
        </tbody>
    </table>
</div>

<!-- Fretboard.svelte CSS -->
<style>
.fretboard {
    position: relative;
}

/* Style the fretboard table */
.fretboard-table {
    border-collapse: collapse;
}

/* Style the table cells */
.fretboard-table td {
    width: 40px; /* Adjust the cell width as needed */
    height: 20px; /* Adjust the cell height as needed */
    border: 1px solid #000; /* Add cell borders */
    text-align: center; /* Center-align the content */
    vertical-align: middle; /* Vertically center-align the content */
}

/* Style the dot */
/* .dot {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    margin: auto;
} */
</style>
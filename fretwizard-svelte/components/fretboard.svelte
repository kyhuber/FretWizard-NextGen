<!-- Fretboard.svelte -->
<script>
    import { onMount } from "svelte";
    export let selectedInstrument;
    export let selectedTuning;
    export let selectedKey;
    export let selectedScale;
  
    let fretboardNotes = [];
  
    // Function to update the fretboardNotes array
    function updateFretboardNotes() {
      // Clear the existing fretboardNotes array
      fretboardNotes = [];
  
      // Loop through the frets and strings to populate the fretboardNotes array
      for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
        for (let fretIndex = 0; fretIndex <= NUM_FRETS; fretIndex++) {
          // Calculate the note at this position based on the instrument and tuning
          const noteAtPosition = mapNoteAtPosition(stringIndex, fretIndex, selectedInstrument, selectedTuning);
  
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
  
    function calculateDots(key, scale) {
      // Calculate dot positions based on the selected key and scale
      // You'll need logic to determine which frets and strings correspond to the selected notes in the scale
      // Return an array of objects with x and y coordinates for each dot
      return [
        { string: 0, fret: 0 }, // Example dot position
        // Add more dot positions as needed
      ];
    }
  
    setContext('fretboardNotes', fretboardNotes);
  </script>
  
  <div class="fretboard">
    <!-- Create a table to represent the fretboard -->
    <table class="fretboard-table">
      <thead>
        <!-- Create a row for fret numbers -->
        <tr>
          {#each Array(NUM_FRETS + 1).fill().map((_, index) => (
            <th>{index}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {#each Array(NUM_STRINGS).fill().map((_, stringIndex) => (
          <tr>
            {#each Array(NUM_FRETS + 1).fill().map((_, fretIndex) => (
              <!-- Add logic to determine if a dot should be displayed -->
              {#if shouldDisplayDot(stringIndex, fretIndex)}
                <td class="dot-cell">
                  <!-- You can style the dot with CSS -->
                  <div class="dot"></div>
                </td>
              {:else}
                <td></td>
              {/if}
            ))}
          </tr>
        ))}
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
    .dot {
      width: 10px; /* Adjust the dot size as needed */
      height: 10px; /* Adjust the dot size as needed */
      background-color: red; /* Set the dot color */
      border-radius: 50%; /* Make the dot circular */
      margin: auto; /* Center-align the dot within the cell */
    }
  </style>  
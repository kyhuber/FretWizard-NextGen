<!-- ScaleVisualizer.svelte -->
<script>
  import { onMount } from 'svelte';
  import { populateFretboard, calculateDots } from './fretboard.js';
  import staticData from '../static_data.json';

  export let instrument;
  export let tuning;

  const NUM_FRETS = 24; // Maximum number of frets for any instrument
  const NUM_STRINGS = 6; // Maximum number of strings for any instrument

  let selectedKey = staticData.allNotes[0]; // Default to the first note
  let selectedScaleType = staticData.scaleType[0]; // Default to the first scale type

  let fretboardData = [];
  let dotPositions = [];

  function updateFretboard() {
    fretboardData = populateFretboard(instrument, tuning, selectedKey, selectedScaleType);
    updateDotPositions();
  }

  function updateDotPositions() {
    dotPositions = calculateDots(selectedKey, selectedScaleType);
  }

  function shouldDisplayDot(stringIndex, fretIndex) {
    return dotPositions.some(dot => dot.string === stringIndex && dot.fret === fretIndex);
  }

  onMount(updateFretboard);
  $: updateFretboard();
</script>
  
  <div>
    <h1>Scale Visualizer</h1>
  
    <div class="selections">
      <label>
        Select Key:
        <select bind:value={selectedKey}>
          {#each staticData.allNotes as note}
            <option value={note}>{note}</option>
          {/each}
        </select>
      </label>
  
      <label>
        Select Scale Type:
        <select bind:value={selectedScaleType}>
          {#each staticData.scaleType as scaleType}
            <option value={scaleType}>{scaleType}</option>
          {/each}
        </select>
      </label>
    </div>
    
    <!-- Fretboard display with highlighted dots -->
    <div class="fretboard">
      <table class="fretboard-table">
        <thead>
          <tr>
            <th></th> <!-- Empty header for string labels -->
            {#each Array(NUM_FRETS + 1).fill() as _, fretIndex}
              <th>{fretIndex}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each fretboardData as stringNotes, stringIndex}
            <tr>
              <th>{stringIndex + 1}</th> <!-- Label for string number -->
              {#each stringNotes as note, fretIndex}
                <td class:dot-cell={shouldDisplayDot(stringIndex, fretIndex)}>
                  {#if shouldDisplayDot(stringIndex, fretIndex)}
                    <div class="dot"></div> <!-- Dot is displayed here -->
                  {:else}
                    {note} <!-- Display the note -->
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
  </div>
  
  <style>
    /* Container styles */
    .fretboard {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    }

    /* Table styles */
    .fretboard-table {
    border-collapse: collapse;
    width: 80%; /* Adjust the width of the fretboard */
    max-width: 800px; /* Set a maximum width for larger screens */
    }

    .fretboard-table th, .fretboard-table td {
    width: 3rem; /* Adjust the width of fretboard cells */
    height: 3rem; /* Adjust the height of fretboard cells */
    text-align: center;
    vertical-align: middle;
    border: 1px solid #333; /* Dark border for cells */
    background-color: #f7f7f7; /* Light gray background color */
    font-weight: bold;
    }

    /* Dot styles */
    .dot-cell {
    position: relative;
    }

    .dot {
    width: 1.2rem; /* Adjust the dot size */
    height: 1.2rem; /* Adjust the dot size */
    background-color: #ff6600; /* Orange dot color */
    border-radius: 50%; /* Make the dot circular */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }

    /* Hover effect for dots */
    .dot-cell:hover .dot {
    background-color: #ff9900; /* Lighter orange on hover */
    transform: translate(-50%, -50%) scale(1.2); /* Scale up on hover */
    }

    /* Optional: Add box-shadow to dots for depth */
    .dot {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Box shadow for depth */
    }

  </style>
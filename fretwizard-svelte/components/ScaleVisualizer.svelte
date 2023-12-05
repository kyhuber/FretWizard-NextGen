<!-- ScaleVisualizer.svelte -->
<script>
    import { onMount } from "svelte";
    import { populateFretboard, calculateDots } from "./fretboard.js";
    
    // Define constants
    const NUM_FRETS = 24; // Maximum number of frets for any instrument
    const NUM_STRINGS = 6; // Maximum number of strings for any instrument
    
    // Initialize variables for user input
    let selectedKey = '';
    let selectedScaleType = '';
    
    // Initialize variables for dot positions
    let dotPositions = [];
    
    // Function to update dot positions when selectedKey or selectedScaleType changes
    function updateDotPositions() {
      // Check if all required input is provided
      if (!selectedKey || !selectedScaleType) {
        dotPositions = [];
        return;
      }
      
      // Calculate dot positions based on the selected key and scale type
      dotPositions = calculateDots(selectedKey, selectedScaleType);
    }
    

    function shouldDisplayDot(stringIndex, fretIndex) {
      return dotPositions.some(dot => dot.string === stringIndex && dot.fret === fretIndex);
    }


    // Call the updateDotPositions function when the component mounts and whenever selectedKey or selectedScaleType changes
    onMount(updateDotPositions);
    $: {
      updateDotPositions();
    }
  </script>
  
  <div>
    <h1>Scale Visualizer</h1>
    
    <!-- Display selected key and scale type -->
    <p>Selected Key: {selectedKey}</p>
    <p>Selected Scale Type: {selectedScaleType}</p>
    
    <!-- Fretboard display with highlighted dots -->
    <div class="fretboard">
      <!-- Create a table to represent the fretboard -->
      <table class="fretboard-table">
        <thead>
          <!-- Create a row for fret numbers -->
          <tr>
            {#each Array(NUM_FRETS + 1).fill() as _, index}
              <th>{index}</th>
            {/each}
          </tr>

        </thead>
        <tbody>
          {#each Array(NUM_STRINGS).fill() as _, stringIndex}
            <tr>
              {#each Array(NUM_FRETS + 1).fill() as _, fretIndex}
                <!-- Add logic to determine if a dot should be displayed -->
                {#if shouldDisplayDot(stringIndex, fretIndex)}
                  <td class="dot-cell">
                    <!-- You can style the dot with CSS -->
                    <div class="dot"></div>
                  </td>
                {:else}
                  <td></td>
                {/if}
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
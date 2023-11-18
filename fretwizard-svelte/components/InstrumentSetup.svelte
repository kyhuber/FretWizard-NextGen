<!-- InstrumentSetup.svelte -->
<script>
  import ScaleVisualizer from './ScaleVisualizer.svelte';
  import { router } from 'svelte-routing'; // Import the router from 'svelte-routing'

  // Access instrument and tuning data from JSON
  import staticData from "../static_data.json";
  const instruments = staticData.instruments;

  // Store the selected instrument and tuning
  let selectedInstrument = '';
  let selectedTuning = '';
  let tuningOptions = []

  // Function to handle instrument selection
  function selectInstrument(event) {
  selectedInstrument = event.target.value;
  
  // Access the tuning options for the selected instrument from your JSON data
  // Replace 'yourJsonData' with the actual variable that holds your JSON data
  if (selectedInstrument in staticData.instrumentStrings) {
    tuningOptions = staticData.instrumentStrings[selectedInstrument];
  } else {
    tuningOptions = []; // Set it to an empty array if the selected instrument is not found
  }
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Process user selections here (e.g., send to server or store in state)
    console.log("Selected Instrument:", selectedInstrument);
    console.log("Selected Tuning:", selectedTuning);
    continueToScaleVisualizer();
  }

  // Function to navigate to the ScaleVisualizer component
  function continueToScaleVisualizer() {
    // Pass data to ScaleVisualizer component
    // Use the `router.push` method to navigate
    router.push(`/scale-visualizer/${selectedInstrument}/${selectedTuning}`);
  }
</script>

<div>
  <h1>Instrument Setup</h1>
  <!-- Collect user input for number of strings and tuning -->
  <input type="text" bind:value={selectedTuning} />
  <button on:click={continueToScaleVisualizer}>Continue</button>
</div>

<!-- HTML template -->
<form on:submit={handleSubmit}>
  <label>
    Select an Instrument:
    <select bind:value={selectedInstrument}>
      <option value="">Select an instrument</option>
      {#each instruments as instrument}
        <option value={instrument}>{instrument}</option>
      {/each}
    </select>
  </label>

  <label>
    Select a Tuning:
    <select bind:value={selectedTuning}>
      <option value="">Select a tuning</option>
      {#if selectedInstrument in tuningOptions}
        {#each tuningOptions[selectedInstrument] as tuning}
          <option value={tuning}>{tuning}</option>
        {/each}
      {/if}
    </select>
  </label>

  <button type="submit">Submit</button>
</form>

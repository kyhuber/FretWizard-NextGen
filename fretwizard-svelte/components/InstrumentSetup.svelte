<!-- InstrumentSetup.svelte -->
<script>
  import ScaleVisualizer from './ScaleVisualizer.svelte';
  import { Router, navigate } from 'svelte-routing';
  import staticData from "../static_data.json";

  const instruments = staticData.instruments;
  let selectedInstrument = '';
  let selectedTuning = '';
  let tuningOptions = [];

  function selectInstrument(event) {
    selectedInstrument = event.target.value;

    // Populate the tuning options based on the selected instrument
    if (selectedInstrument) {
      tuningOptions = staticData.tuningOptions[selectedInstrument].map(option => option.name);
    } else {
      selectedTuning = '';
      tuningOptions = [];
    }
  }

  $: {
    //Force re-render to update the route
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Selected Instrument:", selectedInstrument);
    console.log("Selected Tuning:", selectedTuning);
    continueToScaleVisualizer();
  }

  function continueToScaleVisualizer() {
    navigate(`/scale-visualizer/${selectedInstrument}/${selectedTuning}`);
    console.log(`Navigating to: /scale-visualizer/${selectedInstrument}/${selectedTuning}`);

      // Force re-render to update the route

    }

  let panelIsCollapsed = true;

  function togglePanel() {
    panelIsCollapsed = !panelIsCollapsed;
  }
</script>

<div>
  <!-- Collapsible Panel for Instrument Setup -->
  <div class={panelIsCollapsed ? 'collapsed' : ''}>
    <h1>Instrument Setup</h1>

    <label for="selectedInstrument">
      Select an Instrument:
      <select id="selectedInstrument" name="selectedInstrument" bind:value={selectedInstrument} on:change={selectInstrument}>
        <option value="">Select an instrument</option>
        {#each instruments as instrument}
          <option value={instrument}>{instrument}</option>
        {/each}
      </select>
    </label>

    <label for="selectedTuning">
      Select a Tuning:
      <select id="selectedTuning" name="selectedTuning" bind:value={selectedTuning}>
        <option value="">Select a tuning</option>
        {#each tuningOptions as tuningOption}
          <option value={tuningOption}>{tuningOption}</option>
        {/each}
      </select>
    </label>
  </div>

  <button on:click={togglePanel}>
    {#if panelIsCollapsed}
      Expand Panel
    {:else}
      Collapse Panel
    {/if}
  </button>

  <button on:click={continueToScaleVisualizer}>
    Continue to Scale Visualizer
  </button>
</div>
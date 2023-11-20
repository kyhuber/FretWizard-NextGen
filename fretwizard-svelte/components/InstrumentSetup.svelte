<!-- InstrumentSetup.svelte -->
<script>
  import ScaleVisualizer from './ScaleVisualizer.svelte';
  import { Router } from 'svelte-routing';

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Selected Instrument:", selectedInstrument);
    console.log("Selected Tuning:", selectedTuning);
    continueToScaleVisualizer();
  }

  function continueToScaleVisualizer() {
  // Use the link element to navigate
  window.location.href = `/scale-visualizer/${selectedInstrument}/${selectedTuning}`;
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

    <label>
      Select an Instrument:
      <select bind:value={selectedInstrument} on:change={selectInstrument}>
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
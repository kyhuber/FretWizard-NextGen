<!-- ScaleSelection.svelte -->
<script>
    // Import the necessary data from your JSON
    import staticData from "../static_data.json";
    const allNotes = staticData.allNotes;
    const scaleTypes = staticData.scaleType;
  
    // Declare variables to store the selected key and scale type
    let selectedKey = '';
    let selectedScaleType = '';
  
    // Function to handle key selection
    function selectKey(event) {
      selectedKey = event.target.value;
      // You can add any additional logic here if needed
    }
  
    // Function to handle scale type selection
    function selectScaleType(event) {
      selectedScaleType = event.target.value;
      // You can add any additional logic here if needed
    }
  </script>
  
  <div>
    <h2>Select a Key</h2>
    <!-- Dropdown menu for selecting a key -->
    <select bind:value={selectedKey} on:change={selectKey}>
      <option value="">Select a key</option>
      {#each allNotes as note}
        <option value={note}>{note}</option>
      {/each}
    </select>
  </div>
  
  <div>
    <h2>Select a Scale Type</h2>
    <!-- Dropdown menu for selecting a scale type -->
    <select bind:value={selectedScaleType} on:change={selectScaleType}>
      <option value="">Select a scale type</option>
      {#each scaleTypes as scaleType}
        <option value={scaleType}>{scaleType}</option>
      {/each}
    </select>
  </div>
  
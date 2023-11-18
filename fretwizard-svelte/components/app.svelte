<!-- App.svelte -->
<script>
    import { Router, Link } from 'svelte-routing';
    import InstrumentSetup from './InstrumentSetup.svelte';
    import ScaleVisualizer from './ScaleVisualizer.svelte';
</script>

<nav>
    <Link to="/">Instrument Setup</Link>
    <Link to="/scale-visualizer">Scale Visualizer</Link>
</nav>

<Router>
    <InstrumentSetup path="/" />
    <ScaleVisualizer path="/scale-visualizer/:numberOfStrings/:tuning" />
</Router>

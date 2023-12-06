<!-- App.svelte -->
<script>
    import { Router, Route, Link, navigate } from 'svelte-routing';
    import InstrumentSetup from './InstrumentSetup.svelte';
    import ScaleVisualizer from './ScaleVisualizer.svelte';
</script>

<nav>
    <Link to="/">Instrument Setup</Link>
    <Link to="/scale-visualizer">Scale Visualizer</Link>
</nav>

<Router>
    <Route path="/" component={InstrumentSetup} />
    <Route path="/scale-visualizer/:instrument/:tuning" component={ScaleVisualizer} />
</Router>

<script>
	import InstrumentSetup from '../components/InstrumentSetup.svelte';
	import { Route, Router, Link } from 'svelte-routing'
  </script>
  
  <main>
	<InstrumentSetup />
  </main>
  

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
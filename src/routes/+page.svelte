<script>
  import { schoolYears } from '$lib/data/school-years.js'
  import { school } from '$lib/data/school.js'
  import ActiveSchoolYearSelect from '$lib/ActiveSchoolYearSelect.svelte'
</script>

<svelte:head>
  <title>Junior Adventurers</title>
</svelte:head>

{#if $school?.name}
  <h2>{$school.name}</h2>
  <ActiveSchoolYearSelect selected={$schoolYears?.active} />
{:else}
  <h1>Setting up deployment</h1>
  <p>This deployment has not been set up yet.</p>
  <a href="/school" class="btn btn-primary">set up now</a>
{/if}

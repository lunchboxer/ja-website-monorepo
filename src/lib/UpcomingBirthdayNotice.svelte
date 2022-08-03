<script>
  import Info from '$lib/Info.svelte'
  import { upcomingBirthdays } from '$lib/data/stores.js'
</script>

{#if $upcomingBirthdays && $upcomingBirthdays.length > 0}
  <Info>
    {#each $upcomingBirthdays as bday}
      {bday.name} is turning {bday.age + 1} in {bday.days} days.<br />
    {/each}
  </Info>
{/if}

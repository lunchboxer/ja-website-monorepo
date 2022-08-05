<script>
  import AddGuardian from '$lib/AddGuardian.svelte'
  import GuardianRow from './_GuardianRow.svelte'
  import { guardians } from '$lib/data/guardians.js'
</script>

<h1>Guardians</h1>

{#if $guardians?.length > 0}
  <p>There are {$guardians.length} guardians.</p>

  <div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>Schoolyear</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $guardians as guardian}
          <GuardianRow {guardian} />
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>There are no guardians yet.</p>
{/if}

<h2>Create a new guardian record</h2>
<AddGuardian />

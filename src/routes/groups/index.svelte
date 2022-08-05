<script>
  import AddGroup from './_AddGroup.svelte'
  import GroupRow from './_GroupRow.svelte'
  import { groups } from '$lib/data/groups.js'
</script>

<h1>Groups</h1>

{#if $groups?.length > 0}
  <p>There are {$groups.length} groups.</p>

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
        {#each $groups as group}
          <GroupRow {group} />
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>There are no groups yet.</p>
{/if}

<AddGroup />

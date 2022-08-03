<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/groups')
    const result = response?.ok && (await response.json())

    return {
      status: response.status,
      props: {
        groups: result.groups,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import Error from '$lib/Error.svelte'
  import AddGroup from './_AddGroup.svelte'
  import GroupRow from './_GroupRow.svelte'
  import { groups as store } from '$lib/data/stores.js'
  export let groups
  export let errors

  store.set(groups)
</script>

<h1>Groups</h1>

<Error {errors} />

{#if $store?.length > 0}
  <p>There are {$store.length} groups.</p>

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
        {#each $store as group}
          <GroupRow {group} />
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>There are no groups yet.</p>
{/if}

<AddGroup />

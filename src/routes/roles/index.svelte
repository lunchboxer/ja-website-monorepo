<script>
  import RoleRow from './_RoleRow.svelte'
  import { roles } from '$lib/data/roles.js'
  import Error from '$lib/Error.svelte'
  import AddRole from './_AddRole.svelte'
  export let loadRoles = []
  export let errors = ''

  roles.set(loadRoles)
</script>

<h1>Roles</h1>

<Error {errors} />
{#if $roles.length > 0}
  <div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Users</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each $roles as role}
          <RoleRow {role} />
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<AddRole />

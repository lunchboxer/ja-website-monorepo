<script context="module">
  import { request } from '$graphql/client.js'
  import { USERS } from '$graphql/users.gql'
  export const load = async (event) => {
    const response = await request(USERS, undefined, event)
    return { props: { loadUsers: response.users } }
  }
</script>

<script>
  import { users } from '$lib/data/users.js'
  import Error from '$lib/Error.svelte'
  import AddUser from './_AddUser.svelte'
  import UserRow from './_UserRow.svelte'

  export let errors = ''
  export let loadUsers = []
  users.set(loadUsers)
</script>

<h1>Users</h1>

<Error {errors} />
{#if $users}
  {#if $users.length > 0}
    {$users.length} users
    <div class="overflow-x-auto w-full">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each $users as user}
            <UserRow {user} />
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p>There are no users somehow.</p>
  {/if}
{/if}
<AddUser />

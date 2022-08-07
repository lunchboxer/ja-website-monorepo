<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/users')
    const result = response.ok && (await response.json())
    return {
      status: response.status,
      props: {
        users: result.users,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import { users as store } from '$lib/data/users.js'
  import Error from '$lib/Error.svelte'
  import AddUser from './_AddUser.svelte'
  import UserRow from './_UserRow.svelte'

  export let users
  export let errors = ''

  store.set(users)
</script>

<h1>Users</h1>

<Error {errors} />
{#if $store}
  {#if $store.length > 0}
    {$store.length} users
    <div class="overflow-x-auto w-full">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each $store as user}
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

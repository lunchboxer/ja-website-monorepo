<script>
  import { users } from '$lib/data/users.js'
  import Error from '$lib/Error.svelte'
  import { notifications } from '$lib/notifications/index.js'

  export let role = {}
  let userFilter = ''
  let errors = ''
  let showUsersToAssign = false

  $: filterUsers = $users.filter(
    (user) =>
      !role.users.some((u) => u.id === user.id) &&
      (user.name?.includes(userFilter) || user.username.includes(userFilter)),
  )
  const assign = async (id) => {
    showUsersToAssign = false
    try {
      await users.assignRole(role.name, id)
      notifications.add({ type: 'success', text: 'Assigned role to user' })
      errors = ''
    } catch (error) {
      console.error(error)
      errors = error
      notifications.add({
        type: 'error',
        text: 'Something went wrong assigning role',
      })
    }
  }
</script>

<h2>Assign role to users</h2>

<Error {errors} />

{#if filterUsers?.length > 0}
  <div class="dropdown">
    <input
      bind:value={userFilter}
      class="input input-bordered"
      placeholder="Pick a user"
      on:focus={() => (showUsersToAssign = true)}
    />
    {#if showUsersToAssign}
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
      >
        {#each filterUsers as user}
          <li>
            <button
              on:click={() => {
                assign(user.id)
              }}>{user.username} ({user.name})</button
            >
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{:else}
  <p>No more users to assign to.</p>
{/if}

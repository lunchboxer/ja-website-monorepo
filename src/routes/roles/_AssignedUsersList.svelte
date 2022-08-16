<script>
  import { users } from '$lib/data/users.js'
  import Error from '$lib/Error.svelte'
  import { notifications } from '$lib/notifications/index.js'

  export let role = {}
  export let errors = ''

  const unassign = async (id) => {
    try {
      await users.unassignRole(role.name, id)
      notifications.add({ type: 'success', text: 'Unassigned role from user' })
      errors = ''
    } catch (error) {
      errors = error
      notifications.add({
        type: 'error',
        text: 'Something went wrong unassigning role.',
      })
      console.error(error)
    }
  }
</script>

<h2>{role.users.length} Users assigned</h2>

<Error {errors} />
<ul>
  {#each role.users as { id } (id)}
    {@const user = $users.find((u) => u.id === id)}
    {#if user}
      <li>
        <a href="/users/{user.id}">{user.name || user.username}</a>
        <button
          class="btn btn-circle btn-xs mx-2"
          on:click={() => {
            unassign(user.id)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            /></svg
          >
        </button>
      </li>
    {/if}
  {/each}
</ul>

<script>
  import { users } from '$lib/data/users.js'
  import { notifications } from '$lib/notifications/index.js'
  import Error from '$lib/Error.svelte'

  export let errors = ''
  export let userId = ''
  export let roles = []

  const removeRole = async role => {
    try {
      await users.removeRole(role, userId)
      notifications.add({
        type: 'success',
        text: `Removed role ${role} from user`,
      })
    } catch (error) {
      errors = error
      notifications.add({
        type: 'error',
        text: 'Something went wrong removing role.',
      })
    }
  }
</script>

<h2>Assigned roles</h2>

<Error {errors} />

<div class="list-of-roles-on-user">
  {#if roles?.length > 0}
    {#each roles as role, index}
      <div class="badge gap-2 mx-1">
        <button
          on:click={() => {
            removeRole(role)
          }}
        >
          ×
        </button>
        {role}
      </div>
    {/each}
  {:else}
    <span>-- none --</span>
  {/if}
</div>

<script>
  import Input from '$lib/Input.svelte'
  import Error from '$lib/Error.svelte'
  import Form from '$lib/Form.svelte'
  import { roles as store } from '$lib/data/roles.js'
  import { users } from '$lib/data/users.js'
  import { notifications } from '$lib/notifications/index.js'

  export let currentRoles = []
  export let userId = ''
  let selectedRole = ''
  let inputRole = ''
  let errors = ''

  store.get()

  // Either an existing user or new user
  const addRole = async event => {
    const role = inputRole || event.target.value
    try {
      await users.addRole(role, userId)
      notifications.add({
        type: 'success',
        text: `Assigned role ${selectedRole} to user`,
      })
      selectedRole = ''
      inputRole = ''
    } catch (error) {
      errors = error
      notifications.add({
        type: 'error',
        text: 'Something went wrong adding role.',
      })
    }
  }
  const onReset = () => {
    inputRole = ''
  }
  $: remainingRoles = $store.filter(role => !currentRoles.includes(role.name))
</script>

<h2>Assign role</h2>

<Error {errors} />

{#if $store}
  {#if remainingRoles.length > 0}
    <select
      class="select select-bordered w-full max-w-xs"
      on:change={addRole}
      bind:value={selectedRole}
    >
      <option disabled selected value="">Pick a role to assign</option>
      {#each remainingRoles as role}
        <option value={role.name}>{role.name}</option>
      {/each}
    </select>
  {/if}
  <Form submitLabel="assign new role" onSubmit={addRole} {onReset}>
    <div class="form-control w-full max-w-xs">
      <Input bind:value={inputRole} label="Create a new role to assign" />
    </div>
  </Form>
{/if}

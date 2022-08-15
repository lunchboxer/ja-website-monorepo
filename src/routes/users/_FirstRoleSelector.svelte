<script>
  import Input from '$lib/Input.svelte'
  import Select from '$lib/Select.svelte'
  import { roles } from '$lib/data/roles.js'

  export let role
  let selectedRole = ''

  roles.get()

  let inputRole = ''

  // Either an existing user or new user
  const onSelect = () => {
    role = selectedRole
    inputRole = ''
  }
  const onInput = () => {
    role = inputRole
    selectedRole = ''
  }
</script>

{#if $roles}
  <Select
    required={!inputRole}
    label="Pick an existing role"
    bind:value={selectedRole}
    onChange={onSelect}
  >
    <option disabled selected value="">Pick a role to assign</option>
    {#each $roles as role}
      <option value={role.name}>{role.name}</option>
    {/each}
  </Select>

  <Input
    bind:value={inputRole}
    onChange={onInput}
    label="Or assign a new role"
    required={!selectedRole}
  />
{/if}

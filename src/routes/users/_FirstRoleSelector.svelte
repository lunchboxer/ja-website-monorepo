<script>
  import Input from '$lib/Input.svelte'
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
  <div class="form-control w-full max-w-xs">
    <label class="label" for="roleSelector">
      <span class="label-text">Pick an existing role</span>
    </label>
    <select
      class="select select-bordered w-full max-w-xs"
      on:change={onSelect}
      bind:value={selectedRole}
    >
      <option disabled selected value="">Pick a role to assign</option>
      {#each $roles as role}
        <option value={role.name}>{role.name}</option>
      {/each}
    </select>

    <Input
      bind:value={inputRole}
      onChange={onInput}
      label="Or assign a new role"
    />
  </div>
{/if}

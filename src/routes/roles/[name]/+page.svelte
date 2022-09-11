<script>
  import { roles } from '$lib/data/roles.js'
  import { users } from '$lib/data/users.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import { notifications } from '$lib/notifications/index.js'
  import { goto } from '$app/navigation'
  import DeleteThing from '$lib/DeleteThing.svelte'
  import AssignedUsersList from '../_AssignedUsersList.svelte'
  import AssignRoleSelect from '../_AssignRoleSelect.svelte'

  export let data = {}
  let { loadRole } = data
  roles.updateOne(loadRole)
  users.get()

  let editFormShowing = false
  let newName = ''

  $: role = $roles.find((r) => r.name === loadRole?.name)
  if ($roles && $roles.length === 0) roles.get()

  const editRole = async () => {
    const newRole = { ...role, name: newName }
    await roles.patch(newRole)
    notifications.add({ type: 'success', text: 'Role name changed' })
    editFormShowing = false
    loadRole = newRole
    goto(`/roles/${newRole.name}`)
  }
  const showEdit = () => {
    newName = role.name
    editFormShowing = true
  }
  const onReset = () => {
    newName = role.name
    editFormShowing = false
  }
  const deleteRole = async () => roles.remove(role.id)
</script>

{#if loadRole && role}
  <h1>Role - {role.name}</h1>
  {#if editFormShowing}
    <Form {onReset} onSubmit={editRole}>
      <Input label="Name" bind:value={newName} required />
    </Form>
  {:else}
    <button class="btn" on:click={showEdit}>Edit</button>
  {/if}

  <AssignedUsersList {role} />

  <AssignRoleSelect {role} />

  <DeleteThing
    deleteFunction={deleteRole}
    thingName="{role.name} role"
    referrer="/roles"
  />
{:else}
  <h1>Role - not found</h1>
  <p>
    perhaps you typed something wrong. Try going back to the
    <a href="/roles">roles list</a>
  </p>
{/if}

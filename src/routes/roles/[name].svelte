<script context="module">
  export const load = ({ params }) => ({ props: { name: params.name } })
</script>

<script>
  import { roles } from '$lib/data/roles.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import { notifications } from '$lib/notifications/index.js'
  import { goto } from '$app/navigation'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let name
  let editFormShowing = false
  let newName = ''

  $: role = $roles.find(r => r.name === name)
  if ($roles && $roles.length === 0) roles.get()

  const editRole = async () => {
    const newRole = { ...role, name: newName }
    await roles.patch(newRole)
    notifications.add({ type: 'success', text: 'Role name changed' })
    editFormShowing = false
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
  const deleteRole = async () => {
    roles.remove(role.id)
  }
</script>

{#if role}
  <h1>Role - {role.name}</h1>
  {#if editFormShowing}
    <Form {onReset} onSubmit={editRole}>
      <Input label="Name" bind:value={newName} required />
    </Form>
  {:else}
    <button class="btn" on:click={showEdit}>Edit</button>
  {/if}

  <p>{role.users.length} Users</p>
  <DeleteThing deleteFunction={deleteRole} thingName="{role.name} role" />
{/if}

<script context="module">
  export async function load({ fetch, params }) {
    const response = await fetch(`/api/users/${params.id}`)
    const result = response.ok && (await response.json())
    return {
      status: response.status,
      props: {
        user: result.user,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import { notifications } from '$lib/notifications/index.js'
  import { users } from '$lib/data/users.js'
  import { goto } from '$app/navigation'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Error from '$lib/Error.svelte'
  import RoleSelectOrInput from '$lib/RoleSelectOrInput.svelte'
  import AssignedRoles from './_AssignedRoles.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let user
  export let errors = ''
  users.updateOne(user)

  $: user = $users.find(u => u.id === user.id)
  const onSubmit = async () => {
    users.patch(user)
    notifications.add({
      type: 'success',
      text: `Saved user ${user.username}`,
    })
    goto('/users')
  }
  const onReset = () => {
    user = $users.find(u => u.id === user.id)
  }
</script>

<h1>Edit User</h1>
<Error {errors} />

{#if user}
  <Form {onSubmit} {onReset} submitLabel="Save changes">
    <Input bind:value={user.username} label="Username" required />
    <Input
      bind:value={user.name}
      label="Name"
      description="real, full name is best"
    />
    <Input bind:value={user.email} label="Email address" type="email" />
    <input hidden value={user.id} name="id" />
  </Form>
  <AssignedRoles roles={user.roles} userId={user.id} />
  <RoleSelectOrInput currentRoles={user.roles} userId={user.id} />

  <DeleteThing
    thingName="User {user.username}"
    deleteFunction={() => {
      users.remove(user.id)
    }}
    referrer="/users"
  />
{:else}
  <p>loading user</p>
{/if}

<script context="module">
  import { request } from '$graphql/client.js'
  import { USER } from '$graphql/users.gql'
  export const load = async (event) => {
    const { id } = event.params
    const response = await request(USER, { id }, event)
    return { props: { loadUser: response.user } }
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

  export let loadUser
  users.updateOne({ ...loadUser })
  $: user = $users.find((u) => u.id === loadUser.id)
  export let errors = ''

  const onSubmit = async () => {
    await users.patch(user)
    notifications.add({
      type: 'success',
      text: `Saved user ${user.username}`,
    })
    goto('/users')
  }
  const onReset = () => {
    users.updateOne({ ...loadUser })
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

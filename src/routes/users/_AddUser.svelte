<script>
  import { users } from '$lib/data/users.js'
  import { roles } from '$lib/data/roles.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import { notifications } from '$lib/notifications/index.js'
  import FirstRoleSelector from './_FirstRoleSelector.svelte'

  let username = ''
  let password = ''
  let email = ''
  let name = ''
  let role = 'teacher'

  roles.get()

  const createUser = async () => {
    await users.create({ username, password, email, name, role })
    notifications.add({ type: 'success', text: `Added user ${username}` })
  }
  const createUserError = () => {
    notifications.add({
      type: 'error',
      text: 'And error occured when adding user',
    })
  }
  const onReset = () => {
    username = ''
    password = ''
    email = ''
    name = ''
    role = 'teacher'
  }
</script>

<h2>Add new user</h2>

<Form
  onSubmit={createUser}
  {onReset}
  onError={createUserError}
  submitLabel="Create user"
>
  <Input bind:value={username} label="Username" required />
  <Input bind:value={email} type="email" label="Email" required />
  <Input bind:value={name} label="Name" />
  <Input bind:value={password} type="password" label="Password" required />
  <FirstRoleSelector bind:role />
</Form>

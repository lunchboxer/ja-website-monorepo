<script>
  import { me } from '$lib/data/stores.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import { notifications } from '$lib/notifications'
  import { client } from '$lib/data/fetch-client.js'

  let username = ''
  let password = ''
  let email = ''
  let name = ''
  let signup = false

  const toggleSignup = () => {
    signup = !signup
  }
  const login = async () => {
    const response = await client('/api/login', { username, password })
    me.set(response.user)
    notifications.add({
      type: 'success',
      text: `Logged in as ${username}`,
    })
  }
  const loginOnError = () => {
    notifications.add({ text: 'Login failed.', type: 'error' })
  }
  const create = async () => {
    const response = await client('/api/signup', {
      username,
      email,
      name,
      password,
    })
    me.set(response.user)
    notifications.add({
      type: 'success',
      text: `Created new user: ${username}`,
    })
  }
  const createOnError = () => {
    notifications.add({ text: 'Failed to create new user', type: 'error' })
  }
</script>

<h1>Log in</h1>

{#if !signup}
  <Form submitLabel="Log in" onSubmit={login} onError={loginOnError}>
    <Input label="Username" bind:value={username} required />
    <Input type="password" label="Password" bind:value={password} required />
  </Form>

  <p>Don't have an account?</p>
  <p>
    <button class="btn btn-secondary btn-outline" on:click={toggleSignup}>
      Create user
    </button>
  </p>
{:else}
  <h1>Create a user account</h1>
  <Form onSubmit={create} onError={createOnError} submitLabel="Create User">
    <Input bind:value={username} label="Username" required />
    <Input bind:value={email} type="email" label="Email" required />
    <Input bind:value={name} label="Name" />
    <Input bind:value={password} type="password" label="Password" required />
  </Form>

  <p>Already have an account?</p>
  <p>
    <button class="btn btn-secondary btn-outline" on:click={toggleSignup}>
      Log in
    </button>
  </p>
{/if}

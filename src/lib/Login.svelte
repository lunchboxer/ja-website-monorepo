<script>
  import { me } from '$lib/data/me.js'
  import { users } from '$lib/data/users.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'

  let username = ''
  let password = ''
  let email = ''
  let name = ''

  const login = async () => {
    await me.login({ username, password })
    notifications.add({
      type: 'success',
      text: `Logged in as ${username}`,
    })
    goto('/')
  }

  const loginOnError = () => {
    notifications.add({ text: 'Login failed.', type: 'error' })
  }

  const createAdmin = async () => {
    await me.signup({ username, email, name, password })
    notifications.add({
      type: 'success',
      text: `Created initial admin user: ${username}`,
    })
    goto('/')
  }

  const createOnError = () => {
    notifications.add({ text: 'Failed to create new user', type: 'error' })
  }
</script>

{#await users.count() then count}
  {#if count > 0}
    <h1>Log in</h1>

    <Form submitLabel="Log in" onSubmit={login} onError={loginOnError}>
      <Input label="Username" bind:value={username} required />
      <Input type="password" label="Password" bind:value={password} required />
    </Form>

    <p>
      Don't have an account? You'll need to ask an admin user to create an
      account for you.
    </p>
  {:else}
    <h1>Create admin account</h1>
    <Form
      onSubmit={createAdmin}
      onError={createOnError}
      submitLabel="Create admin"
    >
      <Input bind:value={username} label="Username" required />
      <Input bind:value={email} type="email" label="Email" required />
      <Input bind:value={name} label="Name" />
      <Input bind:value={password} type="password" label="Password" required />
    </Form>
  {/if}
{/await}

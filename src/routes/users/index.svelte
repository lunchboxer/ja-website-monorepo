<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/users')
    const result = response.ok && (await response.json())
    return {
      status: response.status,
      props: {
        users: result.users,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import Error from '$lib/Error.svelte'

  export let users
  export let errors = ''
</script>

<h1>Users</h1>

<Error {errors} />
{#if users}
  {users.length} users
{/if}

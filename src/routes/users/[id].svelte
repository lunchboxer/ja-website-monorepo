<script context="module">
  export const load = ({ params }) => ({ props: { id: params.id } })
</script>

<script>
  import { users } from '$lib/data/users.js'
  export let id

  $: user = $users.find(u => u.id === id)
</script>

{#if user}
  <h1>User - {user.name || user.username}</h1>
{/if}

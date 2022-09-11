<script>
  export let data = {}
  const { user } = data
</script>

{#if user}
  <h1>User - {user.name || user.username}</h1>
{/if}

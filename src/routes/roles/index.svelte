<script>
  export let roles = []
</script>

<h1>Roles</h1>

{roles.length}
{#each roles as role}
  <p>{role.id}</p>
  <p>{role.name}</p>
{/each}

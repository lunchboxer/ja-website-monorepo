<script>
  import EditButton from '$lib/EditButton.svelte'
  export let user = {}
</script>

<tr>
  <td>
    <a href="/users/{user.id}">
      {user.username}
    </a>
  </td>
  <td>
    {user.name || ''}
  </td>
  <td>
    {#each user.roles as role, index}
      <a href="/roles/{role}">
        {role}
      </a>
      {#if index + 1 !== user.roles.length}
        ,&nbsp;
      {/if}
    {/each}
  </td>
  <td>
    <EditButton url="/users/edit/{user.id}" />
  </td>
</tr>

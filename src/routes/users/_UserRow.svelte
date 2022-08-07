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
    {user.roles.join(', ')}
  </td>
  <td>
    <EditButton url="/users/edit/{user.id}" />
  </td>
</tr>
